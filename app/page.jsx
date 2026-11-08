import {
  Layers3,
  Code2,
  Rocket,
  Lightbulb,
  PenTool,
  Wrench,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { SonarGrid } from "./components/ui/sonar-grid";
import { Spotlight } from "./components/ui/spotlight";
import { Features } from "./components/ui/features-8";
import { Timeline } from "./components/ui/timeline-01";
import { Button } from "./components/ui/button";
import ProjectShowcase from "./components/ProjectShowcase";
import { Faq3 } from "./components/ui/faq3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "./components/ContactForm";
import {
  BRAND,
  CONTACT,
  FOOTER_LINKS,
  FOUNDER,
  FOUNDER_NODE,
  ORGANIZATION_NODE,
  faqNode,
  FAQ_ITEMS,
  HOME_PAGE_NODE,
  pageMetadata,
  SITE_URL,
  SOCIAL_LINKS,
  WEBSITE_NODE,
  WORK,
  projectNode,
} from "./lib/site.js";
import Link from "next/link";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  ...pageMetadata({
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    path: "/",
  }),
  title: { absolute: `${BRAND.name} | ${BRAND.tagline}` },
};


/*
|--------------------------------------------------------------------------
| COGNIHEIM — COMPANY CONTENT (v2 — sharper copy pass)
|--------------------------------------------------------------------------
|
| Same schema/keys as your original file — icons, hrefs, slugs, stack
| arrays, tone strings, and action objects are untouched. Only copy
| (title/eyebrow/description/body/answer strings) has been rewritten.
|
| Drop-in replacement: keep your existing imports (Layers3, PenTool,
| Code2, Rocket, Lightbulb, Wrench, RefreshCw, faLinkedinIn, faInstagram,
| faGithub) exactly as they are in your current file.
|
|--------------------------------------------------------------------------
*/


/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

export const HERO = {
  subtitle: "World of Thinkers",

  eyebrow: "Software studio · Chennai, India",

  title: "Web products and SaaS, built from first idea to launch.",

  description:
    "Cogniheim is a small studio run by its founder. We decide what is worth building, design it, and ship it, so one person answers for the whole product.",

  primaryAction: {
    label: "See what we've built",
    href: "/products",
  },

  secondaryAction: {
    label: "Start a conversation",
    href: "/contact",
  },
};


/* -------------------------------------------------------------------------- */
/* CAPABILITIES                                                               */
/* -------------------------------------------------------------------------- */

export const SERVICES = [
  {
    number: "01",
    title: "Product strategy",

    body:
      "We test the idea before we build it: who it's for, the smallest version that proves it, and what is most likely to fail.",

    icon: Layers3,
    tone: "products",
  },

  {
    number: "02",
    title: "Product design",

    body:
      "Interfaces that make a complicated product feel obvious. Structure first, decoration second.",

    icon: PenTool,
    tone: "design",
  },

  {
    number: "03",
    title: "Software engineering",

    body:
      "Code that holds up in production: sound architecture, tests where they matter, and notes so another engineer can pick it up in six months.",

    icon: Code2,
    tone: "engineering",
  },

  {
    number: "04",
    title: "SaaS development",

    body:
      "Sign-in, billing and multi-tenancy. The unglamorous parts that decide whether a SaaS product survives real users.",

    icon: Rocket,
    tone: "saas",
  },
];


/* -------------------------------------------------------------------------- */
/* SELECTED WORK                                                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* PHILOSOPHY                                                                */
/* -------------------------------------------------------------------------- */

export const PHILOSOPHY = {
  eyebrow: "How we think",

  title: "We would rather turn down the wrong build than rush it.",

  description:
    "Most technical debt starts as a thinking mistake in week one, not a coding mistake. So we slow down once, at the start, to confirm we're solving the right problem. After that we move quickly, because the direction is right.",
};


/* -------------------------------------------------------------------------- */
/* PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

export const PROCESS = [
  {
    number: "01",
    title: "Think",

    body:
      "We talk to the people who will use it and pin down the real problem, even when that means telling you the thing you asked for isn't the thing you need.",

    icon: Lightbulb,
  },

  {
    number: "02",
    title: "Design",

    body:
      "Wireframes through finished screens, reviewed with you at every stage. No big reveal at the end.",

    icon: PenTool,
  },

  {
    number: "03",
    title: "Build",

    body:
      "Short build cycles you can see and try as they land, instead of a black box until \"done\".",

    icon: Wrench,
  },

  {
    number: "04",
    title: "Evolve",

    body:
      "After launch we watch how people actually use it and keep improving. Launch is where learning starts.",

    icon: RefreshCw,
  },
];


/* -------------------------------------------------------------------------- */
/* LABS                                                                       */
/* -------------------------------------------------------------------------- */

export const LABS = {
  eyebrow: "Cogniheim Labs",

  title: "Our own products and experiments.",

  description:
    "Labs is where we try new tools and ideas before they reach client work. Some end in a weekend. Some become products, like GROS and ClearBiz.",

  action: {
    label: "See what we're building",
    href: "/products",
  },
};


/* -------------------------------------------------------------------------- */
/* ABOUT                                                                      */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  eyebrow: "About",

  title: "The person who understands your problem is the one writing the code.",

  paragraphs: [
    "Cogniheim is an early-stage, bootstrapped software venture in Chennai, India, started by Mohamed Sameer S. He has shipped a client site, CinemaFocus, and a student tool, Record Lab, and is building GROS and ClearBiz.",

    "That is the whole model: fewer layers between the problem and the code.",

    "We cover strategy, design, engineering and SaaS, and we take on only a few projects at a time so each one gets proper attention.",
  ],
};


/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/* HOME PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_NODE,
      FOUNDER_NODE,
      WEBSITE_NODE,
      HOME_PAGE_NODE,
      ...WORK.map(projectNode),
      faqNode(FAQ_ITEMS),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      {/* ------------------------------------------------------------------ */}
      {/* NAVIGATION                                                         */}
      {/* ------------------------------------------------------------------ */}

      <Nav />


      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <main id="top">

        <section
          id="hero"
          className="
            relative
            isolate
            flex
            min-h-svh
            flex-col
            justify-center
            overflow-hidden
            bg-surface-3
            px-5
            pt-32 pb-24
            sm:px-8
          "
        >

          {/* Sonar Grid: dot grid with expanding rings. Tap anywhere to send a
              ping. Decorative; frozen to one still frame under reduced motion. */}
          <SonarGrid className="-z-10" pingArea={[0.04, 0.12, 0.96, 0.88]} />

          {/* Soft wash behind the copy so rings pass underneath without
              hurting legibility. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_42%_50%_at_50%_50%,var(--color-surface-3)_20%,transparent_100%)]"
          />

          {/* Melts the mesh into the next section instead of cutting it off. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-surface-2"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl">

            <div>
              <p className="hero-eyebrow text-sm font-medium text-accent-hover">
                {HERO.eyebrow}
              </p>

              <h1 className="hero-title mt-6 max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl xl:text-[5.5rem]">
                {HERO.title}
              </h1>

              <p className="hero-subtitle mt-6 font-display text-2xl font-medium tracking-tight text-accent-hover sm:text-3xl">
                {HERO.subtitle}
              </p>

              <p className="hero-description mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                {HERO.description}
              </p>

              <div className="hero-actions mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button
                  as={Link}
                  href={HERO.primaryAction.href}
                  size="lg"
                  className="group relative overflow-hidden pr-3 pl-7"
                >
                  <span className="relative z-10">{HERO.primaryAction.label}</span>
                  <span className="relative z-10 ml-3 grid size-8 place-items-center rounded-full bg-white text-accent-hover transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Button>
                <Button as={Link} href={HERO.secondaryAction.href} variant="ghost">
                  {HERO.secondaryAction.label}
                </Button>
              </div>

              <p className="mt-10 text-sm text-muted">
                Founded by{" "}
                <Link href="/about" className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                  {FOUNDER.name}
                </Link>
                {", "}Chennai.{" "}
                <a href={`mailto:${CONTACT.email}`} className="underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                  {CONTACT.email}
                </a>
              </p>
            </div>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* SELECTED WORK                                                    */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="work"
          aria-labelledby="work-heading"
          className="
            overflow-x-clip
            scroll-mt-24
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto max-w-wide">

            <div>

              <p className="section-eyebrow text-sm font-medium text-accent-hover">
                Selected work
              </p>

              <h2
                id="work-heading"
                className="
                  mt-4
                  font-display
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-ink
                  sm:text-6xl
                "
              >
                Products people use.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                One client site and the products we&apos;re building ourselves, each with its real status.
              </p>

            </div>

            <div className="mt-14">

              <ProjectShowcase work={WORK} />

            </div>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* CAPABILITIES                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="capabilities"
          aria-labelledby="capabilities-heading"
          className="
            scroll-mt-24
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto max-w-wide">

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-sm font-medium text-accent-hover">
                  What we do
                </p>

                <h2
                  id="capabilities-heading"
                  className="
                    mt-4
                    text-4xl
                    font-semibold
                    tracking-tight
                    text-ink
                    sm:text-6xl
                  "
                >
                  One team for the whole product.
                </h2>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-muted">
                Strategy, design and engineering stay with one person, so nothing gets lost between steps.
              </p>
            </div>

            <Features items={SERVICES} className="mt-14" />

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* PHILOSOPHY                                                       */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="philosophy"
          aria-labelledby="philosophy-heading"
          className="
            relative
            isolate
            scroll-mt-24
            overflow-hidden
            bg-noir
            px-5
            py-28
            text-white
            sm:px-8
            lg:py-36
          "
        >

          {/* Fine grid fading out toward the top, plus a faint accent glow
              rising from the bottom edge. Decorative, kept very low-contrast. */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              -z-10
              h-2/5
              bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)]
              bg-size-[64px_64px]
              mask-[linear-gradient(to_top,black,transparent)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              -z-10
              h-1/2
              bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent)]
            "
          />

          <div className="mx-auto max-w-5xl text-center">

            <p className="reveal text-sm font-medium text-accent">
              {PHILOSOPHY.eyebrow}
            </p>

            <h2
              id="philosophy-heading"
              className="
                reveal
                mx-auto
                mt-8
                max-w-4xl
                text-balance
                text-4xl
                font-semibold
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              {PHILOSOPHY.title}
            </h2>

            <p
              className="
                reveal
                mx-auto
                mt-8
                max-w-2xl
                text-lg
                leading-relaxed
                text-white/60
                sm:text-xl
              "
            >
              {PHILOSOPHY.description}
            </p>

            <div className="reveal mt-10 flex justify-center">
              <Button as="a" href="#process">
                See how we work
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* PROCESS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="process"
          aria-labelledby="process-heading"
          className="
            scroll-mt-24
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto grid max-w-wide gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-medium text-accent-hover">
                How we work
              </p>

              <h2
                id="process-heading"
                className="
                  mt-4
                  max-w-3xl
                  font-display
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-ink
                  sm:text-6xl
                "
              >
                From first question to working product.
              </h2>
            </div>


            <Timeline
              items={PROCESS.map(({ number, title, body, icon }) => ({
                label: `Step ${number}`,
                title,
                body,
                icon,
              }))}
              className="max-w-2xl lg:pt-4"
            />

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* LABS                                                             */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="labs"
          className="
            scroll-mt-24
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-20">

            <div>
              <p className="text-sm font-medium text-accent-hover">
                {LABS.eyebrow}
              </p>

              <h2
                className="
                  mt-4
                  text-5xl
                  font-semibold
                  tracking-tight
                  text-ink
                  sm:text-7xl
                "
              >
                {LABS.title}
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                {LABS.description}
              </p>

              <Link
                href={LABS.action.href}
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-accent-hover
                  transition-opacity
                  hover:opacity-70
                "
              >
                {LABS.action.label}

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* ABOUT                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-24 px-5 py-28 sm:px-8"
        >
          <div className="mx-auto grid max-w-wide gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">

            <div>
              <p className="text-sm font-medium text-accent-hover">{ABOUT.eyebrow}</p>

              <h2
                id="about-heading"
                className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl"
              >
                {ABOUT.title}
              </h2>

              <div className="mt-8 space-y-5">
                {ABOUT.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-xl text-lg leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Button as={Link} href="/about" variant="secondary" className="mt-9">
                Read the full story
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Founder card (21st.dev profile-card pattern). Everything on it
                is verifiable: the name, place, links, and the project counts
                are read straight from WORK. */}
            <Spotlight className="rounded-3xl">
              <div className="reveal rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-16 shrink-0 place-items-center rounded-full bg-noir font-display text-xl font-semibold text-white ring-4 ring-surface-2"
                  >
                    MS
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-ink">{FOUNDER.name}</p>
                    <p className="text-muted">
                      {FOUNDER.role}, {BRAND.name}
                    </p>
                  </div>
                </div>

                <p className="mt-6 leading-relaxed text-muted">
                  Software developer. Designs, builds and ships each project himself, from the first conversation to launch.
                </p>

                <dl className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface-3">
                  {["Live", "In development", "Planning"].map((status) => (
                    <div key={status} className="px-4 py-4">
                      <dd className="font-display text-3xl font-semibold tabular-nums text-ink">
                        {WORK.filter((w) => w.status === status).length}
                      </dd>
                      <dt className="mt-1 text-sm text-muted">{status}</dt>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                  {[
                    ["Based in", "Chennai, India"],
                    ["Funding", "None, bootstrapped"],
                    ["Email", CONTACT.email],
                  ].map(([term, value]) => (
                    <li key={term} className="flex justify-between gap-6">
                      <span className="text-faint">{term}</span>
                      <span className="text-right text-ink">{value}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-accent-hover">
                  <li>
                    <a
                      href={FOUNDER.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      Personal site
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1 underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                      >
                        {label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>

          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="
            scroll-mt-24
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >
          <div className="mx-auto max-w-wide">
            <Faq3
              eyebrow="Questions"
              heading="Straight answers."
              items={FAQ_ITEMS}
              support={{
                text: "Something we missed?",
                label: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
              }}
            />
          </div>
        </section>


        {/* ---------------------------------------------------------------- */}
        {/* CONTACT                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="
            relative
            scroll-mt-24
            overflow-hidden
            bg-noir
            px-5
            py-28
            text-white
            sm:px-8
          "
        >

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
          />

          <div className="relative mx-auto w-full max-w-wide">
            <ContactForm
              email={CONTACT.email}
              intro={
                <>
                  <p className="reveal text-sm font-medium text-accent">
                    {CONTACT.eyebrow}
                  </p>
                  <h2
                    id="contact-heading"
                    className="reveal mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
                  >
                    {CONTACT.title}
                  </h2>
                  <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                    {CONTACT.description}
                  </p>
                </>
              }
              aside={
                <div className="reveal flex flex-col gap-3">
                  <p className="text-sm text-white/50">Prefer email? Write to us directly.</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="w-fit text-lg font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {CONTACT.email}
                  </a>

                  <ul className="mt-3 flex flex-wrap items-center gap-3">
                    {SOCIAL_LINKS.map(({ label, href, icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${label} (opens in a new tab)`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 hover:text-accent"
                        >
                          <FontAwesomeIcon icon={icon} className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </div>

        </section>

      </main>


      <SiteFooter />
    </>
  );
}