'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Callout } from '@/components/ui/callout'
import { Checkbox } from '@/components/ui/checkbox'
import { Container } from '@/components/ui/container'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Errors = { name?: string; email?: string; message?: string }

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FormDemo() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [updates, setUpdates] = useState(true)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!emailRe.test(values.email))
      next.email = 'Enter a valid email address.'
    if (values.message.trim().length < 10)
      next.message = 'A little more detail helps — at least 10 characters.'
    return next
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setValues({ name: '', email: '', message: '' })
    }
  }

  return (
    <main>
      <Container className="max-w-2xl py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Get in touch
          </span>
          <h1 className="font-serif text-4xl leading-tight text-balance text-foreground md:text-5xl">
            Start a conversation
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Tell us about your project. Fields marked with validation must be
            filled before the form will submit.
          </p>
        </div>

        {sent ? (
          <Callout variant="success" title="Message sent" className="mt-10">
            Thanks — we&apos;ve got your message and will reply within a business
            day.{' '}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-medium underline underline-offset-4"
            >
              Send another
            </button>
          </Callout>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-10 flex flex-col gap-6">
            <Field label="Name" htmlFor="name" error={errors.name}>
              <Input
                id="name"
                name="name"
                placeholder="Matthew Cottrell"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                aria-invalid={!!errors.name}
              />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@studio.com"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
            </Field>

            <Field
              label="Project details"
              htmlFor="message"
              error={errors.message}
              hint="What are you building, and what does success look like?"
            >
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="We're rethinking our analytics dashboard…"
                value={values.message}
                onChange={(e) => set('message', e.target.value)}
                aria-invalid={!!errors.message}
              />
            </Field>

            <Label className="flex items-center gap-2 font-normal text-muted-foreground">
              <Checkbox
                name="updates"
                checked={updates}
                onCheckedChange={(v) => setUpdates(v === true)}
              />
              Send me occasional studio updates
            </Label>

            <Button type="submit" size="lg">
              <Send />
              Send message
            </Button>
          </form>
        )}
      </Container>
    </main>
  )
}
