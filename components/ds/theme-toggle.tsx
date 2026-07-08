'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Icon is swapped via the `.dark` class (set before paint by next-themes),
          so it stays hydration-safe without a mounted-state guard. */}
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
    </button>
  )
}
