// src/app/page.tsx
//
// Server component: reads the real posts off disk and hands them to the
// client view. The home page used to show three hard-coded posts whose
// links went nowhere — this is the fix.

import { getSortedPostsData } from '@/lib/posts';
import { FEATURED_PROJECTS } from '@/lib/projects';
import { HomeView } from './HomeView';

export default function Home() {
  const latestPosts = getSortedPostsData().slice(0, 3);

  return <HomeView posts={latestPosts} projects={FEATURED_PROJECTS} />;
}
