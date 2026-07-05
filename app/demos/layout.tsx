import Link from 'next/link'

import { ThemeToggle } from '@/components/ds/theme-toggle'
import { Container } from '@/components/ui/container'

const demos = [
  { label: 'Landing', href: '/demos/landing' },
  { label: 'Form', href: '/demos/form' },
  { label: 'About', href: '/demos/about' },
  { label: 'Gallery', href: '/demos/gallery' },
]

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg text-foreground transition-colors hover:text-primary"
          >
            Cottrell<span className="text-primary">.</span>
            <span className="ml-2 hidden font-sans text-xs tracking-[0.2em] text-muted-foreground uppercase sm:inline">
              Demos
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {demos.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </Container>
      </header>

      {children}

      <footer className="border-t border-border">
        <Container className="flex flex-col items-center gap-2 py-12 text-center">
          <Link
            href="/"
            className="font-serif text-2xl text-foreground transition-colors hover:text-primary"
          >
            Cottrell<span className="text-primary">.</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Demo pages · built from the Cottrell design system
          </p>
        </Container>
      </footer>
    </div>
  )
}
