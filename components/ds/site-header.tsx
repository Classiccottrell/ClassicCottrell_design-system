import { ThemeToggle } from '@/components/ds/theme-toggle'

const nav = [
  { label: 'Foundations', href: '#color' },
  { label: 'Type', href: '#typography' },
  { label: 'Buttons', href: '#buttons' },
  { label: 'Components', href: '#components' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-serif text-lg text-foreground transition-colors hover:text-primary"
        >
          Cottrell<span className="text-primary">.</span>
          <span className="ml-2 hidden font-sans text-xs tracking-[0.2em] text-muted-foreground uppercase sm:inline">
            Design System
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
