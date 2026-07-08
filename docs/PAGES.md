# Building Pages — Step by Step

This guide reconstructs each of the four demo pages from scratch using only the
primitives in [`COMPONENTS.md`](./COMPONENTS.md). The finished versions live in
`app/demos/*` — read this alongside them.

## Ground rules (true for every page)

1. **Wrap content in `Container`.** It centers and caps width; add vertical
   padding with `className="py-16 md:py-24"`.
2. **Compose, don't restyle.** Reach for `Card`, `Badge`, `Field`, etc. before
   writing raw markup. When you do need bespoke layout, still use tokens
   (`text-muted-foreground`, `bg-accent`, `border-border`) so themes keep working.
3. **The shared chrome (header + footer) lives in `app/demos/layout.tsx`.** Every
   page under `app/demos/` gets it automatically — a page only renders its `<main>`.
4. **Serif for display, sans for UI.** Headings use `font-serif`; body/labels use
   the default sans.

Section-eyebrow + heading pattern used throughout (the kicker is the `Eyebrow`
primitive):

```tsx
<Eyebrow>Section label</Eyebrow>
<h2 className="font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
  Heading
</h2>
```

---

## 1 · Landing page (`app/demos/landing/page.tsx`)

A marketing page: hero → feature grid → CTA band. Server component.

**Step 1 — Hero.** Inside a `Container` (`flex flex-col items-start gap-8`):
a `Badge`, a large serif `<h1>` (`text-5xl md:text-7xl`) with one italic accent
word, a muted lead `<p>`, then two `Button`s (a `default` and an `outline`, both
`size="lg"`). Use `render={<Link href="…" />}` to make a button navigate.

**Step 2 — Stats strip.** A `<dl>` grid. The 1px-gap-over-border trick draws
hairlines between cells:

```tsx
<dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
  {stats.map((s) => (
    <div key={s.k} className="bg-card p-5">
      <dt className="font-mono text-[11px] uppercase text-muted-foreground">{s.k}</dt>
      <dd className="mt-1 font-serif text-2xl text-card-foreground">{s.v}</dd>
    </div>
  ))}
</dl>
```

**Step 3 — Feature grid.** A new `Container`, the eyebrow+heading pattern, then a
`grid gap-6 md:grid-cols-3` of `Card`s. Each card: a `<FeatureIcon>` chip holding
a lucide icon, then `CardContent` with `CardTitle` + `CardDescription`.

**Step 4 — CTA band.** A full-width rounded panel:
`rounded-3xl border border-primary/25 bg-accent p-10 md:p-16` holding a serif
heading, a line of copy, and a `Button` linking to the form.

**Step 5 — Design note.** A `Callout variant="info"` closing the page.

Components used: `Container`, `Eyebrow`, `Badge`, `Button`, `FeatureIcon`,
`Card`, `Callout`.

---

## 2 · Contact form (`app/demos/form/page.tsx`)

An interactive form with validation and a success state. **Client component** —
start the file with `'use client'` because it uses `useState`.

**Step 1 — State.** Track `values` (name/email/message), the checkbox, an
`errors` object, and a `sent` boolean.

**Step 2 — Validation.** A `validate()` that returns an `errors` map (required
name, regex email, min-length message). On submit: `preventDefault`, validate,
and if clean set `sent = true` and reset the fields.

**Step 3 — Header.** `Container` capped narrower — `className="max-w-2xl"` — with
the eyebrow + serif `<h1>` + lead.

**Step 4 — Fields.** One `Field` per input, wiring `label`, `htmlFor`, and
`error`; put the matching `id`/`aria-invalid` on the control:

```tsx
<Field label="Email" htmlFor="email" error={errors.email}>
  <Input id="email" type="email" value={values.email}
         onChange={(e) => set('email', e.target.value)}
         aria-invalid={!!errors.email} />
</Field>
```

Use `Textarea` for the message. For the checkbox, nest it in a `Label`:

```tsx
<Label className="flex items-center gap-2 font-normal text-muted-foreground">
  <Checkbox checked={updates} onCheckedChange={(v) => setUpdates(v === true)} />
  Send me occasional studio updates
</Label>
```

**Step 5 — Submit & success.** A `Button type="submit" size="lg"`. When `sent`,
render a `Callout variant="success"` instead of the form (include a “Send another”
button that flips `sent` back).

Components used: `Container`, `Field`, `Input`, `Textarea`, `Label`, `Checkbox`,
`Button`, `Callout`.

---

## 3 · About me (`app/demos/about/page.tsx`)

A personal page: intro → values → timeline. Server component.

**Step 1 — Intro.** A `Container` with a responsive row
(`flex flex-col md:flex-row md:items-center gap-12`): an `Avatar fallback="MC"
size="xl"` beside a column (`flex flex-col items-start gap-4` — `items-start`
keeps the `Badge` from stretching) holding a `Badge`, serif `<h1>`, lead, and two
`Button`s.

**Step 2 — Values grid.** Eyebrow + heading, then `grid gap-6 md:grid-cols-3` of
`Card`s — same `FeatureIcon` + `CardContent` recipe as the landing features.

**Step 3 — Timeline.** Map rows; each row is a
`flex flex-col md:flex-row md:gap-10` with a mono year on the left and
role/org/summary on the right. Put a `<Separator />` between rows (skip it after
the last):

```tsx
{timeline.map((t, i) => (
  <div key={t.year}>
    <div className="flex flex-col gap-2 py-6 md:flex-row md:gap-10">
      <span className="font-mono text-sm text-muted-foreground md:w-20">{t.year}</span>
      <div>…role · org…</div>
    </div>
    {i < timeline.length - 1 ? <Separator /> : null}
  </div>
))}
```

Components used: `Container`, `Eyebrow`, `Avatar`, `Badge`, `Button`,
`FeatureIcon`, `Card`, `Separator`.

---

## 4 · Gallery (`app/demos/gallery/page.tsx`)

A responsive portfolio grid. Server component.

**Step 1 — Header.** `Container`, eyebrow + serif `<h1>` + lead.

**Step 2 — Grid.** `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`, one `Card` per item.

**Step 3 — Each tile.** A `CardMedia` (override its surface per item with a
`className` like `bg-primary text-primary-foreground`) holding a big italic serif
word, then `CardContent` with a row of `Badge`s (tag + year), a `CardTitle`, and a
`CardDescription`. Add `hover:border-primary/40` on the `Card` for a subtle
interaction.

```tsx
<Card className="transition-colors hover:border-primary/40">
  <CardMedia className={item.media}>
    <span className="font-serif text-5xl italic">{item.word}</span>
  </CardMedia>
  <CardContent className="pt-6">
    <div className="flex items-center gap-2">
      <Badge variant="accent">{item.tag}</Badge>
      <Badge variant="muted">{item.year}</Badge>
    </div>
    <CardTitle className="text-xl">{item.title}</CardTitle>
    <CardDescription>{item.description}</CardDescription>
  </CardContent>
</Card>
```

Components used: `Container`, `Card` (+ `CardMedia`, `CardContent`, `CardTitle`,
`CardDescription`), `Badge`.

---

## Adding a new page of your own

1. Create `app/<route>/page.tsx` (add it under `app/demos/` to inherit the demo
   chrome, or elsewhere to bring your own).
2. Export `metadata` for the tab title.
3. Open with `<main><Container className="py-16 md:py-24"> … </Container></main>`.
4. Build sections from the primitives; use the eyebrow + serif-heading pattern.
5. Verify: `pnpm build` (must pass) and `pnpm dev` to eyeball light **and** dark.
