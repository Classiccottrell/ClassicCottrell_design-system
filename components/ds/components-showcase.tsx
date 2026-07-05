import { ArrowUpRight, Info, Star } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export function ComponentsShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Feature card */}
      <Card className="gap-0 overflow-hidden py-0">
        <div className="flex aspect-[4/3] items-center justify-center bg-accent">
          <span className="font-serif text-6xl text-accent-foreground italic">
            Art
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Featured</Badge>
            <Badge variant="muted">2024</Badge>
          </div>
          <CardTitle>Editorial card</CardTitle>
          <CardDescription>
            Content cards pair the serif display face with calm neutral
            surfaces and a single green accent.
          </CardDescription>
          <Button variant="link" className="mt-auto self-start px-0">
            Read more
            <ArrowUpRight />
          </Button>
        </div>
      </Card>

      {/* Form card */}
      <Card>
        <CardHeader>
          <CardTitle>Get in touch</CardTitle>
          <CardDescription>
            Inputs, textareas, checkboxes, and switches.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-name">Name</Label>
            <Input id="ds-name" placeholder="Matthew Cottrell" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-message">Message</Label>
            <Textarea
              id="ds-message"
              rows={3}
              placeholder="Tell us about your project…"
            />
          </div>
          <Label className="text-muted-foreground font-normal">
            <Checkbox defaultChecked id="ds-updates" />
            Send me occasional updates
          </Label>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="ds-newsletter" className="font-normal">
              Weekly newsletter
            </Label>
            <Switch id="ds-newsletter" defaultChecked />
          </div>
          <Button size="lg" className="w-full">
            Send message
          </Button>
        </CardContent>
      </Card>

      {/* Utility stack */}
      <div className="flex flex-col gap-6">
        <Card className="gap-4 py-6">
          <CardContent>
            <Eyebrow className="mb-4 block">Badges</Eyebrow>
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
          </CardContent>
        </Card>

        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent p-5 text-accent-foreground">
          <Info className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Callout</p>
            <p className="mt-1 text-sm leading-relaxed">
              Notices reuse the sage accent surface for a soft, non-alarming
              tone.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-secondary p-6">
          <Eyebrow className="mb-4 block">Identity</Eyebrow>
          <div className="flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarFallback className="text-lg">MC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-secondary-foreground">
                Matthew A. Cottrell
              </p>
              <p className="text-sm text-muted-foreground">
                Product design &amp; strategy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
