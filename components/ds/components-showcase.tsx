import { ArrowUpRight, Info, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'

function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'accent' | 'muted'
}) {
  const styles = {
    default: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
    outline: 'border border-border text-foreground',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  )
}

export function ComponentsShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Feature card */}
      <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex aspect-[4/3] items-center justify-center bg-accent">
          <span className="font-serif text-6xl text-accent-foreground italic">
            Art
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Featured</Badge>
            <Badge variant="muted">2024</Badge>
          </div>
          <h3 className="font-serif text-2xl text-card-foreground">
            Editorial card
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Content cards pair the serif display face with calm neutral
            surfaces and a single green accent.
          </p>
          <Button variant="link" className="mt-auto self-start px-0">
            Read more
            <ArrowUpRight />
          </Button>
        </div>
      </article>

      {/* Form card */}
      <article className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
        <div>
          <h3 className="font-serif text-2xl text-card-foreground">Subscribe</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Form controls, inputs, and focus rings.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="ds-name"
            className="text-sm font-medium text-card-foreground"
          >
            Name
          </label>
          <input
            id="ds-name"
            placeholder="Matthew Cottrell"
            className="h-11 rounded-lg border border-input bg-background px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="ds-email"
            className="text-sm font-medium text-card-foreground"
          >
            Email
          </label>
          <input
            id="ds-email"
            type="email"
            placeholder="you@studio.com"
            className="h-11 rounded-lg border border-input bg-background px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            defaultChecked
            className="size-4 accent-primary"
          />
          Send me occasional updates
        </label>
        <Button size="lg" className="w-full">
          Join the list
        </Button>
      </article>

      {/* Utility stack */}
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <span className="mb-4 block font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Badges
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge>Primary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="accent">
              <Star className="size-3" />
              Rated
            </Badge>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent p-5 text-accent-foreground">
          <Info className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Callout</p>
            <p className="mt-1 text-sm leading-relaxed">
              Notices reuse the sage accent surface for a soft, non-alarming
              tone.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-secondary p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
              MC
            </div>
            <div>
              <p className="font-medium text-secondary-foreground">
                Matthew A. Cottrell
              </p>
              <p className="text-sm text-muted-foreground">
                Product design &amp; strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
