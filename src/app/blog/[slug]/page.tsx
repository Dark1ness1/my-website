// src/app/blog/[slug]/page.tsx

import { getPostData, getSortedPostsData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Updated type with both params and searchParams as Promises
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams(): { slug: string }[] {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Updated generateMetadata with await for both params and searchParams
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  return {
    title: postData.title,
  };
}

// Updated component with await for both params and searchParams
export default async function Post({ params, searchParams }: Props) {
  const { slug } = await params;
  // const resolvedSearchParams = await searchParams; // ✅ Await searchParams if you need to use them
  
  const postData: PostData = await getPostData(slug);
  
  if (!postData) {
    notFound();
  }

  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
