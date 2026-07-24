import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/**
 * Card — the primary content surface. A rounded, bordered `bg-card` panel
 * that composes with CardHeader / CardMedia / CardContent / CardFooter.
 *
 * @remarks
 * Compose only the subcomponents you need — e.g. skip `CardMedia` for a
 * text-only card, skip `CardFooter` when there's no action row.
 *
 * @example
 * <Card>
 *   <CardMedia><span className="font-serif text-5xl italic">Art</span></CardMedia>
 *   <CardContent className="pt-6">
 *     <CardTitle>Editorial card</CardTitle>
 *     <CardDescription>Calm neutral surfaces, one green accent.</CardDescription>
 *   </CardContent>
 * </Card>
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

/** CardHeader — padded title/description block. */
function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

/** CardTitle — serif heading. */
function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('font-serif text-2xl text-card-foreground', className)}
      {...props}
    />
  )
}

/** CardDescription — muted body copy. */
function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  )
}

/** CardContent — flexible body (`flex-1`). */
function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('flex flex-1 flex-col gap-3 p-6 pt-0', className)}
      {...props}
    />
  )
}

/** CardFooter — bottom action row. */
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
