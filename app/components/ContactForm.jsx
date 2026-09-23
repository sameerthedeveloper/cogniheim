'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Input, Textarea } from './ui/input.jsx';
import { Button } from './ui/button.jsx';

// No backend on this static site — build a mailto: link from the filled-in
// fields and hand off to the visitor's own mail client rather than faking a
// server round-trip. The button briefly confirms what's happening instead
// of silently redirecting.
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status !== 'idle') return;

    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = `New inquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    const mailto = `mailto:info@cogniheim.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus('sending');
    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus('sent');
      window.setTimeout(() => setStatus('idle'), 2400);
    }, 450);
  };

  return (
    <form className="flex w-full max-w-md flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-white/70">
          Name
        </label>
        <Input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required
          className="border-white/20 bg-white/6 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/10" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-white/70">
          Email
        </label>
        <Input id="contact-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required
          className="border-white/20 bg-white/6 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/10" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-white/70">
          Message
        </label>
        <Textarea id="contact-message" name="message" rows={4} placeholder="What are you building?" required
          className="border-white/20 bg-white/6 text-white placeholder:text-white/40 focus-visible:border-white/50 focus-visible:ring-white/10" />
      </div>

      <Button type="submit" variant="invert" className="mt-1 w-52 self-start disabled:opacity-70" disabled={status !== 'idle'}>
        {status === 'idle' && (
          <>
            Send message
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
        {status === 'sending' && 'Opening mail app…'}
        {status === 'sent' && (
          <>
            Sent
            <Check className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="sr-only" role="status" aria-live="polite">
        {status === 'sending' && 'Opening your mail app'}
        {status === 'sent' && 'Message ready in your mail app'}
      </p>
    </form>
  );
}
