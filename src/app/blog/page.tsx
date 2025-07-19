// src/app/blog/page.tsx

import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">My Blog</h1>
      <section className="mx-auto max-w-2xl">
        <ul>
          {allPosts.map(({ id, date, title, excerpt }) => (
            <li key={id} className="mb-6 rounded-lg border border-gray-700 p-4 transition-colors hover:bg-gray-800">
              <Link href={`/blog/${id}`} className="block">
                <h2 className="text-2xl font-semibold text-cyan-400">{title}</h2>
                <small className="text-gray-400">{date}</small>
                <p className="mt-2 text-gray-300">{excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}