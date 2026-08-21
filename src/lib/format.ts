// src/lib/format.ts
//
// Pure formatting helpers. Deliberately free of any Node-only imports so
// that client components can use them too (src/lib/posts.ts reads the
// filesystem and can only be imported from the server).

export type Lang = 'en' | 'de';

export type Localized = { en: string; de: string };

const LOCALE: Record<Lang, string> = { en: 'en-GB', de: 'de-DE' };

/** Reads the right side of a `{ en, de }` pair. */
export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}

/**
 * Post frontmatter dates are written by hand, so accept the shapes that
 * realistically show up: `DD-MM-YYYY` (what posts/ currently uses),
 * `YYYY-MM-DD`, and anything else `Date` understands.
 */
export function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const value = String(raw).trim();

  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (dmy) {
    const [, day, month, year] = dmy;
    return new Date(Date.UTC(+year, +month - 1, +day));
  }

  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (ymd) {
    const [, year, month, day] = ymd;
    return new Date(Date.UTC(+year, +month - 1, +day));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** Sortable key so posts order correctly whatever format they were written in. */
export function dateSortKey(raw: string | undefined): number {
  return parseDate(raw)?.getTime() ?? 0;
}

/** "20 January 2026" / "20. Januar 2026", falling back to the raw string. */
export function formatDate(raw: string | undefined, lang: Lang = 'en'): string {
  const date = parseDate(raw);
  if (!date) return raw ?? '';

  return new Intl.DateTimeFormat(LOCALE[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Machine-readable value for <time dateTime="…">. */
export function isoDate(raw: string | undefined): string | undefined {
  return parseDate(raw)?.toISOString().slice(0, 10);
}

/** Rough reading time in whole minutes, never less than one. */
export function readingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ') // don't count code blocks
    .replace(/[#*_>`\-[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

/** Fills `{n}`-style placeholders in a translation string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
