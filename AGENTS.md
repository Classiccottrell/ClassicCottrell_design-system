# Agent notes for this repo

This is an editorial design system (Next.js 16 / React 19 / Tailwind v4 /
@base-ui/react / CVA). Three tiers of truth, in order of what to read first:

1. Tokens — `app/globals.css` (two-layer aliasing; see CONVENTIONS.md).
2. Naming/structure rules — `docs/CONVENTIONS.md`.
3. Component reference — `docs/COMPONENTS.md`, plus each component's own
   JSDoc for its "when to use this" decision rule.

## Before you touch styling

Read `docs/CONVENTIONS.md`'s two-layer token section first. A new semantic
color needs an entry in `:root`, `.dark`, *and* the `@theme inline` alias —
missing any one silently breaks the Tailwind utility for it.

## Before you touch a component

Check `docs/COMPONENTS.md` for props/variants, and the component's JSDoc for
the decision rule, before picking a variant. Quick digest of the highest-
traffic ones:

- Button: `destructive` only for irreversible actions; `outline`/`ghost` for
  secondary actions beside a primary one.
- Callout vs. Badge: Callout for a full sentence reporting an action's
  outcome; Badge for a short inline label, not an outcome.

## What not to do

- No raw hex colors in `components/ui/*.tsx` — use token utilities.
- No new primitive without `data-slot="<kebab-name>"`, a kebab-case
  filename, and an `@example` JSDoc tag.
- No hand-rolled variant conditionals where CVA already models the axis.
- Never add a color to `:root` alone — it needs `.dark`, the
  `prefers-color-scheme` fallback, *and* the `@theme inline` alias. This is
  the most common way to silently break dark mode here.

## Enforcement

`scripts/validate-tokens.mjs` (`pnpm validate`) checks the rules above
mechanically — including token/dark-mode parity and drift between tokens and
the two files that hardcode hex copies of them for display
(`components/ds/color-palette.tsx`, `app/layout.tsx`'s `themeColor`). See the
table in `docs/CONVENTIONS.md` for what each check covers.

`.github/workflows/ci.yml` runs `pnpm lint`, `pnpm typecheck`,
`pnpm validate`, and `pnpm build` on every PR and on pushes to `main`. All
four must pass before merge.

## Trust levels

This repo is at **Level 0**: suggest-only. Any check, script, or agent can
flag or draft a change; a human always reviews and merges. There is no
auto-fix or auto-merge automation in this repo. Any risk to visual output
(a token, a CVA variant, a color pairing) is always human-reviewed,
regardless of who or what authored the diff. If you're an agent working
here: expect your early PRs to be reviewed line-by-line, not skimmed — that
review is what calibrates whether a rule you're following is actually
right.

## MCPs this repo expects

- **GitHub** — PR review is the trust-level floor above; nothing merges
  without it.
- **Penpot** (local/self-hosted, once deployed) — for cross-referencing
  design-tool variables/tokens against `app/globals.css`. Code remains the
  source of truth: `components/ui/*.tsx` and `docs/COMPONENTS.md` win over
  Penpot (or Figma) if the two disagree, because code is the last thing the
  user sees.
- Figma MCP may be available but isn't wired into this repo's workflow
  unless a specific Figma file is later named as this system's design
  source.
