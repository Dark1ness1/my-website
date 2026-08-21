// src/app/about/AboutView.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/lib/site';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

export function AboutView() {
  const { t } = useLanguage();

  const links = [
    { href: `mailto:${site.email}`, label: site.email, Icon: Mail },
    { href: site.socials.github, label: 'GitHub', Icon: Github },
    { href: site.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        subtitle={t.about.lead}
      />

      {/* Bio + contact card */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div data-reveal className="space-y-6">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <aside
            data-reveal
            style={delay(100)}
            className="h-fit rounded-2xl border border-line bg-surface p-6"
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-elevated font-mono text-lg font-bold text-accent">
              {site.initials}
            </span>
            <h2 className="mt-5 font-semibold text-ink">{site.name}</h2>
            <p className="mt-1 text-sm text-muted">
              {site.role} · {site.location}
            </p>

            <ul className="mt-6 space-y-3 border-t border-line-soft pt-5">
              {links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Icon
                      size={15}
                      aria-hidden
                      className="text-faint transition-colors group-hover:text-accent"
                    />
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* What I do */}
      <section className="border-t border-line-soft px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2
            data-reveal
            className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {t.about.focusTitle}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.about.focus.map((item, index) => (
              <div
                key={item.title}
                data-reveal
                style={delay(index * 80)}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-line-soft px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2
            data-reveal
            className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {t.about.stackTitle}
          </h2>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {t.about.stack.map((group, index) => (
              <div key={group.label} data-reveal style={delay(index * 70)}>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  {group.label}
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-elevated px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line-soft px-4 py-20 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12"
        >
          <div
            aria-hidden
            className="glow absolute left-1/2 top-full h-72 w-72 -translate-x-1/2 -translate-y-1/2"
            style={{ '--glow': 'var(--color-gold)' } as CSSProperties}
          />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t.about.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted">
              {t.about.ctaBody}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#04211d] transition-colors hover:bg-accent-soft sm:w-auto"
              >
                <Mail size={16} aria-hidden />
                {t.about.ctaButton}
              </a>
              <Link
                href="/projects"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent sm:w-auto"
              >
                {t.projects.viewAll}
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
