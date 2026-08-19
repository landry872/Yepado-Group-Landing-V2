# Yepado Group — Landing Page

React (Vite + TypeScript) implementation of the Yepado Group landing page.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/components/` — one component per section (Header, Hero, Chiffres, AboutScrolly, Filiales, Solutions, Contact, Footer, …), each with its own `.css` file.
- `src/data/` — typed content (filiales, sectors, partners, solutions, about chapters/metrics) ported from the source design.
- `src/hooks/` — small reusable hooks (`useReveal` for scroll-fade-ins, `useCountUp` for the stat counters).
- `src/styles/global.css` — shared tokens, keyframes, and cross-cutting classes (marquees, buttons, reveal states).
- `public/logos/`, `public/uploads/`, `public/flags/` — brand assets (logos, photos, video, country flags), only the files actually referenced by the page.

## Known follow-ups

- **Contact form** (`src/components/Contact.tsx`) — currently a client-side "fake submit," with no backend. Wire it up to a real endpoint (Formspree, a serverless function, a `mailto:` fallback, etc.) before relying on it to actually receive messages.
- **Favicon** — currently the Yepado Group wordmark as a stand-in; swap in a proper square icon if/when one exists.
