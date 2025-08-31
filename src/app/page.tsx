// src/app/page.tsx
import Link from 'next/link';
import { FloatingChatBot } from "@/components/FloatingChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold md:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Name
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-2xl max-w-2xl">
            I build modern web applications with cutting-edge technologies
          </p>
          
          {/* Quick Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/blog"
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-full hover:text-white transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
            >
              <span className="relative z-10">📝 Read My Blog</span>
            </Link>
            
            <Link 
              href="/projects"
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-medium text-purple-600 border-2 border-purple-600 rounded-full hover:text-white transition-all duration-300 ease-in-out hover:bg-purple-600 hover:shadow-lg"
            >
              <span className="relative z-10">🚀 View Projects</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
            <div className="text-2xl mb-3">💻</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Web Development</h3>
            <p className="text-blue-600 text-sm">Building responsive, modern web applications with the latest technologies</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-purple-700">AI Integration</h3>
            <p className="text-purple-600 text-sm">Implementing AI-powered features and intelligent user experiences</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Performance</h3>
            <p className="text-indigo-600 text-sm">Optimized applications with lightning-fast load times and smooth interactions</p>
          </div>
        </div>

        {/* Recent Blog Preview */}
        <div className="mt-16 max-w-4xl w-full px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Latest from the Blog</h2>
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <Link href="/blog/my-first-post" className="block group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors text-gray-900">
                My First Blog Post
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                Welcome to my blog! Here I&apos;ll share my thoughts on web development, AI, and technology.
              </p>
              <span className="text-blue-600 text-sm font-medium group-hover:underline">
                Read more →
              </span>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Have a question?</h2>
          <p className="text-gray-600 mb-6">
            Ask my AI assistant anything about my work, projects, or blog posts!
          </p>
          <div className="text-sm text-gray-500">
            Look for the chat icon in the bottom right corner 💬
          </div>
        </div>
      </div>

      {/* Floating ChatBot */}
      <FloatingChatBot />
    </main>
  );
}