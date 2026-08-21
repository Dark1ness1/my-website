// src/app/blog/BlogView.tsx
'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/PageHeader';
import { PostCard } from '@/components/PostCard';
import { fill } from '@/lib/format';
import type { PostMeta } from '@/lib/posts';

export function BlogView({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}) {
  const { t } = useLanguage();
  const [topic, setTopic] = useState<string | null>(null);

  const visible = useMemo(
    () => (topic ? posts.filter((post) => post.tags.includes(topic)) : posts),
    [posts, topic],
  );

  return (
    <>
      <PageHeader
        eyebrow={t.blog.eyebrow}
        title={t.blog.pageTitle}
        subtitle={t.blog.pageSubtitle}
      />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {tags.length > 0 && (
            <div
              data-reveal
              className="mb-10 flex flex-col gap-4 border-b border-line-soft pb-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <ul className="flex flex-wrap gap-2" aria-label={t.blog.topics}>
                {[null, ...tags.map((entry) => entry.tag)].map((value) => {
                  const active = topic === value;
                  return (
                    <li key={value ?? '__all'}>
                      <button
                        type="button"
                        onClick={() => setTopic(value)}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-line text-muted hover:border-accent/40 hover:text-ink'
                        }`}
                      >
                        {value ?? t.blog.allTopics}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="shrink-0 font-mono text-xs text-faint">
                {visible.length === 1
                  ? t.blog.countOne
                  : fill(t.blog.count, { n: visible.length })}
              </p>
            </div>
          )}

          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line bg-surface px-6 py-20 text-center text-muted">
              {posts.length === 0 ? t.blog.empty : t.blog.emptyFiltered}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post, index) => (
                <div
                  key={post.id}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
