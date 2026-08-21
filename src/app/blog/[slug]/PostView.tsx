// src/app/blog/[slug]/PostView.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fill, formatDate, isoDate } from '@/lib/format';
import type { Post, PostMeta } from '@/lib/posts';

function AdjacentLink({
  post,
  label,
  direction,
}: {
  post: PostMeta;
  label: string;
  direction: 'previous' | 'next';
}) {
  const isNext = direction === 'next';

  return (
    <Link
      href={`/blog/${post.id}`}
      className={`group flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 ${
        isNext ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-faint">
        {!isNext && (
          <ArrowLeft
            size={13}
            aria-hidden
            className="transition-transform group-hover:-translate-x-1"
          />
        )}
        {label}
        {isNext && (
          <ArrowRight
            size={13}
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
      <span className="font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
        {post.title}
      </span>
    </Link>
  );
}

export function PostView({
  post,
  previous,
  next,
}: {
  post: Post;
  previous: PostMeta | null;
  next: PostMeta | null;
}) {
  const { lang, t } = useLanguage();

  return (
    <article>
      {/* Title block */}
      <header className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6">
        <div aria-hidden className="grid-backdrop absolute inset-0" />
        <div
          aria-hidden
          className="glow absolute left-1/2 top-0 h-80 w-[28rem] -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              size={15}
              aria-hidden
              className="transition-transform group-hover:-translate-x-1"
            />
            {t.blog.backToAll}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <time dateTime={isoDate(post.date)}>{formatDate(post.date, lang)}</time>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden />
              {fill(t.blog.minRead, { n: post.readingMinutes })}
            </span>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tighter text-ink sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-line bg-elevated">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div
          className="article"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      {/* Keep reading */}
      {(previous || next) && (
        <nav
          aria-label={t.blog.keepReading}
          className="mx-auto max-w-3xl px-4 pb-24 sm:px-6"
        >
          <div className="hairline mb-10" />
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {t.blog.keepReading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <AdjacentLink post={previous} label={t.blog.previous} direction="previous" />
            ) : (
              <span />
            )}
            {next && <AdjacentLink post={next} label={t.blog.next} direction="next" />}
          </div>
        </nav>
      )}
    </article>
  );
}
