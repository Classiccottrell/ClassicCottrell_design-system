import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-serif text-primary-foreground select-none',
  {
    variants: {
      size: {
        sm: 'size-9 text-sm',
        md: 'size-12 text-lg',
        lg: 'size-16 text-2xl',
        xl: 'size-24 text-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

/**
 * Avatar — a round identity chip. Provide `src`/`alt` for an image; the
 * `fallback` (usually initials) shows while loading or if the image fails.
 *
 * @example
 * <Avatar fallback="MC" size="lg" src="/me.jpg" alt="Matthew Cottrell" />
 */
function Avatar({
  className,
  size,
  src,
  alt,
  fallback,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    src?: string
    alt?: string
    fallback?: React.ReactNode
  }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar, avatarVariants }
