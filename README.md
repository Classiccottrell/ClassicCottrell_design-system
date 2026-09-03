# ClassicCottrell Design System

An editorial design system — warm cream canvas, a single forest-green accent, and a
Rosarivo-serif / Red Hat Display-sans pairing — inspired by ClassicCottrell.ca.
Built with [Next.js](https://nextjs.org) (App Router), React 19, Tailwind CSS v4,
and [`@base-ui/react`](https://base-ui.com) primitives.

- Workbench for my website classiccottrell.ca
- View the live site at design.classiccottrell.ca
- **Live showcase:** the home page (`/`) — tokens, type, buttons, and components.
- **Demo pages:** `/demos` — a landing, contact form, about, and gallery page, each
  assembled entirely from the reusable primitives.

## Documentation

| Doc | What's in it |
| --- | --- |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Every primitive in `components/ui/` — props, variants, and copy-paste examples. |
| [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) | Naming, `data-slot`, the CVA pattern, and the two-layer token aliasing rule. |
| [`docs/PAGES.md`](docs/PAGES.md) | Step-by-step reconstruction of each demo page from the primitives. |
| [`REVIEW.md`](REVIEW.md) | Architecture review, what was extended, and follow-up recommendations. |

## Project structure

```
app/
  globals.css          # design tokens (light + dark) + theme mapping
  layout.tsx           # fonts, ThemeProvider, metadata
  page.tsx             # design-system showcase (home)
  demos/               # landing · form · about · gallery (+ shared layout)
components/
  ui/                  # reusable primitives (Button, Card, Input, Badge, …)
  ds/                  # showcase-only helpers (Section, SiteHeader, ThemeToggle)
lib/utils.ts           # cn() — clsx + tailwind-merge
```

Re-theming is a values-only edit: change the CSS variables in `app/globals.css`
and every component follows.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
