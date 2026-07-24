import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Label — an accessible form label. Pair its `htmlFor` with the control's `id`.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 */
function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'text-sm font-medium text-card-foreground select-none',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
