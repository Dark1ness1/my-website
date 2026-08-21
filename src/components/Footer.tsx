// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { navLinks, site } from '@/lib/site';

export function Footer() {
  const { t } = useLanguage();

  const elsewhere = [
    { href: site.socials.github, label: 'GitHub', Icon: Github },
    { href: site.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: `mailto:${site.email}`, label: site.email, Icon: Mail },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-elevated font-mono text-sm font-bold text-accent transition-colors group-hover:border-accent/50">
                {site.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-xs text-faint">{site.location}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
              {t.contact.navigation}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
              {t.contact.elsewhere}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Icon size={15} aria-hidden className="text-faint group-hover:text-accent" />
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>

          <div className="flex items-center gap-5">
            <span className="text-xs text-faint">{t.footer.built}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <ArrowUp size={13} aria-hidden />
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
