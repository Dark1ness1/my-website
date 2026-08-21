// src/components/FloatingChatBot.tsx
'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { MessageCircle, Send, Square, Trash2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

let messageCounter = 0;
const nextId = () => `m${Date.now()}-${messageCounter++}`;

/**
 * The site-wide AI assistant. Mounted once in the root layout, so it is
 * reachable from every page.
 */
export function FloatingChatBot() {
  const { lang, t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Close on Escape, and stop any request still in flight.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // On phones the panel is full screen, so freeze the page behind it.
  useEffect(() => {
    if (!isOpen) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Follow the answer as it streams in.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, isLoading]);

  // Never leave a request running after the component goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const clear = useCallback(() => {
    stop();
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  }, [stop]);

  const sendMessage = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || isLoading) return;

      const userMessage: Message = { id: nextId(), role: 'user', content: question };
      const assistantId = nextId();

      const history = [...messages, userMessage];
      setMessages([...history, { id: assistantId, role: 'assistant', content: '' }]);
      setInput('');
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const write = (content: string) =>
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, content } : message,
          ),
        );

      try {
        const response = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Only the tail of the conversation is useful as context.
          body: JSON.stringify({ messages: history.slice(-8), lang }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          write(answer);
        }

        answer += decoder.decode();
        write(answer.trim() || t.chat.empty);
      } catch (error) {
        if (controller.signal.aborted) {
          // Stopped on purpose — keep whatever text already arrived.
          setMessages((prev) =>
            prev.filter((message) => message.id !== assistantId || message.content),
          );
        } else {
          console.error('Chat request failed:', error);
          write(t.chat.error);
        }
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsLoading(false);
      }
    },
    [isLoading, lang, messages, t.chat.empty, t.chat.error],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.chat.open}
        className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-accent/30 bg-elevated text-accent shadow-lg shadow-black/40 transition-all duration-300 hover:border-accent/60 hover:text-accent-soft md:bottom-6 md:right-6 ${
          isOpen ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle size={22} aria-hidden />
      </button>

      {/* Backdrop — phones only, so the page stays readable on desktop */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label={t.chat.title}
        className={`fixed inset-x-3 bottom-3 top-[4.5rem] z-50 transition-all duration-300 md:inset-auto md:bottom-6 md:right-6 md:h-[min(560px,calc(100vh-7rem))] md:w-[24rem] ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-line bg-elevated px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                <MessageCircle size={17} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-ink">{t.chat.title}</h2>
                <p className="flex items-center gap-1.5 truncate text-xs text-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {t.chat.subtitle}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label={t.chat.clear}
                  title={t.chat.clear}
                  className="rounded-lg p-2 text-faint transition-colors hover:bg-surface hover:text-ink"
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t.chat.close}
                className="rounded-lg p-2 text-faint transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col justify-center gap-5 py-4 text-center">
                <div>
                  <p className="text-sm font-medium text-ink">{t.chat.greeting}</p>
                  <p className="mt-1 text-xs text-muted">{t.chat.hint}</p>
                </div>

                <div className="space-y-2">
                  {t.chat.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void sendMessage(suggestion)}
                      className="w-full rounded-xl border border-line bg-elevated px-3.5 py-2.5 text-left text-xs text-muted transition-colors hover:border-accent/40 hover:text-ink"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const isUser = message.role === 'user';
                const isPending = !isUser && !message.content && isLoading;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        isUser
                          ? 'rounded-br-md bg-accent text-[#04211d]'
                          : 'rounded-bl-md border border-line bg-elevated text-ink'
                      }`}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-1 py-1" aria-label="…">
                          {[0, 150, 300].map((delay) => (
                            <span
                              key={delay}
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="whitespace-pre-wrap break-words">
                          {message.content}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-line bg-elevated px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.chat.placeholder}
              aria-label={t.chat.placeholder}
              className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
            />

            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                aria-label={t.chat.stop}
                title={t.chat.stop}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Square size={14} aria-hidden fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label={t.chat.send}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-[#04211d] transition-opacity hover:bg-accent-soft disabled:opacity-35"
              >
                <Send size={16} aria-hidden />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
