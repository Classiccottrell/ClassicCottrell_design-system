import { cva, type VariantProps } from 'class-variance-authority'
import { Info, CircleAlert, TriangleAlert, CircleCheck } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const calloutVariants = cva(
  'flex items-start gap-3 rounded-2xl border p-5',
  {
    variants: {
      variant: {
        accent: 'border-primary/25 bg-accent text-accent-foreground',
        info: 'border-chart-2/40 bg-accent text-accent-foreground',
        success: 'border-primary/30 bg-accent text-accent-foreground',
        warning: 'border-chart-3/50 bg-chart-3/15 text-foreground',
        destructive: 'border-destructive/30 bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  },
)

const iconFor = {
  accent: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleAlert,
} as const

/**
 * Callout — a soft, non-modal notice. The `accent` variant reuses the sage
 * surface for a calm tone; `success`/`warning`/`destructive` shift color for
 * emphasis. Pass a `title` and children as the body.
 *
 * @remarks
 * Use `success`/`warning`/`destructive` only to reflect the outcome of a
 * user-initiated action (form submit, save, delete) — use `accent`/`info`
 * for ambient tips or context that isn't reporting a result. Prefer Callout
 * over Badge when the message needs a full sentence and an icon; prefer
 * Badge for a single-word status inline with other content.
 *
 * @example
 * <Callout variant="success" title="Message sent">We'll reply within a day.</Callout>
 */
function Callout({
  className,
  variant = 'accent',
  title,
  icon,
  children,
  ...props
}: ComponentProps<'div'> &
  VariantProps<typeof calloutVariants> & {
    title?: ReactNode
    icon?: ReactNode
  }) {
  const Icon = iconFor[variant ?? 'accent']
  return (
    <div
      data-slot="callout"
      role="status"
      className={cn(calloutVariants({ variant, className }))}
      {...props}
    >
      <span className="mt-0.5 shrink-0">
        {icon ?? <Icon className="size-5" />}
      </span>
      <div className="min-w-0">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        {children ? (
          <div className="mt-1 text-sm leading-relaxed [&:first-child]:mt-0">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { Callout, calloutVariants }
