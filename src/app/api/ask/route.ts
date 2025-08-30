// src/app/api/ask/route.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { HfInference } from '@huggingface/inference';

// --- CONFIGURATION ---
const embeddingModel = "BAAI/bge-small-en-v1.5";

// --- INITIALIZE CLIENTS ---
const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_INDEX_NAME;
const indexHost = process.env.PINECONE_INDEX_HOST;
const hfToken = process.env.HUGGING_FACE_ACCESS_TOKEN;

if (!apiKey || !indexName || !indexHost || !hfToken) {
  throw new Error('One or more environment variables are not set. Please check your .env.local file.');
}

const pinecone = new Pinecone({ apiKey });
const index = pinecone.index(indexName, indexHost);
const hf = new HfInference(hfToken);

// --- SET NEXT.JS EDGE RUNTIME ---

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1].content;

    // 1. Get embedding for the user's question
    const userEmbedding = await hf.featureExtraction({
      model: embeddingModel,
      inputs: latestMessage,
    });

    // 2. Query Pinecone for relevant content
    const queryResponse = await index.query({
      vector: userEmbedding as number[],
      topK: 2,
      includeMetadata: true,
    });

    const context = queryResponse.matches
      ?.map((match) => match.metadata?.text)
      .filter(Boolean)
      .join('\n\n---\n\n') || '';

    // 3. Create messages for chat completion (instead of a single prompt)
    const systemMessage = {
      role: "system" as const,
      content: `You are an intelligent assistant for a personal website. Use the following context to answer the user's question. If the answer is not in the context, say so.

CONTEXT:
---
${context}
---`
    };

    const userMessage = {
      role: "user" as const,
      content: latestMessage
    };

    // 4. Use chat completion stream instead of text generation stream
    const streamIterator = hf.chatCompletionStream({
      model: 'meta-llama/Meta-Llama-3-8B-Instruct',
      messages: [systemMessage, userMessage],
      max_tokens: 500,
    });

    // 5. Create a new ReadableStream to pipe the data
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamIterator) {
            // Chat completion chunks have different structure than text generation
            if (chunk.choices && chunk.choices[0]?.delta?.content) {
              controller.enqueue(new TextEncoder().encode(chunk.choices[0].delta.content));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    // 6. Return the stream with proper headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}