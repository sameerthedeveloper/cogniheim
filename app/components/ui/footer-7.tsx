import type { ReactNode } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ArrowUpRight, Mail } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export type FooterLink = { label: string; href: string };
export type FooterSocial = { label: string; href: string; icon: IconDefinition };

const linkClass =
  'group inline-flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-[15px] text-white/60 transition-colors hover:text-white';
const iconClass = 'h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-accent';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm text-white/55">{title}</p>
      <ul className="mt-4 flex flex-col gap-1">{children}</ul>
    </nav>
  );
}

// Footer 7's structure — brand block on the left, link columns on the right,
// a hairline-divided bottom bar — on the contact section's own noir so the
// page runs straight from the form into it with no seam.
export function Footer({
  description,
  founder,
  location,
  email,
  nav,
  legal,
  socials,
  className,
}: {
  description: string;
  founder: FooterLink;
  location: string;
  email: string;
  nav: readonly FooterLink[];
  legal: readonly FooterLink[];
  socials: readonly FooterSocial[];
  className?: string;
}) {
  return (
    <footer className={cn('bg-noir px-5 pb-10 sm:px-8', className)}>
      <div className="mx-auto max-w-wide border-t border-white/10 pt-16 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="Cogniheim" width={136} height={40} className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/60">{description}</p>
            <p className="mt-4 text-sm text-white/50">
              Founder:{' '}
              <Link
                href={founder.href}
                className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
              >
                {founder.label}
              </Link>
            </p>
            <p className="mt-1 text-sm text-white/50">{location}</p>
          </div>

          <Column title="Navigate">
            {nav.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Get in touch">
            <li>
              <a href={`mailto:${email}`} className={linkClass}>
                <Mail className={iconClass} aria-hidden="true" />
                {email}
              </a>
            </li>
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className={linkClass}>
                  <FontAwesomeIcon icon={icon} className={iconClass} aria-hidden="true" />
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </Column>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} Cogniheim · Founder-led venture · Chennai, India · cogniheim.in
          </p>
          <nav aria-label="Legal" className="flex gap-5 text-[13px]">
            {legal.map(({ label, href }) => (
              <Link key={href} href={href} className="text-white/60 transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <a
            href="#top"
            className="group inline-flex items-center gap-1 text-[13px] text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUpRight
              className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
