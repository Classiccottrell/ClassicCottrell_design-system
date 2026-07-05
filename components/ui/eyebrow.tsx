import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const eyebrowVariants = cva(
  'inline-block font-mono uppercase text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-[11px] tracking-[0.15em]',
        default: 'text-xs tracking-[0.2em]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

function Eyebrow({
  className,
  size,
  render = <span />,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof eyebrowVariants>) {
  return useRender({
    render,
    props: {
      'data-slot': 'eyebrow',
      className: cn(eyebrowVariants({ size, className })),
      ...props,
    },
  })
}

export { Eyebrow, eyebrowVariants }
