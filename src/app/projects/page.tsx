// src/app/projects/page.tsx

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">
        My Projects
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Card - You will map over your projects here later */}
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-2xl font-semibold">Project Title 1</h2>
          <p className="mt-2 text-gray-400">
            A short description of the project and what it does.
          </p>
          <p className="mt-4 text-sm font-semibold text-cyan-400">
            Tech Used: Next.js, TypeScript, Tailwind CSS
          </p>
        </div>
        {/* Add more project cards here */}
      </div>
    </div>
  );
}