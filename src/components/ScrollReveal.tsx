// src/components/ScrollReveal.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Fades elements up as they scroll into view.
 *
 * Add `data-reveal` to any element — server or client, no wrapper needed.
 * Stagger a group with `style={{ '--reveal-delay': '80ms' }}`.
 *
 * Mounted once in the root layout. The matching CSS lives in globals.css
 * and only applies under the `js-reveal` class, which an inline script in
 * <head> sets before first paint, so nothing is hidden without JavaScript.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (node: Element) => node.classList.add('is-visible');

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    const observeAll = (root: ParentNode) =>
      root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((node) => {
        observer.observe(node);
      });

    observeAll(document);

    // Cards rendered later — by a tag filter, say — still need observing.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches('[data-reveal]:not(.is-visible)')) observer.observe(node);
          observeAll(node);
        }
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
