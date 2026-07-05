import { ArrowUpRight, Compass, Layers, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/ui/callout'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Studio — Landing (Demo)',
  description: 'A marketing landing page built from the Cottrell design system.',
}

const features = [
  {
    icon: Compass,
    title: 'Strategy first',
    body: 'We map the terrain before drawing a single screen — research, positioning, and a plan you can act on.',
  },
  {
    icon: Layers,
    title: 'Systems, not pages',
    body: 'Every deliverable is a reusable system: tokens, components, and patterns that scale with your product.',
  },
  {
    icon: Sparkles,
    title: 'Editorial craft',
    body: 'A calm, considered aesthetic — the kind of quiet confidence that makes complex software feel simple.',
  },
]

const stats = [
  { k: 'Years designing', v: '7+' },
  { k: 'Products shipped', v: '40' },
  { k: 'Avg. NPS lift', v: '+22' },
  { k: 'Time to first draft', v: '5 days' },
]

export default function LandingDemo() {
  return (
    <main>
      {/* Hero */}
      <Container className="flex flex-col items-start gap-8 py-20 md:py-28">
        <Badge variant="accent">
          <Sparkles className="size-3" />
          Design studio
        </Badge>
        <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-balance text-foreground md:text-7xl">
          Software that feels{' '}
          <span className="text-primary italic">effortless</span> to use.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
          We help enterprise teams turn dense, complicated workflows into
          products people actually enjoy — grounded in a design system, not a
          pile of one-off screens.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" nativeButton={false} render={<a href="#contact" />}>
            Start a project
            <ArrowUpRight />
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/demos/gallery" />}
          >
            See our work
          </Button>
        </div>

        <dl className="mt-6 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.k} className="bg-card p-5">
              <dt className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                {item.k}
              </dt>
              <dd className="mt-1 font-serif text-2xl text-card-foreground">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Features */}
      <Container className="py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            What we do
          </span>
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
            A studio built around systems
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-8">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <f.icon className="size-5" />
              </span>
              <CardContent className="p-0 pt-6">
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA band */}
      <Container className="py-16 md:py-24">
        <div
          id="contact"
          className="flex flex-col items-start gap-6 rounded-3xl border border-primary/25 bg-accent p-10 text-accent-foreground md:p-16"
        >
          <h2 className="max-w-2xl font-serif text-3xl leading-tight text-balance md:text-5xl">
            Have a product that deserves better?
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-pretty">
            Tell us what you&apos;re building. We reply to every enquiry within a
            business day.
          </p>
          <Button size="lg" nativeButton={false} render={<Link href="/demos/form" />}>
            Get in touch
            <ArrowUpRight />
          </Button>
        </div>

        <Callout variant="info" title="Design note" className="mt-6">
          This entire page — hero, feature grid, stats, and CTA band — is
          composed from <code className="font-mono text-xs">Container</code>,{' '}
          <code className="font-mono text-xs">Button</code>,{' '}
          <code className="font-mono text-xs">Card</code>,{' '}
          <code className="font-mono text-xs">Badge</code>, and{' '}
          <code className="font-mono text-xs">Callout</code>.
        </Callout>
      </Container>
    </main>
  )
}
