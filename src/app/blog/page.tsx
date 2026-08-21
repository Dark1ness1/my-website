// src/app/blog/page.tsx
import type { Metadata } from 'next';
import { getAllTags, getSortedPostsData } from '@/lib/posts';
import { BlogView } from './BlogView';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on web development, AI and system architecture — retrieval pipelines, automation and the things that break along the way.',
};

export default function BlogPage() {
  return <BlogView posts={getSortedPostsData()} tags={getAllTags()} />;
}
