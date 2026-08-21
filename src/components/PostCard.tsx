// src/components/PostCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fill, formatDate, isoDate } from '@/lib/format';
import type { PostMeta } from '@/lib/posts';

export function PostCard({ post }: { post: PostMeta }) {
  const { lang, t } = useLanguage();

  return (
    <Link href={`/blog/${post.id}`} className="group block h-full focus:outline-none">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-focus-visible:border-accent">
        {/* Cover */}
        <div className="relative h-44 w-full overflow-hidden bg-elevated">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              aria-hidden
              className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(251,191,36,0.14),transparent_55%)]"
            >
              <span className="font-mono text-4xl font-bold text-line">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-70"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3 font-mono text-xs text-faint">
            <time dateTime={isoDate(post.date)}>{formatDate(post.date, lang)}</time>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden />
              {fill(t.blog.minRead, { n: post.readingMinutes })}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-elevated px-2.5 py-0.5 text-[11px] font-medium text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line-soft pt-4 text-sm font-semibold text-accent">
            {t.blog.readMore}
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
