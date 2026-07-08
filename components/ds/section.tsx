import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/eyebrow'

interface SectionProps {
  id: string
  index: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  index,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border py-16 md:py-24"
    >
      <div className="mb-10 flex flex-col gap-3 md:mb-12">
        <Eyebrow>
          {index} / {id}
        </Eyebrow>
        <h2 className="font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className={cn(className)}>{children}</div>
    </section>
  )
}
