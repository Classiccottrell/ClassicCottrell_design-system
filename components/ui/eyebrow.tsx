import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Eyebrow — the small mono, letter-spaced, uppercase label that sits above a
 * heading throughout the system (section kickers, card group labels).
 *
 * @example
 * <Eyebrow>What we do</Eyebrow>
 * <Eyebrow className="mb-4 block">Badges</Eyebrow>
 */
function Eyebrow({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="eyebrow"
      className={cn(
        'font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

export { Eyebrow }
