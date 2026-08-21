// src/lib/projects.ts
//
// The project list, in one place, so the home page and the projects page
// can never drift apart. Add a project by appending to PROJECTS — set
// `featured: true` to surface it on the home page.

import type { Localized } from './format';

export type ProjectStatus = 'live' | 'wip' | 'archived';

/** Cards alternate between the two site accents so the grid stays lively. */
export type ProjectAccent = 'teal' | 'gold';

export type Project = {
  slug: string;
  title: string;
  year: string;
  status: ProjectStatus;
  accent: ProjectAccent;
  featured: boolean;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  tech: string[];
  links: { demo?: string; repo?: string };
};

export const PROJECTS: Project[] = [
  {
    slug: 'ai-portfolio-assistant',
    title: 'AI Portfolio Assistant',
    year: '2026',
    status: 'live',
    accent: 'teal',
    featured: true,
    tagline: {
      en: 'A RAG chatbot that answers questions about my work.',
      de: 'Ein RAG-Chatbot, der Fragen zu meiner Arbeit beantwortet.',
    },
    description: {
      en: 'The assistant built into this site. Every blog post is chunked, embedded and stored in a Pinecone vector index. When you ask a question it embeds your query, retrieves the closest passages, and streams an answer grounded in that context — so replies stay tied to what I have actually written.',
      de: 'Der in diese Seite eingebaute Assistent. Jeder Blogbeitrag wird zerlegt, eingebettet und in einem Pinecone-Vektorindex gespeichert. Bei einer Frage wird die Anfrage eingebettet, die passendsten Abschnitte werden abgerufen und die Antwort wird auf dieser Grundlage gestreamt — so bleiben die Antworten an das gebunden, was ich tatsächlich geschrieben habe.',
    },
    highlights: [
      {
        en: 'Semantic retrieval over the site content with Pinecone',
        de: 'Semantische Suche über die Seiteninhalte mit Pinecone',
      },
      {
        en: 'Token-by-token streaming responses, no page reload',
        de: 'Token-für-Token-Streaming der Antworten, ohne Neuladen',
      },
      {
        en: 'Open-source embeddings and inference via Hugging Face',
        de: 'Open-Source-Embeddings und Inferenz über Hugging Face',
      },
    ],
    tech: ['Next.js', 'TypeScript', 'Pinecone', 'Hugging Face', 'Tailwind CSS'],
    links: {
      repo: 'https://github.com/Dark1ness1/my-website',
    },
  },
  {
    slug: 'ecommerce-analytics-dashboard',
    title: 'E-Commerce Analytics Dashboard',
    year: '2025',
    status: 'wip',
    accent: 'gold',
    featured: true,
    tagline: {
      en: 'Real-time sales and inventory analytics for online stores.',
      de: 'Echtzeit-Analysen zu Umsatz und Lagerbestand für Onlineshops.',
    },
    description: {
      en: 'A dashboard that pulls orders, stock levels and payment events into a single view. Charts update as events arrive, low-stock items raise alerts, and Stripe webhooks keep revenue figures accurate without a nightly batch job.',
      de: 'Ein Dashboard, das Bestellungen, Lagerbestände und Zahlungsereignisse in einer Ansicht bündelt. Diagramme aktualisieren sich beim Eintreffen neuer Ereignisse, niedrige Bestände lösen Warnungen aus, und Stripe-Webhooks halten die Umsatzzahlen ohne nächtlichen Batch-Lauf aktuell.',
    },
    highlights: [
      {
        en: 'Live revenue and order charts driven by webhook events',
        de: 'Live-Diagramme zu Umsatz und Bestellungen über Webhook-Events',
      },
      {
        en: 'Inventory alerts before items sell out',
        de: 'Bestandswarnungen, bevor Artikel ausverkauft sind',
      },
      {
        en: 'Stripe integration for payments and refunds',
        de: 'Stripe-Anbindung für Zahlungen und Rückerstattungen',
      },
    ],
    tech: ['React', 'Node.js', 'Chart.js', 'Stripe', 'PostgreSQL'],
    links: {},
  },
  {
    slug: 'collaborative-task-manager',
    title: 'Collaborative Task Manager',
    year: '2025',
    status: 'wip',
    accent: 'teal',
    featured: false,
    tagline: {
      en: 'A shared board for remote teams, synced over WebSockets.',
      de: 'Ein gemeinsames Board für Remote-Teams, synchronisiert über WebSockets.',
    },
    description: {
      en: 'Teams create tasks, assign owners and move cards across columns while everyone else sees the change immediately. State is reconciled through a WebSocket channel so two people editing the same board never overwrite each other.',
      de: 'Teams erstellen Aufgaben, weisen Verantwortliche zu und verschieben Karten zwischen Spalten — alle anderen sehen die Änderung sofort. Der Zustand wird über einen WebSocket-Kanal abgeglichen, sodass zwei Personen am selben Board sich nicht gegenseitig überschreiben.',
    },
    highlights: [
      {
        en: 'Optimistic updates with conflict reconciliation',
        de: 'Optimistische Updates mit Konfliktauflösung',
      },
      {
        en: 'Role-based permissions per board',
        de: 'Rollenbasierte Berechtigungen pro Board',
      },
      {
        en: 'Offline-tolerant queue that replays on reconnect',
        de: 'Offline-tolerante Warteschlange, die bei Reconnect nachspielt',
      },
    ],
    tech: ['Vue.js', 'Firebase', 'WebSockets', 'Tailwind CSS'],
    links: {},
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

/** Every distinct technology across all projects, alphabetised — used for filtering. */
export const ALL_TECH = Array.from(
  new Set(PROJECTS.flatMap((project) => project.tech)),
).sort((a, b) => a.localeCompare(b));
