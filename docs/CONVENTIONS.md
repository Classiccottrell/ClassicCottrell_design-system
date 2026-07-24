# Conventions

These are the rules the codebase already follows, written down so they stay
true on purpose instead of by accident. If you're adding a new primitive or
touching tokens, this is the doc to check first — `AGENTS.md` at the repo
root points here too, for agents working in this codebase.

## File naming

Every primitive in `components/ui/` gets its own file, named in kebab-case
(`feature-icon.tsx`, `card.tsx`). One primitive family per file — compound
components (see below) share their parent's file rather than splitting out.

## Export naming

- Components are PascalCase (`FeatureIcon`, `Card`).
- A component with variants exports its CVA variant map alongside it:
  `export { Badge, badgeVariants }`.
- Compound components share one file and a prefixed family of names —
  `Card`, `CardMedia`, `CardHeader`, `CardTitle`, `CardDescription`,
  `CardContent`, `CardFooter` all live in `card.tsx`.

## `data-slot`

Every primitive's root DOM node carries `data-slot="<kebab-case-name>"`
(e.g. `data-slot="button"`, `data-slot="card-header"`). This is a plain DOM
attribute, not a CVA variant — it exists so tests, browser tooling, or an
agent grepping rendered HTML can identify which primitive rendered a given
node without relying on class names. **New primitives must set it on their
outermost element.**

## The `cn()` merge convention

`className` is always passed last, so a caller's override wins via
`tailwind-merge`:

- CVA components: `cn(buttonVariants({ variant, size, className }))`
- Plain components: `cn('base classes here', className)`

## The CVA variant pattern

Any component with more than one visual mode uses `cva()` with a `variants`
object and `defaultVariants`, and exports `VariantProps<typeof xVariants>`
merged into its prop type. This is the pattern for adding a new variant —
not an ad hoc conditional className string.

## Two-layer token aliasing

This is the one architectural pattern that isn't obvious from reading
`app/globals.css` cold, so it's worth spelling out precisely.

**Layer 1** — `:root`, `.dark`, and the `@media (prefers-color-scheme: dark)`
fallback block (for system dark mode with no explicit `.dark` class) each
define the same set of semantic values with **no `--color-` prefix**:

```css
:root {
  --primary: #437057;
  --accent-foreground: #2f4f3e;
  /* … */
}
```

**Layer 2** — `@theme inline` re-aliases every one of those into a
`--color-*` name that Tailwind can generate utilities from:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-accent-foreground: var(--accent-foreground);
  /* … */
}
```

Components never reference layer 1 directly — they consume layer 2 via
Tailwind utilities (`bg-primary`, `text-accent-foreground`).

**Rule: adding a new semantic color means adding it in three places** —
`:root`, `.dark`, and the `@theme inline` alias — with the same name minus
the `--color-` prefix. (There's also a fourth block, the
`prefers-color-scheme` fallback, which duplicates `.dark` — easy to update
three blocks and forget this one; a consolidation candidate, not yet done.)

**Radius**: don't hand-add arbitrary radius values. The `--radius-{sm, md,
lg, xl, 2xl, 3xl, 4xl}` scale is derived by `calc()` off the single
`--radius` base in `:root` — change the base to rescale everything.

**Known gap, not yet reconciled**: `button.tsx` and `checkbox.tsx` use
hybrid arbitrary values like `rounded-[min(var(--radius-md),10px)]`, mixing
a token with a raw px ceiling. This is a documented exception, not a
pattern to copy — flagged here as a known inconsistency pending a decision
(accept the px ceiling as an intentional small-size correction and document
why, or replace it with a token).

## The `@example` JSDoc tag

Used today on the primitives that have meaningful variation. The target
convention going forward: every exported primitive gets a JSDoc block above
its function with a one-line description and, where the component has real
variation, an `@example` snippet showing it.

## Known gaps

This section is a live TODO, not a claim that the repo is fully compliant
with the rules above:

1. `card.tsx`'s `Card` and `CardMedia` have JSDoc; `CardHeader`,
   `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter` in the
   same file did not until this pass — see the components changed alongside
   this doc.
2. The `rounded-[min(...)]` hybrid values noted above are unreconciled.
