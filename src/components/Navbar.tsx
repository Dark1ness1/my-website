// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { navLinks, site } from '@/lib/site';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The bar stays transparent over the hero and gains a background once
  // content starts scrolling underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const socials = [
    { href: site.socials.github, label: 'GitHub', Icon: Github },
    { href: site.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: `mailto:${site.email}`, label: 'Email', Icon: Mail },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={site.name}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-elevated font-mono text-sm font-bold tracking-tight text-accent transition-colors group-hover:border-accent/50">
            {site.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">
            {site.shortName}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, key }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.nav[key]}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Languages size={14} aria-hidden />
            {lang}
          </button>

          <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden />

          <div className="hidden items-center gap-0.5 sm:flex">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                aria-label={label}
                className="rounded-lg p-2 text-faint transition-colors hover:bg-elevated hover:text-ink"
              >
                <Icon size={17} aria-hidden />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-elevated hover:text-ink md:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-4 py-4">
          {navLinks.map(({ href, key }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-elevated text-accent'
                      : 'text-muted hover:bg-elevated hover:text-ink'
                  }`}
                >
                  {t.nav[key]}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 border-t border-line px-6 py-4 sm:hidden">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer noopener"
              aria-label={label}
              className="rounded-lg border border-line p-2.5 text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Icon size={18} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
