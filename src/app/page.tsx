// src/app/page.tsx
'use client'; // Required for language switching

import Link from 'next/link';
import { FloatingChatBot } from "@/components/FloatingChatBot";
import { useLanguage } from '@/context/LanguageContext';
// Note: We are mocking posts here for the client component. 
// In a production app, you'd fetch these in a server component and pass them as props.
const LATEST_POSTS = [
  { id: '1', title: 'Getting Started with Next.js', date: '2024-01-15' },
  { id: '2', title: 'Understanding AI Embeddings', date: '2024-02-10' },
  { id: '3', title: 'Why I Switched to Tailwind', date: '2024-03-05' },
];

export default function Home() {
  const { t } = useLanguage(); // Get the translations

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      
      {/* --- HERO SECTION --- */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-white relative p-8">
        <div className="max-w-4xl text-center space-y-6">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 shadow-xl">
             <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
               MT
             </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
            Muhammad Talha Nasir
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            {t.hero.role}
          </p>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          
          <div className="pt-8 animate-bounce text-gray-400">
            {t.hero.scroll}
          </div>
        </div>
      </section>


      {/* --- PROJECTS SECTION --- */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t.projects.title}</h2>
            <p className="text-gray-600">{t.projects.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl p-8 mb-12 transform hover:scale-[1.01] transition-all">
            <div className="aspect-video bg-gradient-to-tr from-gray-200 to-gray-300 rounded-xl flex items-center justify-center relative overflow-hidden group">
               <span className="text-gray-400 font-mono">Project Preview</span>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">AI Portfolio Assistant</h3>
              <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">AI</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                A Retrieval-Augmented Generation (RAG) chatbot that allows users to converse with my portfolio content.
              </p>
              <Link href="/projects" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                {t.projects.viewAll}
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* --- BLOG SECTION --- */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center bg-white p-8">
        <div className="max-w-6xl w-full">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.blog.title}</h2>
            <Link href="/blog" className="text-blue-600 hover:underline">
              {t.blog.viewAll}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {LATEST_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="h-full p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-sm text-gray-400 mb-4 block">{post.date}</span>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mb-6">Click to read more...</p>
                  </div>
                  <div className="text-blue-600 font-semibold group flex items-center">
                    {t.blog.readMore}
                    <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* --- CONTACT SECTION --- */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-gray-900 text-white p-8 relative">
        <div className="max-w-4xl text-center space-y-8">
          <h2 className="text-5xl font-bold">{t.contact.title}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
          
          <a 
            href="mailto:talha@example.com" 
            className="inline-block px-8 py-4 bg-white text-gray-900 text-xl font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
          >
            {t.contact.button}
          </a>

          <div className="pt-16 grid grid-cols-3 gap-8 text-sm text-gray-500">
             <div>
                <h4 className="text-white font-bold mb-2">{t.contact.socials}</h4>
                <ul className="space-y-1">
                   <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                   <li><a href="#" className="hover:text-white">GitHub</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-2">{t.contact.navigation}</h4>
                 <ul className="space-y-1">
                   <li><Link href="/" className="hover:text-white">{t.nav.home}</Link></li>
                   <li><Link href="/projects" className="hover:text-white">{t.nav.projects}</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-2">{t.contact.legal}</h4>
                 <ul className="space-y-1">
                   <li>Privacy Policy</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="absolute bottom-8 text-gray-600 text-sm">
          © {new Date().getFullYear()} Muhammad Talha Nasir. All rights reserved.
        </div>
      </section>

      <FloatingChatBot />
    </main>
  );
}