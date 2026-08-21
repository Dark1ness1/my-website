// src/app/projects/ProjectsView.tsx
'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/PageHeader';
import { ProjectCard, ProjectDialog } from '@/components/ProjectCard';
import { ALL_TECH, PROJECTS, type Project } from '@/lib/projects';
import { fill } from '@/lib/format';

export function ProjectsView() {
  const { t } = useLanguage();
  const [tech, setTech] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (tech ? PROJECTS.filter((project) => project.tech.includes(tech)) : PROJECTS),
    [tech],
  );

  return (
    <>
      <PageHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.pageTitle}
        subtitle={t.projects.pageSubtitle}
        glow="gold"
      />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Filter bar */}
          <div
            data-reveal
            className="mb-10 flex flex-col gap-4 border-b border-line-soft pb-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <ul
              className="-mx-1 flex flex-wrap gap-2"
              aria-label={t.projects.filterLabel}
            >
              {[null, ...ALL_TECH].map((value) => {
                const active = tech === value;
                return (
                  <li key={value ?? '__all'}>
                    <button
                      type="button"
                      onClick={() => setTech(value)}
                      aria-pressed={active}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-line text-muted hover:border-accent/40 hover:text-ink'
                      }`}
                    >
                      {value ?? t.projects.filterAll}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="shrink-0 font-mono text-xs text-faint">
              {fill(t.projects.count, { n: visible.length, total: PROJECTS.length })}
            </p>
          </div>

          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center text-muted">
              {t.projects.empty}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, index) => (
                <div
                  key={project.slug}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
                >
                  <ProjectCard project={project} onSelect={setSelected} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
