import { ExternalLink, LayoutTemplate, WifiOff, Activity, Accessibility, ArrowUpRight, Mail, Code2, Zap, Braces } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Nav from './components/Nav.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import ContactForm from './components/ContactForm.jsx';
import ServiceArt from './components/ServiceArt.jsx';
import SplitHeading from './components/SplitHeading.jsx';
import { Button } from './components/ui/button.jsx';

const HERO_DOODLES = [
  { icon: Code2, className: 'top-[20%] left-[6%] lg:left-[11%]', rotate: -12, size: 32 },
  { icon: WifiOff, className: 'top-[28%] right-[7%] lg:right-[12%]', rotate: 8, size: 30 },
  { icon: Zap, className: 'bottom-[24%] left-[9%] lg:left-[14%]', rotate: 6, size: 26 },
  { icon: Accessibility, className: 'bottom-[18%] right-[9%] lg:right-[15%]', rotate: -8, size: 34 },
  { icon: Braces, className: 'top-[52%] left-[2%] lg:left-[5%]', rotate: 10, size: 24 },
];

const WORK = [
  {
    name: 'cinemafocus.in',
    href: 'https://cinemafocus.in',
    meta: 'Next.js · Supabase · Tailwind CSS',
    image: '/projects/cinemafocus.webp',
  },
  {
    name: 'SalahSync',
    meta: 'Next.js · Capacitor · OCR — 100 users on offline storage',
    image: '/projects/salahsync.webp',
  },
  {
    name: 'RetailFlow',
    meta: 'Next.js · React · Supabase — 30% increase in engagement',
    image: '/projects/retailflow.webp',
  },
  {
    name: 'IslamicTamilPod',
    meta: 'Service Workers · IndexedDB — 85 Lighthouse, 50% faster loads',
    image: '/projects/islamictamilpod.svg',
    href:"https://islamic-tamil-pod-pwa.vercel.app"
  },
  {
    name: 'OpenNotes',
    meta: 'React · Vite · Shadcn/ui · Firebase · TipTap',
    image: '/projects/opennotes.png',
    href:"https://open-notes-web.vercel.app"
  },
  {
    name: 'FoodGuard 2.0',
    meta: 'React 19 · Vite · Firebase · Leaflet · Framer Motion',
    image: '/projects/foodguard.webp',
  },
  {
    name: 'Record Lab',
    href: 'https://record-lab.vercel.app/',
    meta: 'Next.js — true A4 pagination, print-ready export with custom watermarking',
    image: '/projects/recordlab.webp',
  },
];

const SERVICES = [
  {
    title: 'Frontend Development',
    body: 'Component-driven UIs in React and Next.js, built to a real design system rather than one-off pages.',
    icon: LayoutTemplate,
    tone: 'frontend',
  },
  {
    title: 'PWA & offline-first engineering',
    body: 'Apps that keep working without a connection — service workers, IndexedDB, and sync queues done properly.',
    icon: WifiOff,
    tone: 'offline',
  },
  {
    title: 'Real-time & sync systems',
    body: 'Live device sync and real-time tracking, built to stay consistent under flaky networks.',
    icon: Activity,
    tone: 'realtime',
  },
  {
    title: 'Accessibility-first UI',
    body: 'Keyboard navigation, visible focus, and screen-reader support treated as requirements, not polish.',
    icon: Accessibility,
    tone: 'accessibility',
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mdsameers/', icon: faLinkedin, brand: true },
  { label: 'GitHub', href: 'https://github.com/sameerthedeveloper', icon: faGithub, brand: true },
  { label: 'mohamedsameer.s.2007@gmail.com', href: 'mailto:mohamedsameer.s.2007@gmail.com', icon: Mail, brand: false },
];

const TIMELINE = [
  {
    date: '2025 — Present',
    role: 'Web Developer',
    place: 'Freelancer',
  },
  {
    date: '2026',
    role: 'Full Stack Intern',
    place: 'Global Tech Computer Education, Chennai',
  },
  {
    date: '2024 — 2028',
    role: 'BTech, Computer Science Engineering',
    place: 'BSA Crescent Institute of Science and Technology',
  },
  {
    date: '2025',
    role: 'MERN Stack Certification',
    place: 'Global Tech Computer Education',
  },
  {
    date: '2024',
    role: 'Front End Development Certification',
    place: 'Global Tech Computer Education',
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollProgress />

      <main id="top">
        {/* HERO */}
        <section className="hero-surface hero-gradient-bg relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-8">
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            {HERO_DOODLES.map(({ icon: Icon, className, rotate, size }, i) => (
              <span
                key={i}
                className={`hero-doodle hero-doodle-${i} absolute text-accent/40 opacity-0 ${className}`}
                style={{ '--doodle-rot': `${rotate}deg` }}
              >
                <Icon width={size} height={size} strokeWidth={1.5} />
              </span>
            ))}
          </div>

          <div className="relative mx-auto max-w-content text-center">
            <h1 className="text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl">
              {"Built to work when the network doesn't.".split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block">
                  {word}&nbsp;
                </span>
              ))}
            </h1>
            <p className="hero-typed mt-5 flex min-h-7 items-center justify-center px-4 text-lg font-medium text-accent sm:min-h-8 sm:text-2xl">
              <span className="hero-typed-text whitespace-nowrap" aria-hidden="true"></span>
              <span className="hero-typed-cursor" aria-hidden="true"></span>
              <span className="sr-only">
                Frontend developer. I build with React and Next.js. I ship offline-first PWAs. I care about accessibility.
              </span>
            </p>
            <p className="hero-subhead mx-auto mt-6 max-w-xl text-lg text-muted sm:text-xl">
              I&apos;m Mohamed Sameer S, a frontend developer in Chennai. I ship React and
              Next.js apps that keep working offline — for real clients and real
              communities.
            </p>
            <div className="hero-actions mt-9 flex items-center justify-center gap-4">
              <Button as="a" href="/resume.pdf" target="_blank">
                View resume
              </Button>
              <Button as="a" href="#work" variant="ghost">
                See the work
              </Button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SplitHeading
                text="Where I focus."
                className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              />
              <p className="reveal mt-4 max-w-xs text-muted">
                Four things I actually specialize in, not a list of every technology I&apos;ve touched.
              </p>
            </div>

            <ol className="border-t border-line">
              {SERVICES.map(({ title, body, icon: Icon, tone }, i) => (
                <li key={title} className="reveal service-row group relative border-b border-line py-6">
                  <span className="service-row-bar pointer-events-none absolute -left-5 top-0 bottom-0 w-0.75 origin-center scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100 sm:-left-6" />
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="pt-1 font-mono text-sm text-faint transition-colors duration-300 group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-center gap-2.5 text-xl font-medium text-ink transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                        <Icon className="h-4.5 w-4.5 shrink-0 text-accent" aria-hidden="true" />
                        {title}
                      </h3>
                      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{body}</p>
                    </div>
                    <span className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 sm:block">
                      <ServiceArt tone={tone} />
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="flex min-h-svh scroll-mt-24 flex-col justify-center bg-surface-2 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-lg">
                <SplitHeading
                  text="Selected work."
                  className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                />
                <p className="reveal mt-4 text-lg text-muted">Seven projects, shipped and in use.</p>
              </div>
              <a
                href="https://linkedin.com/in/mdsameers/"
                target="_blank"
                rel="noopener"
                className="reveal inline-flex items-center gap-1.5 text-[15px] text-accent transition-opacity hover:opacity-70"
              >
                More on LinkedIn <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-14 space-y-5">
              {/* Spotlight: the one live, public project gets the lead slot */}
              <a
                href={WORK[0].href}
                target="_blank"
                rel="noopener"
                className="work-spotlight reveal group relative block overflow-hidden rounded-3xl bg-white"
              >
                <div className="relative aspect-16/7 overflow-hidden sm:aspect-21/7">
                  <div className="work-thumb-wrap absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={WORK[0].image}
                      alt={`${WORK[0].name} preview`}
                      className="work-thumb-img h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-md bg-white/90 px-2 py-1 font-mono text-xs text-ink sm:left-6 sm:top-6">
                    01
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {WORK[0].name}
                      <ExternalLink className="h-5 w-5 text-white/70" aria-hidden="true" />
                    </h3>
                    <p className="mt-1.5 text-sm text-white/70">{WORK[0].meta}</p>
                  </div>
                  <span className="cursor-label pointer-events-none absolute left-0 top-0 z-10 flex h-22 w-22 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-accent text-sm font-medium text-white opacity-0">
                    View site
                  </span>
                </div>
              </a>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {WORK.slice(1).map((project, i) => {
                  const Wrapper = project.href ? 'a' : 'div';
                  return (
                    <Wrapper
                      key={project.name}
                      {...(project.href ? { href: project.href, target: '_blank', rel: 'noopener' } : {})}
                      className="reveal lift-card group overflow-hidden rounded-3xl bg-white shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(61,57,41,0.35)]"
                    >
                      <div className="relative overflow-hidden">
                        <div className="work-thumb-wrap">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={`${project.name} preview`}
                            loading="lazy"
                            className="work-thumb-img aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2 py-1 font-mono text-xs text-ink">
                          {String(i + 2).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-ink">
                          {project.name}
                          {project.href && <ExternalLink className="h-4 w-4 text-muted" aria-hidden="true" />}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted">{project.meta}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="flex min-h-svh scroll-mt-24 flex-col justify-center px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SplitHeading
                text="How I got here."
                className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              />
              <p className="reveal mt-4 max-w-xs text-muted">
                Five stops so far — freelance work, an internship, and the degree connecting them.
              </p>
            </div>

            <ol className="border-t border-line">
              {TIMELINE.map((item, i) => (
                <li key={item.role} className="reveal journey-row group relative border-b border-line py-6">
                  <span className="journey-row-bar pointer-events-none absolute -left-5 top-0 bottom-0 w-0.75 origin-center scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100 sm:-left-6" />
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-sm text-faint transition-colors duration-300 group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-medium text-ink transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-[15px] text-muted">{item.place}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted">{item.date}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="relative flex min-h-svh scroll-mt-24 flex-col justify-center overflow-hidden bg-noir px-5 py-24 sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-144 w-xl -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/20 blur-[120px]"
          />
          <div className="relative mx-auto max-w-wide">
            <div className="text-center">
              <p className="reveal text-sm text-white/50">Open to internships and freelance work</p>
              <SplitHeading
                text="Let's build something that works."
                className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              />
            </div>

            <div className="mt-16 flex flex-col items-center justify-center gap-14 lg:flex-row lg:items-start lg:gap-20">
              <div className="reveal">
                <ContactForm />
              </div>

              <div className="reveal flex flex-col gap-3">
                <p className="text-sm text-white/50">Find me elsewhere</p>
                <ul className="flex flex-col gap-1">
                  {SOCIALS.map(({ label, href, icon, brand }) => {
                    const iconClass = 'h-[18px] w-[18px] text-white/40 transition-colors group-hover:text-accent';
                    const Icon = icon;
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={href.startsWith('mailto:') ? undefined : 'noopener'}
                          className="group flex items-center gap-3 py-2 text-[15px] text-white/70 transition-colors hover:text-white"
                        >
                          {brand ? (
                            <FontAwesomeIcon icon={Icon} className={iconClass} aria-hidden="true" />
                          ) : (
                            <Icon className={iconClass} aria-hidden="true" />
                          )}
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-noir px-5 pb-10 pt-8 sm:px-8">
        <div className="reveal mx-auto flex max-w-wide flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[13px] text-white/40">© Mohamed Sameer S — 2026</p>
          <a
            href="#top"
            className="magnetic group inline-flex items-center gap-1 text-[13px] text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </footer>
    </>
  );
}
