import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Sandbox — Cottrell Design System',
  description:
    'Static experiment pages exploring layout and motion treatments outside the component library.',
}

const experiments = [
  {
    href: '/sandbox/showcase.html',
    title: 'Showcase',
    description:
      'A Recharts + React data showcase — live charts and metrics rendered client-side via CDN scripts.',
  },
  {
    href: '/sandbox/index-studio.html',
    title: 'Studio',
    description:
      'A motion-driven landing treatment with a studio-inspired layout and animated hero content.',
  },
  {
    href: '/sandbox/index-drafting.html',
    title: 'Drafting',
    description:
      'A drafting-table visual concept exploring sketch-like motion and layout rhythm.',
  },
  {
    href: '/sandbox/index-casefile.html',
    title: 'Casefile',
    description:
      'A tabbed casefile-style layout with animated transitions between content panels.',
  },
]

export default function SandboxIndex() {
  return (
    <main>
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <Eyebrow>Experiments</Eyebrow>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-balance text-foreground md:text-6xl">
            Static sandbox pages
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Self-contained HTML/CSS/JS experiments, unrelated to the component
            library. Each loads React, Babel, and Recharts from a CDN — no
            build step, no Next routing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {experiments.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl text-card-foreground">
                  {e.title}
                </h2>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </main>
  )
}
