// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to ignore ESLint errors during deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this block to ignore TypeScript errors during deployment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;