import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const featureIconVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full [&_svg]:size-5',
  {
    variants: {
      tone: {
        accent: 'bg-accent text-accent-foreground',
        primary: 'bg-primary text-primary-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
      size: {
        md: 'size-12',
        lg: 'size-14',
      },
    },
    defaultVariants: {
      tone: 'accent',
      size: 'md',
    },
  },
)

/**
 * FeatureIcon — a lucide icon centered in a soft round chip, used to head
 * feature and value cards. Pass the icon as a child; it is auto-sized.
 *
 * @example
 * <FeatureIcon><Compass /></FeatureIcon>
 * <FeatureIcon tone="primary" size="lg"><Sparkles /></FeatureIcon>
 */
function FeatureIcon({
  className,
  tone,
  size,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof featureIconVariants>) {
  return (
    <span
      data-slot="feature-icon"
      className={cn(featureIconVariants({ tone, size, className }))}
      {...props}
    />
  )
}

export { FeatureIcon, featureIconVariants }
