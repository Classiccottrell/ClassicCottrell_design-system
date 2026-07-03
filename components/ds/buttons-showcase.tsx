import { ArrowUpRight, Check, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

const variants = ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'] as const

function Panel({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <span className="mb-5 block font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function ButtonsShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel label="Variants">
        {variants.map((v) => (
          <Button key={v} variant={v} size="lg">
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </Panel>

      <Panel label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon-lg" aria-label="Add">
          <Plus />
        </Button>
      </Panel>

      <Panel label="With icons">
        <Button size="lg">
          View work
          <ArrowUpRight />
        </Button>
        <Button variant="secondary" size="lg">
          <Check />
          Saved
        </Button>
        <Button variant="outline" size="lg">
          <Plus />
          New note
        </Button>
      </Panel>

      <Panel label="States">
        <Button size="lg">Enabled</Button>
        <Button size="lg" disabled>
          Disabled
        </Button>
        <Button variant="outline" size="lg" disabled>
          Disabled
        </Button>
      </Panel>
    </div>
  )
}
