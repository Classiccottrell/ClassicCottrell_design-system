import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Demos — Cottrell Design System',
  description:
    'Reference pages assembled from the Cottrell design system primitives.',
}

const demos = [
  {
    href: '/demos/landing',
    title: 'Landing',
    description:
      'A marketing page — hero, feature cards, stats, and a closing call-to-action band.',
    uses: ['Container', 'Button', 'Card', 'Badge', 'Callout'],
  },
  {
    href: '/demos/form',
    title: 'Contact form',
    description:
      'A working form with labelled fields, a checkbox, client-side validation, and a success callout.',
    uses: ['Field', 'Input', 'Textarea', 'Checkbox', 'Button', 'Callout'],
  },
  {
    href: '/demos/about',
    title: 'About me',
    description:
      'A personal page — avatar, intro, a values grid, and a simple career timeline.',
    uses: ['Avatar', 'Card', 'Separator', 'Badge'],
  },
  {
    href: '/demos/gallery',
    title: 'Gallery',
    description:
      'A responsive grid of media cards with tag badges and hover treatment.',
    uses: ['Card', 'CardMedia', 'Badge', 'Container'],
  },
]

export default function DemosIndex() {
  return (
    <main>
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Reference
          </span>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-balance text-foreground md:text-6xl">
            Pages built from the system
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Each page below is assembled entirely from the reusable primitives
            in <code className="font-mono text-sm">components/ui</code>. Open one,
            then read <code className="font-mono text-sm">docs/PAGES.md</code> to
            see how it is reconstructed step by step.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl text-card-foreground">
                  {d.title}
                </h2>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {d.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {d.uses.map((u) => (
                  <Badge key={u} variant="muted">
                    {u}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
