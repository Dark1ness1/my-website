// src/lib/site.ts
//
// Every piece of identity the site renders comes from here: the navbar,
// the footer, the contact section and the page metadata all read this
// object. Change a value once and it updates everywhere.

export const site = {
  name: 'Muhammad Talha Nasir',
  shortName: 'Talha Nasir',
  initials: 'MT',
  role: 'AI Engineer',
  location: 'Germany',

  // Used for every mailto: link on the site.
  email: 'talha11nasir11@gmail.com',

  // Absolute base URL, used for Open Graph tags and canonical links.
  // Set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  socials: {
    github: 'https://github.com/Dark1ness1',
    linkedin: 'https://linkedin.com/in/muhammadtalhanasir',
  },
} as const;

/** The links shown in the navbar and in the footer's navigation column. */
export const navLinks = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/blog', key: 'blog' },
  { href: '/about', key: 'about' },
] as const;

export type NavKey = (typeof navLinks)[number]['key'];
