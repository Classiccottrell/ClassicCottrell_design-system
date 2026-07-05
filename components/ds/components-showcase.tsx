import { ArrowUpRight, Star } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/ui/callout'
import {
  Card,
  CardContent,
  CardDescription,
  CardMedia,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ComponentsShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Feature card */}
      <Card>
        <CardMedia>
          <span className="font-serif text-6xl italic">Art</span>
        </CardMedia>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Featured</Badge>
            <Badge variant="muted">2024</Badge>
          </div>
          <CardTitle>Editorial card</CardTitle>
          <CardDescription>
            Content cards pair the serif display face with calm neutral surfaces
            and a single green accent.
          </CardDescription>
          <Button variant="link" className="mt-auto self-start px-0">
            Read more
            <ArrowUpRight />
          </Button>
        </CardContent>
      </Card>

      {/* Form card */}
      <Card className="gap-5 p-6">
        <div>
          <CardTitle>Subscribe</CardTitle>
          <CardDescription className="mt-1">
            Form controls, inputs, and focus rings.
          </CardDescription>
        </div>
        <Field label="Name" htmlFor="ds-name">
          <Input id="ds-name" placeholder="Matthew Cottrell" />
        </Field>
        <Field label="Email" htmlFor="ds-email">
          <Input id="ds-email" type="email" placeholder="you@studio.com" />
        </Field>
        <Label className="flex items-center gap-2 font-normal text-muted-foreground">
          <Checkbox defaultChecked />
          Send me occasional updates
        </Label>
        <Button size="lg" className="w-full">
          Join the list
        </Button>
      </Card>

      {/* Utility stack */}
      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <span className="mb-4 block font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Badges
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge>Primary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="accent">
              <Star className="size-3" />
              Rated
            </Badge>
          </div>
        </Card>

        <Callout variant="accent" title="Callout">
          Notices reuse the sage accent surface for a soft, non-alarming tone.
        </Callout>

        <Card className="flex-row items-center gap-4 border-border bg-secondary p-6">
          <Avatar fallback="MC" size="md" />
          <div>
            <p className="font-medium text-secondary-foreground">
              Matthew A. Cottrell
            </p>
            <p className="text-sm text-muted-foreground">
              Product design &amp; strategy
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
