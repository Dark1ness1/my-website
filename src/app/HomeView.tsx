// src/app/HomeView.tsx
'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PostCard } from '@/components/PostCard';
import { ProjectCard, ProjectDialog } from '@/components/ProjectCard';
import { site } from '@/lib/site';
import type { PostMeta } from '@/lib/posts';
import type { Project } from '@/lib/projects';

/** Staggers a group of revealed items. */
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div
      data-reveal
      className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-3 leading-relaxed text-muted">{subtitle}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
        >
          {action.label}
          <ArrowRight
            size={15}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}

export function HomeView({
  posts,
  projects,
}: {
  posts: PostMeta[];
  projects: Project[];
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the mailto: button next to this still works.
    }
  };

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-24 pt-28">
        <div aria-hidden className="grid-backdrop absolute inset-0" />
        <div
          aria-hidden
          className="glow absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <div data-reveal className="mx-auto mb-8 w-fit">
            <span className="grid h-24 w-24 place-items-center rounded-3xl border border-line bg-elevated font-mono text-2xl font-bold tracking-tight text-accent">
              {site.initials}
            </span>
          </div>

          <div data-reveal style={delay(60)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t.hero.badge}
            </span>
          </div>

          <h1
            data-reveal
            style={delay(120)}
            className="text-gradient mt-7 text-balance text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl"
          >
            {site.name}
          </h1>

          <p
            data-reveal
            style={delay(180)}
            className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-accent-soft sm:text-base"
          >
            {t.hero.role}
          </p>

          <p
            data-reveal
            style={delay(240)}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            {t.hero.description}
          </p>

          <div
            data-reveal
            style={delay(300)}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#04211d] transition-colors hover:bg-accent-soft sm:w-auto"
            >
              {t.hero.ctaWork}
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent sm:w-auto"
            >
              <Mail size={16} aria-hidden />
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-xs text-faint"
        >
          <span className="font-mono uppercase tracking-[0.2em]">{t.hero.scroll}</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ------------------------------------------------------ PROJECTS */}
      <section className="border-t border-line-soft px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            action={{ href: '/projects', label: t.projects.viewAll }}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div key={project.slug} data-reveal style={delay(index * 80)}>
                <ProjectCard project={project} onSelect={setSelected} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- BLOG */}
      <section className="border-t border-line-soft px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.blog.eyebrow}
            title={t.blog.title}
            subtitle={t.blog.subtitle}
            action={{ href: '/blog', label: t.blog.viewAll }}
          />

          {posts.length === 0 ? (
            <p
              data-reveal
              className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center text-muted"
            >
              {t.blog.empty}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div key={post.id} data-reveal style={delay(index * 80)}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- CONTACT */}
      <section className="border-t border-line-soft px-4 py-24 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12"
        >
          <div
            aria-hidden
            className="glow absolute left-1/2 top-full h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2"
            style={{ '--glow': 'var(--color-gold)' } as CSSProperties}
          />

          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              {t.contact.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
              {t.contact.subtitle}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-accent sm:w-auto"
              >
                {t.contact.button}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono text-sm text-muted transition-colors hover:border-accent/50 hover:text-accent sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check size={15} aria-hidden />
                    {t.contact.copied}
                  </>
                ) : (
                  <>
                    <Copy size={15} aria-hidden />
                    {site.email}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
