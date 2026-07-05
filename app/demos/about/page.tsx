import { ArrowUpRight, Compass, Feather, HeartHandshake } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'About — Matthew Cottrell (Demo)',
  description: 'An about-me page built from the Cottrell design system.',
}

const values = [
  {
    icon: Compass,
    title: 'Clarity',
    body: 'The best interface is the one you barely notice. I chase the simplest thing that could possibly work.',
  },
  {
    icon: Feather,
    title: 'Craft',
    body: 'Type, spacing, and colour are not decoration — they are how trust is built, one detail at a time.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership',
    body: 'I work with teams, not for them: shared language, shared systems, shared ownership of the outcome.',
  },
]

const timeline = [
  {
    year: '2024',
    role: 'Principal Product Designer',
    org: 'Independent',
    body: 'Design systems and product strategy for enterprise software teams.',
  },
  {
    year: '2021',
    role: 'Design Lead',
    org: 'Enterprise SaaS',
    body: 'Led the redesign of a complex analytics suite used by thousands of operators.',
  },
  {
    year: '2018',
    role: 'Product Designer',
    org: 'Startup',
    body: 'Shipped the first design system and grew the practice from one designer to a team.',
  },
]

export default function AboutDemo() {
  return (
    <main>
      {/* Intro */}
      <Container className="py-16 md:py-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          <Avatar fallback="MC" size="xl" />
          <div className="flex flex-col items-start gap-4">
            <Badge variant="accent">Product designer</Badge>
            <h1 className="max-w-2xl font-serif text-4xl leading-tight text-balance text-foreground md:text-6xl">
              Hi, I&apos;m Matthew Cottrell.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
              Seven years into designing enterprise software, I spend my days
              making complex systems feel simple — through design systems, clear
              typography, and a lot of careful editing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/demos/form" />}>
                Work with me
                <ArrowUpRight />
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/demos/gallery" />}
              >
                See selected work
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Values */}
      <Container className="py-8 md:py-12">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            What I care about
          </span>
          <h2 className="font-serif text-3xl leading-tight text-balance text-foreground md:text-4xl">
            Three things guide the work
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-8">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <v.icon className="size-5" />
              </span>
              <CardContent className="p-0 pt-6">
                <CardTitle className="text-xl">{v.title}</CardTitle>
                <CardDescription>{v.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* Timeline */}
      <Container className="py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Experience
          </span>
          <h2 className="font-serif text-3xl leading-tight text-balance text-foreground md:text-4xl">
            A short history
          </h2>
        </div>
        <div className="flex flex-col">
          {timeline.map((t, i) => (
            <div key={t.year}>
              <div className="flex flex-col gap-2 py-6 md:flex-row md:gap-10">
                <span className="shrink-0 font-mono text-sm text-muted-foreground md:w-20">
                  {t.year}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xl text-foreground">
                    {t.role}{' '}
                    <span className="text-muted-foreground">· {t.org}</span>
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </div>
              </div>
              {i < timeline.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}
