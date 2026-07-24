import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
        outline: 'border border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * Badge — a small pill for status, tags, and metadata.
 * Variants mirror the surface tokens: `default` (forest), `accent` (sage),
 * `muted` (sand), and `outline`.
 *
 * @remarks
 * Use Badge for a short label inline with other content (a card, a list row,
 * a nav item) — not for reporting the result of an action, which is
 * Callout's job. Use `default` to highlight a status that should draw the
 * eye (e.g. "New"); `muted` for a low-emphasis tag (e.g. a category label);
 * `outline` when the badge sits on a colored surface and needs to stay quiet.
 *
 * @example
 * <Badge>New</Badge>
 * <Badge variant="muted">Draft</Badge>
 */
function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
