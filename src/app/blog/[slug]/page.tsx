// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAdjacentPosts, getPostData, getSortedPostsData } from '@/lib/posts';
import { isoDate } from '@/lib/format';
import { PostView } from './PostView';

type Props = {
  params: Promise<{ slug: string }>;
};

// Every post is known at build time. Turning off dynamic params means an
// unknown slug is answered straight from the 404 page instead of being
// rendered on demand — which in Next 15.4 streams an empty shell here.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getSortedPostsData().map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: isoDate(post.date),
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  // An unknown slug now renders the 404 page instead of throwing a 500.
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.id);

  return <PostView post={post} previous={previous} next={next} />;
}
