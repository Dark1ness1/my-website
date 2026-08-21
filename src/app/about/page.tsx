// src/app/about/page.tsx
//
// The navbar has always linked here — until now the link 404'd.

import type { Metadata } from 'next';
import { AboutView } from './AboutView';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'AI engineer working on retrieval-augmented generation, automation pipelines and the full-stack interfaces around them.',
};

export default function AboutPage() {
  return <AboutView />;
}
