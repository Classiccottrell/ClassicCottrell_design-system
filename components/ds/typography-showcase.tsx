import { Eyebrow } from '@/components/ui/eyebrow'

const typeScale = [
  { label: 'Display', className: 'font-serif text-5xl md:text-7xl', sample: 'Effortless', note: 'Rosarivo · 72px' },
  { label: 'H1', className: 'font-serif text-4xl md:text-5xl', sample: 'Enterprise, simplified', note: 'Rosarivo · 48px' },
  { label: 'H2', className: 'font-serif text-3xl md:text-4xl', sample: 'A quiet, editorial system', note: 'Rosarivo · 36px' },
  { label: 'H3', className: 'font-sans text-2xl font-semibold', sample: 'Section heading', note: 'Red Hat Display · 24px · 600' },
  { label: 'Lead', className: 'font-sans text-xl font-light leading-relaxed', sample: 'A supporting line that introduces the idea.', note: 'Red Hat Display · 20px · 300' },
  { label: 'Body', className: 'font-sans text-base leading-relaxed', sample: 'Currently seven years into designing enterprise software, refining how complex systems feel simple.', note: 'Red Hat Display · 16px · 400' },
  { label: 'Small', className: 'font-sans text-sm text-muted-foreground', sample: 'Secondary and caption text sits comfortably here.', note: 'Red Hat Display · 14px' },
]

export function TypographyShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border bg-card p-8">
          <Eyebrow>Display / Serif</Eyebrow>
          <p className="mt-4 font-serif text-6xl leading-none text-primary italic">
            Aa
          </p>
          <p className="mt-6 font-serif text-2xl text-card-foreground">
            Rosarivo
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A refined old-style serif for headlines and editorial moments.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-8">
          <Eyebrow>Text / Sans</Eyebrow>
          <p className="mt-4 font-sans text-6xl leading-none font-semibold text-card-foreground">
            Aa
          </p>
          <p className="mt-6 font-sans text-2xl font-medium text-card-foreground">
            Red Hat Display
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A clear, geometric sans for interface and body copy.
          </p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
        {typeScale.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 p-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <div className="flex shrink-0 flex-col md:w-28">
              <span className="text-sm font-medium text-card-foreground">
                {row.label}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {row.note}
              </span>
            </div>
            <p
              className={`${row.className} min-w-0 text-card-foreground text-pretty`}
            >
              {row.sample}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
