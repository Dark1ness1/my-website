// src/components/ProjectGallery.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react'; 

// --- YOUR PROJECT DATA ---
// You can edit these details to match your actual projects
const PROJECTS = [
  {
    id: 1,
    title: "AI Portfolio",
    shortDescription: "A Next.js portfolio with a RAG chatbot.",
    fullDescription: "Built with Next.js 14, Tailwind CSS, and Google Gemini/Hugging Face. It uses vector embeddings to let users chat with my content directly on the page.",
    tech: ["Next.js", "TypeScript", "Pinecone", "Hugging Face"]
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    shortDescription: "Real-time analytics for online stores.",
    fullDescription: "A comprehensive dashboard featuring charts, real-time sales tracking, inventory management, and stripe payment integration.",
    tech: ["React", "Node.js", "Chart.js", "Stripe"]
  },
  {
    id: 3,
    title: "Task Management App",
    shortDescription: "A collaborative tool for remote teams.",
    fullDescription: "Allows teams to create tasks, assign members, and track progress in real-time using WebSockets.",
    tech: ["Vue.js", "Firebase", "Tailwind"]
  }
];

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section className="w-full max-w-5xl py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
      
      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {PROJECTS.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer bg-white hover:scale-105 group"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mb-4">
               {project.tech.slice(0, 2).map(t => (
                  <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{t}</span>
               ))}
            </div>
            <span className="text-blue-500 text-sm font-medium">Click for details →</span>
          </div>
        ))}
      </div>

      {/* The Modal (Popup) */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
            <div className="h-1 w-20 bg-blue-500 rounded mb-6"></div>
            
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              {selectedProject.fullDescription}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map(t => (
                <span key={t} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          {/* Close when clicking background */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setSelectedProject(null)}
          />
        </div>
      )}
    </section>
  );
}