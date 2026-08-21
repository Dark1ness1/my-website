// src/app/not-found.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-4 py-32">
      <div aria-hidden className="grid-backdrop absolute inset-0" />
      <div
        aria-hidden
        className="glow absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative max-w-lg text-center">
        <p className="font-mono text-7xl font-bold tracking-tighter text-line sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{t.notFound.subtitle}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#04211d] transition-colors hover:bg-accent-soft sm:w-auto"
          >
            <Home size={16} aria-hidden />
            {t.notFound.home}
          </Link>
          <Link
            href="/blog"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent sm:w-auto"
          >
            {t.notFound.blog}
            <ArrowRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
