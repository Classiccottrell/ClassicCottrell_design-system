import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Card — the primary content surface. A rounded, bordered `bg-card` panel
 * that composes with CardHeader / CardMedia / CardContent / CardFooter.
 */
function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground',
        className,
      )}
      {...props}
    />
  )
}

/**
 * CardMedia — a fixed-aspect media area for the top of a card. Defaults to
 * the sage `bg-accent` surface used by the editorial feature cards.
 */
function CardMedia({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        'flex aspect-[4/3] items-center justify-center bg-accent text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('font-serif text-2xl text-card-foreground', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-1 flex-col gap-3 p-6 pt-0', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-3 p-6 pt-0', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
