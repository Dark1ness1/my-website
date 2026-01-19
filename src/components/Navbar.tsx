// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // Import hook

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage(); // Use the hook

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Navigation Links using Dynamic Text */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <Link href="/" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {t.nav.home}
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {t.nav.projects}
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {t.nav.blog}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {t.nav.about}
              </Link>
            </div>
          </div>

          {/* Right: Socials & Language */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black mr-4 border px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              <Globe size={16} />
              <span className="uppercase font-bold">{lang}</span>
            </button>

            {/* Social Icons remain same */}
            <a href="https://github.com/muhammadtalhanasir" target="_blank" className="text-gray-500 hover:text-black transition-transform hover:scale-110">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/muhammadtalhanasir" target="_blank" className="text-gray-500 hover:text-blue-600 transition-transform hover:scale-110">
              <Linkedin size={20} />
            </a>
            <a href="mailto:talha@example.com" className="text-gray-500 hover:text-red-500 transition-transform hover:scale-110">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}