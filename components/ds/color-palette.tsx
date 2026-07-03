interface Swatch {
  name: string
  token: string
  hex: string
  className: string
  border?: boolean
}

const brand: Swatch[] = [
  {
    name: 'Cream',
    token: '--background',
    hex: '#F9F5F1',
    className: 'bg-background',
    border: true,
  },
  {
    name: 'Charcoal',
    token: '--foreground',
    hex: '#2C2C2C',
    className: 'bg-foreground',
  },
  {
    name: 'Forest',
    token: '--primary',
    hex: '#437057',
    className: 'bg-primary',
  },
  {
    name: 'Sage',
    token: '--accent',
    hex: '#E2EBE4',
    className: 'bg-accent',
    border: true,
  },
]

const support: Swatch[] = [
  {
    name: 'Card',
    token: '--card',
    hex: '#FFFDFB',
    className: 'bg-card',
    border: true,
  },
  {
    name: 'Secondary',
    token: '--secondary',
    hex: '#ECE5DB',
    className: 'bg-secondary',
    border: true,
  },
  {
    name: 'Muted',
    token: '--muted',
    hex: '#EFE9E1',
    className: 'bg-muted',
    border: true,
  },
  {
    name: 'Border',
    token: '--border',
    hex: '#E4DDD2',
    className: 'bg-border',
  },
  {
    name: 'Terracotta',
    token: '--destructive',
    hex: '#B4462F',
    className: 'bg-destructive',
  },
  {
    name: 'Sand',
    token: '--chart-3',
    hex: '#C2A878',
    className: 'bg-chart-3',
  },
]

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card">
      <div
        className={`h-24 w-full ${swatch.className} ${
          swatch.border ? 'border-b border-border' : ''
        }`}
      />
      <div className="flex flex-col gap-0.5 p-4">
        <span className="text-sm font-medium text-card-foreground">
          {swatch.name}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {swatch.hex}
        </span>
        <span className="mt-1 font-mono text-[11px] tracking-tight text-muted-foreground/80">
          {swatch.token}
        </span>
      </div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Brand
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {brand.map((s) => (
            <SwatchCard key={s.token} swatch={s} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Neutrals &amp; Support
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {support.map((s) => (
            <SwatchCard key={s.token} swatch={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
