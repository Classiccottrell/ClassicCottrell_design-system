import { ArrowUpRight } from 'lucide-react'

import { ButtonsShowcase } from '@/components/ds/buttons-showcase'
import { ColorPalette } from '@/components/ds/color-palette'
import { ComponentsShowcase } from '@/components/ds/components-showcase'
import { Section } from '@/components/ds/section'
import { SiteHeader } from '@/components/ds/site-header'
import { TypographyShowcase } from '@/components/ds/typography-showcase'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div id="top" className="min-h-dvh bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="flex flex-col items-start gap-8 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Inspired by ClassicCottrell.ca
          </span>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-balance text-foreground md:text-7xl">
            A design system that feels{' '}
            <span className="text-primary italic">effortless</span> to use.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
            A warm, editorial toolkit built on a cream canvas, a single forest
            accent, and the pairing of a classic serif with a clean geometric
            sans — the same quiet confidence as the site it draws from.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<a href="#color" />}>
              Explore foundations
              <ArrowUpRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="#components" />}
            >
              View components
            </Button>
          </div>

          <dl className="mt-6 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {[
              { k: 'Canvas', v: 'Warm cream' },
              { k: 'Accent', v: 'Forest green' },
              { k: 'Display', v: 'Rosarivo' },
              { k: 'Text', v: 'Red Hat Display' },
            ].map((item) => (
              <div key={item.k} className="bg-card p-5">
                <dt className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                  {item.k}
                </dt>
                <dd className="mt-1 font-serif text-lg text-card-foreground">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Section
          id="color"
          index="01"
          title="Color"
          description="A restrained palette: a warm cream field, deep charcoal ink, and a single forest-green accent, supported by soft sand and sage neutrals."
        >
          <ColorPalette />
        </Section>

        <Section
          id="typography"
          index="02"
          title="Typography"
          description="Rosarivo brings an editorial, literary voice to headlines while Red Hat Display keeps interface text crisp and legible."
        >
          <TypographyShowcase />
        </Section>

        <Section
          id="buttons"
          index="03"
          title="Buttons"
          description="A full set of variants, sizes, and states — all tuned to the system's tokens for consistent focus and hover behavior."
        >
          <ButtonsShowcase />
        </Section>

        <Section
          id="components"
          index="04"
          title="Components"
          description="Cards, forms, badges, callouts, and identity elements composed from the same foundations."
        >
          <ComponentsShowcase />
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-12 text-center">
          <p className="font-serif text-2xl text-foreground">
            Cottrell<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground">
            An editorial design system · Inspired by ClassicCottrell.ca
          </p>
        </div>
      </footer>
    </div>
  )
}
