// src/app/projects/page.tsx
import type { Metadata } from 'next';
import { ProjectsView } from './ProjectsView';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Retrieval pipelines, AI automation and full-stack products I have designed, built and shipped.',
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
