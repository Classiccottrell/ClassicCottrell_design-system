'use client'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { Check } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Checkbox — a base-ui checkbox styled to the system tokens. Ticks fill with
 * `bg-primary`. Forwards form props (name, checked, defaultChecked, onCheckedChange).
 * Pair with a <Label htmlFor> using the same `id`.
 *
 * @example
 * <Checkbox defaultChecked />
 *
 * // Controlled — onCheckedChange gives a boolean
 * <Checkbox checked={updates} onCheckedChange={(v) => setUpdates(v === true)} />
 */
function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-input bg-background text-primary-foreground outline-none transition-colors',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40',
        'data-[checked]:border-primary data-[checked]:bg-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
