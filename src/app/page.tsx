// src/app/page.tsx

import { ChatBot } from "@/components/Chatbot"; // 1. Import the ChatBot component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold md:text-7xl">
          Your Name
        </h1>
        <p className="mt-4 text-lg text-gray-300 md:text-2xl">
          I build modern web applications.
        </p>
      </div>

      {/* 2. Add the ChatBot component to the page */}
      <div className="mt-12 w-full">
         <ChatBot />
      </div>

    </main>
  );
}