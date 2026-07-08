import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Container — the shared page gutter used across the design system.
 * Centers content and caps it at the system's `max-w-6xl` measure with
 * consistent horizontal padding. Renders a <div> by default.
 */
function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="container"
      className={cn('mx-auto w-full max-w-6xl px-6', className)}
      {...props}
    />
  )
}

export { Container }
