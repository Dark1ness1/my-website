// src/lib/content.ts
//
// Every user-facing string on the site, in English and German.
//
// `de` is typed against `typeof en`, so if you add a key to one language
// TypeScript will tell you the other is missing it. To personalise the
// site, edit the strings here rather than the components.

const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    about: 'About Me',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language',
  },

  hero: {
    badge: 'Available for Werkstudent & freelance',
    role: 'AI Engineer | RAG',
    description: 'I specialize in Automation using AI.',
    ctaWork: 'View my work',
    ctaContact: 'Get in touch',
    scroll: 'Scroll to explore',
  },

  projects: {
    eyebrow: 'Selected work',
    title: 'Featured Work',
    subtitle: 'A selection of my recent technical projects.',
    pageTitle: 'Projects',
    pageSubtitle:
      'Things I have designed, built and shipped — from retrieval pipelines to full-stack products.',
    viewAll: 'View all projects',
    readMore: 'Read more',
    close: 'Close',
    builtWith: 'Built with',
    highlights: 'Highlights',
    liveDemo: 'Live demo',
    sourceCode: 'Source code',
    filterAll: 'All',
    filterLabel: 'Filter by technology',
    empty: 'No projects match that filter.',
    count: '{n} of {total} projects',
    status: {
      live: 'Live',
      wip: 'In progress',
      archived: 'Archived',
    },
  },

  blog: {
    eyebrow: 'Writing',
    title: 'Latest Insights',
    subtitle: 'Notes on web development, AI and system architecture.',
    pageTitle: 'Blog',
    pageSubtitle:
      'Exploring the frontiers of web development, AI and system architecture.',
    viewAll: 'View all posts',
    readMore: 'Read article',
    empty: 'No posts yet — the first one is on its way.',
    emptyFiltered: 'No posts under that topic yet.',
    allTopics: 'All topics',
    minRead: '{n} min read',
    topicCount: '{n} topics',
    backToAll: 'All posts',
    previous: 'Previous post',
    next: 'Next post',
    keepReading: 'Keep reading',
    topics: 'Topics',
    count: '{n} posts',
    countOne: '1 post',
  },

  about: {
    eyebrow: 'About me',
    title: 'Building things that think.',
    lead: 'I am an AI engineer focused on retrieval-augmented generation and practical automation — systems that read your data, reason over it, and do something useful with the answer.',
    paragraphs: [
      'Most of my work sits at the seam between a language model and the messy real world: getting the right context in front of the model, keeping the answers grounded, and wrapping the whole thing in an interface people actually want to use.',
      'I build end to end. That means the embedding pipeline and the vector store, but also the API route, the streaming UI and the deployment — because a retrieval system nobody can use is only half a project.',
      'Right now I am open to Werkstudent positions and freelance work. If you have a problem that looks like it needs a model in the loop, I would like to hear about it.',
    ],
    focusTitle: 'What I do',
    focus: [
      {
        title: 'Retrieval-augmented generation',
        body: 'Chunking, embeddings, vector search and prompt design that keeps model output tied to real sources instead of guesswork.',
      },
      {
        title: 'AI automation',
        body: 'Turning repetitive, judgement-heavy work into pipelines — document processing, classification, summarisation and routing.',
      },
      {
        title: 'Full-stack delivery',
        body: 'Next.js front ends, typed APIs and streaming interfaces, shipped to production rather than left in a notebook.',
      },
    ],
    stackTitle: 'Tools I reach for',
    stack: [
      { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
      { label: 'AI & data', items: ['Pinecone', 'Hugging Face', 'LangChain', 'Embeddings', 'RAG'] },
      { label: 'Web', items: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'] },
      { label: 'Platform', items: ['Vercel', 'Git', 'REST APIs', 'Docker'] },
    ],
    ctaTitle: 'Want the short version?',
    ctaBody: 'Ask the assistant in the corner — it has read everything on this site.',
    ctaButton: 'Send me an email',
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's Work Together",
    subtitle:
      "I'm currently available for freelance projects and Werkstudent. If you have a project that needs some creative injection, get in touch.",
    button: 'Say Hello 👋',
    copyEmail: 'Copy email address',
    copied: 'Copied',
    socials: 'Socials',
    navigation: 'Navigation',
    elsewhere: 'Elsewhere',
  },

  chat: {
    open: 'Open the AI assistant',
    close: 'Close chat',
    title: 'AI Assistant',
    subtitle: 'Trained on this site',
    greeting: "Hi — I'm the assistant for this site.",
    hint: 'Ask me about the projects or the blog posts.',
    placeholder: 'Ask me anything…',
    send: 'Send message',
    clear: 'Clear conversation',
    stop: 'Stop generating',
    error: 'Something went wrong on my side. Please try again.',
    empty: "I couldn't come up with an answer for that one.",
    suggestions: [
      'What does Talha work on?',
      'Explain the RAG chatbot',
      'What is in the latest blog post?',
    ],
  },

  notFound: {
    title: 'This page went missing.',
    subtitle:
      'The link may be out of date, or the page may have been renamed. These still work:',
    home: 'Back home',
    blog: 'Read the blog',
  },

  footer: {
    tagline: 'AI engineer building retrieval systems and automation.',
    rights: 'All rights reserved.',
    built: 'Built with Next.js and Tailwind CSS',
    backToTop: 'Back to top',
  },
};

/** English is the source of truth; every other language must match it exactly. */
export type Content = typeof en;

const de: Content = {
  nav: {
    home: 'Startseite',
    projects: 'Projekte',
    blog: 'Blog',
    about: 'Über mich',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    switchLanguage: 'Sprache wechseln',
  },

  hero: {
    badge: 'Offen für Werkstudent & Freelance',
    role: 'AI Engineer | RAG',
    description: 'Ich bin spezialisiert auf Automatisierung mit KI.',
    ctaWork: 'Meine Arbeit ansehen',
    ctaContact: 'Kontakt aufnehmen',
    scroll: 'Scrollen zum Entdecken',
  },

  projects: {
    eyebrow: 'Ausgewählte Arbeiten',
    title: 'Ausgewählte Projekte',
    subtitle: 'Eine Auswahl meiner aktuellen technischen Projekte.',
    pageTitle: 'Projekte',
    pageSubtitle:
      'Was ich entworfen, gebaut und ausgeliefert habe — von Retrieval-Pipelines bis zu Full-Stack-Produkten.',
    viewAll: 'Alle Projekte ansehen',
    readMore: 'Mehr erfahren',
    close: 'Schließen',
    builtWith: 'Umgesetzt mit',
    highlights: 'Highlights',
    liveDemo: 'Live-Demo',
    sourceCode: 'Quellcode',
    filterAll: 'Alle',
    filterLabel: 'Nach Technologie filtern',
    empty: 'Keine Projekte für diesen Filter.',
    count: '{n} von {total} Projekten',
    status: {
      live: 'Live',
      wip: 'In Arbeit',
      archived: 'Archiviert',
    },
  },

  blog: {
    eyebrow: 'Beiträge',
    title: 'Neueste Einblicke',
    subtitle: 'Notizen zu Webentwicklung, KI und Systemarchitektur.',
    pageTitle: 'Blog',
    pageSubtitle:
      'Unterwegs an den Grenzen von Webentwicklung, KI und Systemarchitektur.',
    viewAll: 'Alle Beiträge',
    readMore: 'Artikel lesen',
    empty: 'Noch keine Beiträge — der erste ist unterwegs.',
    emptyFiltered: 'Zu diesem Thema gibt es noch keine Beiträge.',
    allTopics: 'Alle Themen',
    minRead: '{n} Min. Lesezeit',
    topicCount: '{n} Themen',
    backToAll: 'Alle Beiträge',
    previous: 'Vorheriger Beitrag',
    next: 'Nächster Beitrag',
    keepReading: 'Weiterlesen',
    topics: 'Themen',
    count: '{n} Beiträge',
    countOne: '1 Beitrag',
  },

  about: {
    eyebrow: 'Über mich',
    title: 'Ich baue Systeme, die mitdenken.',
    lead: 'Ich bin AI Engineer mit Schwerpunkt auf Retrieval-Augmented Generation und praxisnaher Automatisierung — Systeme, die Daten lesen, daraus schließen und mit der Antwort etwas Sinnvolles anfangen.',
    paragraphs: [
      'Der Großteil meiner Arbeit liegt an der Nahtstelle zwischen Sprachmodell und unordentlicher Realität: den richtigen Kontext vor das Modell bringen, Antworten belegbar halten und das Ganze in eine Oberfläche packen, die man gerne benutzt.',
      'Ich baue durchgängig. Das heißt Embedding-Pipeline und Vektordatenbank, aber genauso API-Route, Streaming-UI und Deployment — denn ein Retrieval-System, das niemand bedienen kann, ist nur ein halbes Projekt.',
      'Aktuell bin ich offen für Werkstudentenstellen und Freelance-Projekte. Wenn Sie eine Aufgabe haben, bei der ein Modell im Spiel sein sollte, freue ich mich auf Ihre Nachricht.',
    ],
    focusTitle: 'Was ich mache',
    focus: [
      {
        title: 'Retrieval-Augmented Generation',
        body: 'Chunking, Embeddings, Vektorsuche und Prompt-Design, damit die Ausgabe an echten Quellen hängt statt an Vermutungen.',
      },
      {
        title: 'KI-Automatisierung',
        body: 'Wiederkehrende, urteilslastige Arbeit in Pipelines überführen — Dokumentenverarbeitung, Klassifikation, Zusammenfassung und Routing.',
      },
      {
        title: 'Full-Stack-Umsetzung',
        body: 'Next.js-Frontends, typisierte APIs und Streaming-Oberflächen — produktiv ausgeliefert statt im Notebook liegengelassen.',
      },
    ],
    stackTitle: 'Womit ich arbeite',
    stack: [
      { label: 'Sprachen', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
      { label: 'KI & Daten', items: ['Pinecone', 'Hugging Face', 'LangChain', 'Embeddings', 'RAG'] },
      { label: 'Web', items: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'] },
      { label: 'Plattform', items: ['Vercel', 'Git', 'REST-APIs', 'Docker'] },
    ],
    ctaTitle: 'Lieber die Kurzfassung?',
    ctaBody: 'Fragen Sie den Assistenten unten rechts — er kennt alles auf dieser Seite.',
    ctaButton: 'Schreiben Sie mir',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Lass uns zusammenarbeiten',
    subtitle:
      'Ich stehe derzeit für Freelance-Projekte und als Werkstudent zur Verfügung. Wenn Sie ein Projekt haben, das kreative Impulse benötigt, melden Sie sich.',
    button: 'Sag Hallo 👋',
    copyEmail: 'E-Mail-Adresse kopieren',
    copied: 'Kopiert',
    socials: 'Soziale Medien',
    navigation: 'Navigation',
    elsewhere: 'Woanders',
  },

  chat: {
    open: 'KI-Assistenten öffnen',
    close: 'Chat schließen',
    title: 'KI-Assistent',
    subtitle: 'Kennt diese Seite',
    greeting: 'Hallo — ich bin der Assistent dieser Seite.',
    hint: 'Fragen Sie mich zu den Projekten oder Blogbeiträgen.',
    placeholder: 'Stellen Sie mir eine Frage…',
    send: 'Nachricht senden',
    clear: 'Unterhaltung löschen',
    stop: 'Generierung stoppen',
    error: 'Auf meiner Seite ist etwas schiefgelaufen. Bitte erneut versuchen.',
    empty: 'Darauf konnte ich keine Antwort finden.',
    suggestions: [
      'Woran arbeitet Talha?',
      'Erkläre den RAG-Chatbot',
      'Worum geht es im letzten Blogbeitrag?',
    ],
  },

  notFound: {
    title: 'Diese Seite ist verschwunden.',
    subtitle:
      'Der Link ist vielleicht veraltet oder die Seite wurde umbenannt. Das hier funktioniert noch:',
    home: 'Zur Startseite',
    blog: 'Zum Blog',
  },

  footer: {
    tagline: 'AI Engineer für Retrieval-Systeme und Automatisierung.',
    rights: 'Alle Rechte vorbehalten.',
    built: 'Gebaut mit Next.js und Tailwind CSS',
    backToTop: 'Nach oben',
  },
};

export const translations = { en, de };
