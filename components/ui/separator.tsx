import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Separator — a thin rule using the border token. Set `orientation="vertical"`
 * for inline dividers (give it a height via className).
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 */
function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
