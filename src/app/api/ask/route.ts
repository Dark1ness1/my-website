// src/app/api/ask/route.ts
//
// The RAG endpoint behind the floating assistant: embed the question,
// pull the closest passages out of Pinecone, then stream an answer that
// is grounded in them.

import { Pinecone } from '@pinecone-database/pinecone';
import { HfInference } from '@huggingface/inference';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMBEDDING_MODEL = 'BAAI/bge-small-en-v1.5';
const CHAT_MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

/** How many past turns to replay to the model. */
const HISTORY_LIMIT = 6;
const MAX_QUESTION_LENGTH = 1000;

type ChatRole = 'user' | 'assistant';
type IncomingMessage = { role: ChatRole; content: string };

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

/**
 * `featureExtraction` can hand back a flat vector, a token-by-dimension
 * matrix, or a batch containing one of those. Normalise to a single
 * vector, mean-pooling the token dimension when it is present.
 */
function toVector(result: unknown): number[] {
  if (!Array.isArray(result) || result.length === 0) {
    throw new Error('Embedding model returned an unexpected shape');
  }

  // Batch of one — unwrap it.
  if (Array.isArray(result[0]) && Array.isArray((result[0] as unknown[])[0])) {
    return toVector(result[0]);
  }

  if (typeof result[0] === 'number') {
    return result as number[];
  }

  const rows = result as number[][];
  const dimensions = rows[0].length;
  const pooled = new Array<number>(dimensions).fill(0);

  for (const row of rows) {
    for (let i = 0; i < dimensions; i++) pooled[i] += row[i];
  }

  return pooled.map((value) => value / rows.length);
}

function parseMessages(payload: unknown): IncomingMessage[] | null {
  if (typeof payload !== 'object' || payload === null) return null;

  const { messages } = payload as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const parsed: IncomingMessage[] = [];

  for (const entry of messages) {
    if (typeof entry !== 'object' || entry === null) return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;
    // Placeholder bubbles are sent with empty content; ignore them.
    if (content.trim()) parsed.push({ role, content: content.trim() });
  }

  return parsed.length > 0 ? parsed : null;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.PINECONE_API_KEY;
    const indexName = process.env.PINECONE_INDEX_NAME;
    const indexHost = process.env.PINECONE_INDEX_HOST;
    const hfToken = process.env.HUGGING_FACE_ACCESS_TOKEN;

    if (!apiKey || !indexName || !indexHost || !hfToken) {
      console.error(
        'Missing environment variables. Expected PINECONE_API_KEY, PINECONE_INDEX_NAME, PINECONE_INDEX_HOST and HUGGING_FACE_ACCESS_TOKEN.',
      );
      return Response.json({ error: 'Assistant is not configured' }, { status: 503 });
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return badRequest('Body must be valid JSON');
    }

    const messages = parseMessages(payload);
    if (!messages) return badRequest('Expected a non-empty `messages` array');

    const lang = (payload as { lang?: unknown }).lang === 'de' ? 'de' : 'en';

    const question = messages[messages.length - 1].content.slice(0, MAX_QUESTION_LENGTH);

    const pinecone = new Pinecone({ apiKey });
    const index = pinecone.index(indexName, indexHost);
    const hf = new HfInference(hfToken);

    // 1. Embed the question.
    const vector = toVector(
      await hf.featureExtraction({ model: EMBEDDING_MODEL, inputs: question }),
    );

    // 2. Retrieve the closest passages.
    const queryResponse = await index.query({
      vector,
      topK: 4,
      includeMetadata: true,
    });

    const context =
      queryResponse.matches
        ?.map((match) => match.metadata?.text)
        .filter((text): text is string => typeof text === 'string' && text.length > 0)
        .join('\n\n---\n\n') ?? '';

    // 3. Build the prompt, keeping a little history so follow-ups work.
    const systemMessage = {
      role: 'system' as const,
      content: [
        "You are the assistant on Muhammad Talha Nasir's personal website.",
        'Answer using the CONTEXT below. If the context does not contain the answer, say so plainly instead of inventing details.',
        'Keep answers short — two or three sentences unless more is clearly needed.',
        lang === 'de' ? 'Antworte auf Deutsch.' : 'Answer in English.',
        '',
        'CONTEXT:',
        '---',
        context || '(no matching content was found)',
        '---',
      ].join('\n'),
    };

    const history = messages.slice(-HISTORY_LIMIT).map((message) => ({
      role: message.role,
      content: message.content.slice(0, MAX_QUESTION_LENGTH),
    }));

    // 4. Stream the answer straight through to the browser.
    const streamIterator = hf.chatCompletionStream({
      model: CHAT_MODEL,
      messages: [systemMessage, ...history],
      max_tokens: 500,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of streamIterator) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Error in /api/ask:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
