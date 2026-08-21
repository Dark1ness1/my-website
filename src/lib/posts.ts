// src/lib/posts.ts
//
// Reads the markdown files in /posts. Server-only — this module touches
// the filesystem, so never import it from a client component. Anything a
// client component needs (date formatting, reading time) lives in
// src/lib/format.ts instead.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { dateSortKey, readingMinutes } from './format';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  /** Empty string when the post has no cover — the UI draws a placeholder. */
  coverImage: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function listPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => /\.mdx?$/i.test(name));
}

function idFromFileName(fileName: string): string {
  return fileName.replace(/\.mdx?$/i, '');
}

/** First couple of sentences of the body, for posts with no `excerpt` set. */
function deriveExcerpt(markdown: string): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= 160) return plain;
  return `${plain.slice(0, 157).trimEnd()}…`;
}

function toMeta(fileName: string): PostMeta {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id: idFromFileName(fileName),
    title: typeof data.title === 'string' ? data.title : idFromFileName(fileName),
    date: typeof data.date === 'string' ? data.date : '',
    excerpt: typeof data.excerpt === 'string' && data.excerpt.trim()
      ? data.excerpt
      : deriveExcerpt(content),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : '',
    readingMinutes: readingMinutes(content),
  };
}

/** All posts, newest first. */
export function getSortedPostsData(): PostMeta[] {
  return listPostFiles()
    .map(toMeta)
    .sort((a, b) => dateSortKey(b.date) - dateSortKey(a.date));
}

/** Returns null for an unknown slug so the page can call notFound(). */
export async function getPostData(id: string): Promise<Post | null> {
  // Never let a slug from the URL escape the posts directory.
  if (!/^[a-zA-Z0-9._-]+$/.test(id)) return null;

  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);

  const processed = await remark().use(html).process(content);

  return {
    ...toMeta(`${id}.md`),
    contentHtml: processed.toString(),
  };
}

/** The posts either side of `id` in publication order, for post-footer links. */
export function getAdjacentPosts(id: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getSortedPostsData();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return { previous: null, next: null };

  return {
    // `posts` is newest first, so the *newer* neighbour sits at a lower index.
    next: posts[index - 1] ?? null,
    previous: posts[index + 1] ?? null,
  };
}

/** Every tag in use, most frequent first, for the blog filter bar. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of getSortedPostsData()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
