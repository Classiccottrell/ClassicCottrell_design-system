# Component Reference

The reusable primitives live in `components/ui/`. Every component:

- merges classes with `cn()` from `lib/utils.ts` (clsx + tailwind-merge), so any
  `className` you pass **overrides** the defaults;
- reads only from the design tokens defined in `app/globals.css` (`--primary`,
  `--card`, `--accent`, …), so light/dark and any future re-theme just work;
- carries a `data-slot` attribute for styling/testing hooks.

Import from the `@/components/ui/*` alias:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
```

---

## Container

The shared page gutter — centers content and caps it at `max-w-6xl` with the
system's horizontal padding. Use it as the outer wrapper of every page section.

```tsx
<Container>…</Container>
<Container className="py-24">…</Container>   // add vertical rhythm
```

| Prop | Type | Notes |
| --- | --- | --- |
| `className` | `string` | Extends/overrides the default `mx-auto w-full max-w-6xl px-6`. |
| …`div` props | — | Renders a `<div>`. |

---

## Button

CVA-based button built on `@base-ui/react/button`. Supports rendering as another
element (e.g. a link) via base-ui's `render` prop.

```tsx
<Button>Save</Button>
<Button variant="outline" size="lg">View work <ArrowUpRight /></Button>

// Render as a link (Next.js <Link/> or <a>):
<Button nativeButton={false} render={<Link href="/demos/form" />}>Contact</Button>
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `default` · `secondary` · `outline` · `ghost` · `link` · `destructive` | `default` |
| `size` | `default` · `xs` · `sm` · `lg` · `icon` · `icon-xs` · `icon-sm` · `icon-lg` | `default` |
| `nativeButton` / `render` | from base-ui — swap the underlying element | — |

Icons: drop a `lucide-react` icon as a child; it is auto-sized.

---

## Badge

Small pill for tags, status, and metadata. Renders a `<span>`.

```tsx
<Badge>Primary</Badge>
<Badge variant="accent"><Star className="size-3" /> Featured</Badge>
```

| `variant` | Look |
| --- | --- |
| `default` | forest `bg-primary` |
| `accent` | sage `bg-accent` |
| `muted` | sand `bg-muted` |
| `outline` | bordered, transparent |

> **Tip:** as a direct flex-column child a badge stretches full-width — add
> `self-start` (or wrap it) to keep it hugging its content.

---

## Card

A composable content surface. Import only the parts you need.

```tsx
<Card>
  <CardMedia><span className="font-serif text-5xl italic">Art</span></CardMedia>
  <CardContent className="pt-6">
    <Badge variant="accent">Featured</Badge>
    <CardTitle>Editorial card</CardTitle>
    <CardDescription>Calm neutral surfaces, one green accent.</CardDescription>
  </CardContent>
</Card>
```

| Part | Element | Purpose |
| --- | --- | --- |
| `Card` | `div` | Rounded, bordered `bg-card` panel (flex column). |
| `CardMedia` | `div` | Fixed `aspect-[4/3]` header; defaults to the sage surface — override with `className` (e.g. `bg-primary`). |
| `CardHeader` | `div` | Padded title/description block. |
| `CardTitle` | `h3` | Serif heading. |
| `CardDescription` | `p` | Muted body copy. |
| `CardContent` | `div` | Flexible body (`flex-1`). |
| `CardFooter` | `div` | Bottom action row. |

---

## Input · Textarea

Text fields tuned to the system focus ring and surface tokens. They forward all
native props. Set `aria-invalid` to show the destructive error ring.

```tsx
<Input id="email" type="email" placeholder="you@studio.com" />
<Textarea id="message" rows={5} aria-invalid={hasError} />
```

---

## Label

Accessible `<label>`. Match its `htmlFor` to the control's `id`.

```tsx
<Label htmlFor="email">Email</Label>
```

---

## Field

Vertical form-row wrapper that composes a `Label`, your control, and an optional
`hint` **or** `error` (error takes precedence and renders in the destructive color).

```tsx
<Field label="Email" htmlFor="email" hint="We never share it." error={errors.email}>
  <Input id="email" type="email" aria-invalid={!!errors.email} />
</Field>
```

| Prop | Type |
| --- | --- |
| `label` | `ReactNode` |
| `htmlFor` | `string` (wire to the control `id`) |
| `hint` | `ReactNode` — shown when there is no error |
| `error` | `ReactNode` — shown instead of hint, in destructive color |

---

## Checkbox

`@base-ui/react/checkbox` styled to the tokens; ticks fill with `bg-primary`.
Controlled or uncontrolled. `'use client'` component.

```tsx
// Uncontrolled
<Checkbox defaultChecked />

// Controlled — note onCheckedChange gives a boolean
<Checkbox checked={updates} onCheckedChange={(v) => setUpdates(v === true)} />
```

Pair with a label by nesting:

```tsx
<Label className="flex items-center gap-2 font-normal">
  <Checkbox /> Send me updates
</Label>
```

---

## Callout

A soft, non-modal notice with a leading icon. Great for tips and form results.

```tsx
<Callout variant="success" title="Message sent">We'll reply within a day.</Callout>
```

| `variant` | Icon | Use |
| --- | --- | --- |
| `accent` *(default)* | info | neutral note on the sage surface |
| `info` | info | informational |
| `success` | check | confirmation |
| `warning` | triangle | caution (sand) |
| `destructive` | alert | error (terracotta) |

Pass a custom `icon` to override, or `title` + children for the body.

---

## Avatar

Round identity chip built on `@base-ui/react/avatar`. Shows `fallback` (usually
initials) while the image loads or if it fails.

```tsx
<Avatar fallback="MC" size="lg" />
<Avatar fallback="MC" size="xl" src="/me.jpg" alt="Matthew Cottrell" />
```

| `size` | Dimensions |
| --- | --- |
| `sm` | 36px |
| `md` *(default)* | 48px |
| `lg` | 64px |
| `xl` | 96px |

---

## Separator

Thin rule using the border token. Built on `@base-ui/react/separator`.

```tsx
<Separator />
<Separator orientation="vertical" className="h-6" />
```

---

## Eyebrow

The small mono, letter-spaced, uppercase kicker that sits above a heading
throughout the system (section labels, card-group labels). Renders a `<span>`;
pass `className` to add layout (e.g. `mb-4 block`).

```tsx
<Eyebrow>What we do</Eyebrow>
<Eyebrow className="mb-4 block">Badges</Eyebrow>
```

---

## FeatureIcon

A lucide icon centered in a soft round chip — used to head feature and value
cards. Pass the icon as a child; it is auto-sized.

```tsx
<FeatureIcon><Compass /></FeatureIcon>
<FeatureIcon tone="primary" size="lg"><Sparkles /></FeatureIcon>
```

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `accent` · `primary` · `muted` | `accent` |
| `size` | `md` (48px) · `lg` (56px) | `md` |

---

## Design-system layout helpers (`components/ds/`)

These are not primitives but are reused by the showcase and are handy for pages:

- **`Section`** — numbered section header (`index`, `title`, `description`) + content.
- **`SiteHeader`** — the sticky top nav used on the home showcase.
- **`ThemeToggle`** — light/dark switch (via `next-themes`).
