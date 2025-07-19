// src/app/blog/[slug]/page.tsx

import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Type for the component's props
type Props = {
  params: {
    slug: string;
  };
};

// This function tells Next.js which slugs (IDs) to pre-render at build time
export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-extrabold text-cyan-400">{postData.title}</h1>
        <div className="mb-8 text-gray-400">{postData.date}</div>
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </article>
  );
}