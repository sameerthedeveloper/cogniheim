'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Input, Textarea } from './ui/input.jsx';
import { Button } from './ui/button.jsx';
import { cn } from '../lib/utils.js';

const FIELD =
  'border-white/15 bg-white/[0.06] text-white placeholder:text-white/40 focus-visible:border-accent focus-visible:ring-accent/25';
const LABEL = 'text-sm font-medium text-white/70';

export const TOPICS = ['A new project', 'Product discussion', 'Collaboration or partnership', 'General enquiry'] as const;

function Required() {
  return (
    <>
      <span aria-hidden="true" className="text-accent">
        {' '}
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

// Contact 01's layout: intro, submit and links on the left, fields on the
// right. The button lives outside the <form> and is tied to it with
// form="contact-form", so it still submits natively; DOM order (intro →
// fields → button → links) keeps the mobile stack in reading order.
//
// No backend on this static site — the form builds a mailto: link from the
// fields and hands off to the visitor's own mail client rather than faking
// a server round-trip.
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, from: string, message: string): Errors {
  const errors: Errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!from) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(from)) errors.email = 'That doesn’t look like an email address — check for typos, e.g. you@company.com.';
  if (!message) errors.message = 'Please write a short message.';
  else if (message.length < 10) errors.message = 'Please add a little more detail (at least 10 characters).';
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-[#f2a58a]">
      {message}
    </p>
  );
}

export default function ContactForm({ email, intro, aside }: { email: string; intro: ReactNode; aside: ReactNode }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'idle') return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const topic = String(data.get('topic') ?? TOPICS[0]);
    const message = String(data.get('message') ?? '').trim();

    const found = validate(name, from, message);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (['name', 'email', 'message'] as const).find((key) => found[key]);
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const subject = `${topic} — ${name}`;
    const body = `${message}\n\n— ${name} (${from})`;
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus('sending');
    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus('sent');
      window.setTimeout(() => setStatus('idle'), 2400);
    }, 450);
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-20 lg:gap-y-8">
      <div className="lg:col-start-1 lg:row-start-1">{intro}</div>

      <form
        id="contact-form"
        aria-label="Contact Cogniheim"
        noValidate
        className="reveal flex w-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-stretch"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className={LABEL}>
              Name
              <Required />
            </label>
            <Input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} className={FIELD} />
            <FieldError id="contact-name-error" message={errors.name} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className={LABEL}>
              Email
              <Required />
            </label>
            <Input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={FIELD} />
            <FieldError id="contact-email-error" message={errors.email} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-topic" className={LABEL}>
            What&apos;s it about?
          </label>
          <select
            id="contact-topic"
            name="topic"
            defaultValue={TOPICS[0]}
            className={cn(
              'h-12 w-full rounded-xl border px-4 text-[15px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 [&>option]:text-ink',
              FIELD,
            )}
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="contact-message" className={LABEL}>
            Message
            <Required />
          </label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="The problem, the constraint, or the idea you're weighing."
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={`${FIELD} min-h-36 flex-1`}
          />
          <FieldError id="contact-message-error" message={errors.message} />
        </div>
      </form>

      <div className="lg:col-start-1 lg:row-start-2">
        <Button type="submit" form="contact-form" variant="invert" className="w-full disabled:opacity-70 sm:w-auto sm:min-w-52" disabled={status !== 'idle'}>
          {status === 'idle' && (
            <>
              Send message
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
          {status === 'sending' && 'Opening mail app…'}
          {status === 'sent' && (
            <>
              Ready in your mail app
              <Check className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-white/50">Opens your email app with the message filled in.</p>
        <p className="sr-only" role="status" aria-live="polite">
          {status === 'sending' && 'Opening your mail app'}
          {status === 'sent' && 'Message ready in your mail app'}
        </p>
      </div>

      <div className="lg:col-start-1 lg:row-start-3">{aside}</div>
    </div>
  );
}
