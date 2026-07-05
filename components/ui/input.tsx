import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Input — a single-line text field tuned to the system's focus ring and
 * surface tokens. Forwards all native input props (type, placeholder, etc.).
 */
function Input({ className, type = 'text', ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground outline-none transition-colors',
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

export { Input }
