// src/components/ChatBot.tsx
'use client';

import { useState, FormEvent } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create assistant message placeholder for streaming
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        // Decode the chunk and add it to the content
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        // Update the assistant message with the accumulated content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: assistantContent }
              : msg
          )
        );
      }

      // Final update to ensure we have all content
      if (!assistantContent.trim()) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: 'Sorry, I couldn\'t generate a response.' }
              : msg
          )
        );
      }

    } catch (error) {
      console.error('Error:', error);
      
      // Update the assistant message with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: 'Sorry, there was an error processing your request. Please try again.' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="flex flex-col h-[500px] space-y-4 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-4 text-white">
        {messages.length > 0
          ? messages.map((m: Message) => (
              <div key={m.id} className={`whitespace-pre-wrap ${m.role === 'user' ? 'text-cyan-400' : 'text-gray-300'}`}>
                <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
                {m.content}
                {/* Show typing indicator for empty assistant messages */}
                {m.role === 'assistant' && !m.content && isLoading && (
                  <span className="animate-pulse">▋</span>
                )}
              </div>
            ))
          : <div className="text-gray-400">Ask a question about my blog posts!</div>}
        
        {isLoading && messages.length === 0 && (
          <div className="text-gray-400">
            <strong>AI: </strong>
            <span className="animate-pulse">Thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 disabled:opacity-50 focus:border-cyan-400 focus:outline-none"
            value={input}
            placeholder="Ask me anything..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-md bg-cyan-600 px-4 py-2 text-white disabled:opacity-50 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}