import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardMedia,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Gallery — Selected Work (Demo)',
  description: 'A gallery grid built from the Cottrell design system.',
}

type Item = {
  title: string
  word: string
  year: string
  tag: string
  description: string
  media: string
}

const items: Item[] = [
  {
    title: 'Meridian Analytics',
    word: 'Data',
    year: '2024',
    tag: 'Product',
    description: 'A calmer home for a dense, real-time analytics suite.',
    media: 'bg-accent text-accent-foreground',
  },
  {
    title: 'Harbor Banking',
    word: 'Trust',
    year: '2023',
    tag: 'Fintech',
    description: 'Rebuilding a banking flow around clarity and confidence.',
    media: 'bg-secondary text-secondary-foreground',
  },
  {
    title: 'Field Guide',
    word: 'Craft',
    year: '2023',
    tag: 'Editorial',
    description: 'An editorial reading experience with a literary voice.',
    media: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Atlas Logistics',
    word: 'Flow',
    year: '2022',
    tag: 'Enterprise',
    description: 'Untangling a warehouse operations console.',
    media: 'bg-muted text-foreground',
  },
  {
    title: 'Sage Health',
    word: 'Care',
    year: '2022',
    tag: 'Product',
    description: 'A gentle, reassuring patient portal.',
    media: 'bg-chart-3/25 text-foreground',
  },
  {
    title: 'North Studio',
    word: 'Brand',
    year: '2021',
    tag: 'Identity',
    description: 'A quiet, editorial identity for a design practice.',
    media: 'bg-foreground text-background',
  },
]

export default function GalleryDemo() {
  return (
    <main>
      <Container className="py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-balance text-foreground md:text-6xl">
            Selected work
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            A grid of recent projects. Each tile is a{' '}
            <code className="font-mono text-sm">Card</code> with a{' '}
            <code className="font-mono text-sm">CardMedia</code> header and{' '}
            <code className="font-mono text-sm">Badge</code> tags.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              className="group transition-colors hover:border-primary/40"
            >
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
          ))}
        </div>
      </Container>
    </main>
  )
}
