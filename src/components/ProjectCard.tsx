// src/components/ProjectCard.tsx
'use client';

import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { pick } from '@/lib/format';
import type { Project, ProjectAccent } from '@/lib/projects';

/**
 * Tailwind only keeps classes it can see as complete strings, so each
 * accent spells its classes out rather than building them from fragments.
 */
const ACCENT: Record<ProjectAccent, { border: string; title: string; glow: string; chip: string }> = {
  teal: {
    border: 'group-hover:border-accent/45',
    title: 'group-hover:text-accent',
    glow: 'bg-accent/10',
    chip: 'border-accent/20 bg-accent/10 text-accent',
  },
  gold: {
    border: 'group-hover:border-gold/45',
    title: 'group-hover:text-gold',
    glow: 'bg-gold/10',
    chip: 'border-gold/20 bg-gold/10 text-gold',
  },
};

const STATUS_DOT: Record<Project['status'], string> = {
  live: 'bg-accent',
  wip: 'bg-gold',
  archived: 'bg-faint',
};

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const { lang, t } = useLanguage();
  const accent = ACCENT[project.accent];

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 ${accent.border}`}
    >
      {/* Corner light that warms up on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`}
            aria-hidden
          />
          {t.projects.status[project.status]}
        </span>
        <span className="font-mono text-xs text-faint">{project.year}</span>
      </div>

      <h3
        className={`relative mt-4 text-xl font-bold tracking-tight text-ink transition-colors ${accent.title}`}
      >
        {project.title}
      </h3>

      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-muted">
        {pick(project.tagline, lang)}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-line bg-elevated px-2.5 py-0.5 text-[11px] font-medium text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-line-soft pt-4">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          {t.projects.readMore}
          <ArrowUpRight
            size={15}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <div className="flex items-center gap-1">
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — ${t.projects.sourceCode}`}
              className="rounded-lg p-2 text-faint transition-colors hover:bg-elevated hover:text-ink"
            >
              <Github size={16} aria-hidden />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} — ${t.projects.liveDemo}`}
              className="rounded-lg p-2 text-faint transition-colors hover:bg-elevated hover:text-ink"
            >
              <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** The detail view opened from a card. */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();

  if (!project) return null;
  const accent = ACCENT[project.accent];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 shadow-2xl shadow-black/60 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <span
                className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`}
                aria-hidden
              />
              {t.projects.status[project.status]}
              <span className="text-faint">· {project.year}</span>
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.projects.close}
            className="shrink-0 rounded-lg p-2 text-faint transition-colors hover:bg-elevated hover:text-ink"
          >
            <span aria-hidden className="block text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <p className="mt-5 leading-relaxed text-muted">{pick(project.description, lang)}</p>

        {project.highlights.length > 0 && (
          <div className="mt-7">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
              {t.projects.highlights}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight.en}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[project.status]}`}
                    aria-hidden
                  />
                  {pick(highlight, lang)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-7">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
            {t.projects.builtWith}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${accent.chip}`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {(project.links.repo || project.links.demo) && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line-soft pt-6">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#04211d] transition-colors hover:bg-accent-soft"
              >
                {t.projects.liveDemo}
                <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Github size={15} aria-hidden />
                {t.projects.sourceCode}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
