// src/components/PageHeader.tsx
'use client';

import type { CSSProperties, ReactNode } from 'react';

/** Shared masthead so every inner page opens the same way. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  glow = 'accent',
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  glow?: 'accent' | 'gold';
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line-soft px-4 pb-14 pt-32 sm:px-6 lg:px-8">
      <div aria-hidden className="grid-backdrop absolute inset-0" />
      <div
        aria-hidden
        className="glow absolute left-1/3 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
        style={{ '--glow': `var(--color-${glow})` } as CSSProperties}
      />

      <div className="relative mx-auto max-w-6xl">
        <span
          data-reveal
          className="block font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {eyebrow}
        </span>
        <h1
          data-reveal
          className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            data-reveal
            style={{ '--reveal-delay': '80ms' } as CSSProperties}
            className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
