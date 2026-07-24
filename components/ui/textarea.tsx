import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Textarea — a multi-line text field matching the Input's tokens and focus ring.
 *
 * @remarks
 * Like Input, compose it inside Field rather than hand-rolling label/error
 * markup, so error styling stays consistent.
 *
 * @example
 * <Textarea id="message" rows={5} aria-invalid={hasError} />
 */
function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
