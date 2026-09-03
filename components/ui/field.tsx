import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/**
 * Field — a vertical form-row wrapper: it stacks a label, a control, and an
 * optional hint or error with consistent spacing. Compose it with Input,
 * Textarea, Checkbox, etc.
 *
 * @remarks
 * Use Field whenever a control needs a visible label and/or error state;
 * skip it for a bare search box or an inline filter where a label would be
 * redundant.
 *
 * @example
 * <Field label="Email" htmlFor="email" hint="We never share it.">
 *   <Input id="email" type="email" />
 * </Field>
 */
function Field({
  className,
  label,
  htmlFor,
  hint,
  error,
  children,
  ...props
}: ComponentProps<'div'> & {
  label?: ReactNode
  htmlFor?: string
  hint?: ReactNode
  error?: ReactNode
}) {
  return (
    <div
      data-slot="field"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export { Field }
