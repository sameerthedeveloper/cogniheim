import {
  Layers3,
  Code2,
  Rocket,
  Lightbulb,
  PenTool,
  Wrench,
  RefreshCw,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Nav from "./components/Nav";
import Velaris from "./components/ui/velaris";
import { Button } from "./components/ui/button";
import ProjectShowcase from "./components/ProjectShowcase";
import { Faq3 } from "./components/ui/faq3";
import ContactForm from "./components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

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
  eyebrow: "TECHNOLOGY & PRODUCT STUDIO",

  title: "Your idea, engineered like it matters.",

  description:
    "Cogniheim turns ambitious ideas into web products, software, and SaaS that actually ship — designed with care, built to last, grounded in real product thinking, not templates.",

  primaryAction: {
    label: "Start a project",
    href: "#contact",
  },

  secondaryAction: {
    label: "See the work",
    href: "#work",
  },
};


/* -------------------------------------------------------------------------- */
/* CAPABILITIES                                                               */
/* -------------------------------------------------------------------------- */

export const SERVICES = [
  {
    number: "01",
    title: "Product Strategy",

    body:
      "Before anything gets designed or built, we pressure-test the idea — who it's for, the smallest version that proves it, and what will actually break.",

    icon: Layers3,
    tone: "products",
  },

  {
    number: "02",
    title: "Product Design",

    body:
      "Interfaces and systems designed to make complex products feel obvious to use — structure first, decoration second.",

    icon: PenTool,
    tone: "design",
  },

  {
    number: "03",
    title: "Software Engineering",

    body:
      "Production-grade code: solid architecture, tested where it matters, documented enough that another engineer isn't lost in six months.",

    icon: Code2,
    tone: "engineering",
  },

  {
    number: "04",
    title: "SaaS Development",

    body:
      "End-to-end builds — auth, billing, multi-tenancy — the unglamorous infrastructure that decides whether a SaaS product survives real users.",

    icon: Rocket,
    tone: "saas",
  },
];


/* -------------------------------------------------------------------------- */
/* SELECTED WORK                                                              */
/* -------------------------------------------------------------------------- */

export const WORK = [
  {
    name: "CinemaFocus",

    slug: "cinemafocus",

    href: "https://cinemafocus.in",

    image: "/projects/cinemafocus.webp",

    category: "Digital Product",

    stack: [
      "Next.js",
      "Tailwind CSS",
      "AWS",
    ],

    description:
      "A premium home-cinema and hi-fi audio brand needed a web experience that matched the craftsmanship of the hardware it sells — most competitors in this space look like generic e-commerce templates. We built a clean, image-forward, editorial-feeling site on Next.js designed to hold up next to premium physical showrooms, not just look good in a browser.",

    highlight:
      "Built to match a premium, craftsmanship-led brand",

    featured: true,
  },

  /*
   * Add future Cogniheim client/product projects here.
   *
   * These should eventually come from Firebase instead of
   * being hard-coded.
   *
   * PRIORITY: when you add the next case study, include one
   * concrete outcome if you have it — a real number (load time,
   * lead volume, timeline) or a specific constraint you solved.
   * A studio page with zero quantified results reads as a
   * portfolio; one with even one hard detail reads as a business.
   */

  // {
  //   name: "Project Name",
  //   slug: "project-name",
  //   image: "/projects/project-name.webp",
  //   category: "SaaS",
  //   stack: ["Next.js", "Firebase"],
  //   description: "...",
  //   featured: false,
  // },
];


/* -------------------------------------------------------------------------- */
/* PHILOSOPHY                                                                */
/* -------------------------------------------------------------------------- */

export const PHILOSOPHY = {
  eyebrow: "OUR PHILOSOPHY",

  title: "We'd rather say no to the wrong build than yes to a fast one.",

  description:
    "Most technical debt isn't a coding mistake — it's a thinking mistake made in week one. We slow down exactly once, at the start, to make sure we're solving the right problem. After that, we move fast, because the direction is actually correct.",
};


/* -------------------------------------------------------------------------- */
/* PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

export const PROCESS = [
  {
    number: "01",
    title: "Think",

    body:
      "We interview, question, and define the real problem — including telling you if the thing you asked for isn't the thing you need.",

    icon: Lightbulb,
  },

  {
    number: "02",
    title: "Design",

    body:
      "Wireframes to high-fidelity interfaces, reviewed with you at each stage — no surprise reveals at the end.",

    icon: PenTool,
  },

  {
    number: "03",
    title: "Build",

    body:
      "Engineering in short, visible cycles — you see progress as it happens, not a black box until 'done.'",

    icon: Wrench,
  },

  {
    number: "04",
    title: "Evolve",

    body:
      "We watch real usage data and iterate after launch — a launch is a starting line, not a finish line.",

    icon: RefreshCw,
  },
];


/* -------------------------------------------------------------------------- */
/* LABS                                                                       */
/* -------------------------------------------------------------------------- */

export const LABS = {
  eyebrow: "COGNIHEIM LABS",

  title: "Where we build things nobody asked for yet.",

  description:
    "Labs is our R&D arm — internal products and experiments we build to stay sharp and stress-test new tools before bringing them to client work. Some die in a weekend. Some become products. All of it means client work benefits from lessons we already learned on our own time.",

  action: {
    label: "See what we're building",
    href: "#contact",
  },
};


/* -------------------------------------------------------------------------- */
/* ABOUT                                                                      */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  eyebrow: "ABOUT COGNIHEIM",

  title:
    "Built by an engineer who got tired of studios that talk more than they ship.",

  paragraphs: [
    "Cogniheim was founded by S. Mohamed Sameer, a full-stack developer who's shipped production client work (CinemaFocus) and built internal tools end-to-end — not a strategist who outsources the build.",

    "That's the whole model: fewer layers between the person who understands your problem and the person writing the code.",

    "We work across product strategy, design, engineering, and SaaS — and we're selective about what we take on, because craft doesn't scale past a certain number of projects at once.",
  ],
};


/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  eyebrow: "START A CONVERSATION",

  title: "Got an idea? Let's find out if it's worth building.",

  description:
    "No pitch decks required. Tell us the problem, the constraint, or the mess you're trying to untangle — we'll tell you honestly whether it's a good fit.",

  email: "info@cogniheim.in",

  action: {
    label: "Get in touch",
    href: "mailto:info@cogniheim.in",
  },
};

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cogniheim',
    icon: faLinkedinIn,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cogniheim',
    icon: faInstagram,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sameerthedeveloper',
    icon: faGithub,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Cogniheim?",
    answer:
      "A technology and product studio that designs and builds web products, software, and SaaS — end to end, from strategy to shipped code.",
  },
  {
    question: "What makes Cogniheim different from a typical dev agency?",
    answer:
      "No handoffs between 'the strategist,' 'the designer,' and 'the developer' — the person shaping your product is the person building it.",
  },
  {
    question: "Does Cogniheim only build websites, or full products?",
    answer:
      "Full products — web apps, SaaS platforms, and the infrastructure behind them (auth, databases, hosting, billing), not just front-end.",
  },
  {
    question: "What's the typical project timeline?",
    answer:
      "Depends on scope — a focused MVP is usually weeks, not months. We'll give you a real timeline after the first conversation, not a generic range.",
  },
  {
    question: "Do you work with early-stage founders, or only established companies?",
    answer:
      "Both — but especially early-stage, because that's where getting the thinking right before the build matters most.",
  },
  {
    question: "Who founded Cogniheim?",
    answer:
      "Cogniheim was founded by S. Mohamed Sameer.",
  },
  {
    question: "How do we start?",
    answer:
      "Email or the contact form below. The first step is a conversation, not a contract.",
  },
];


/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                 */
/* -------------------------------------------------------------------------- */

export const NAVIGATION = [
  {
    label: "Work",
    href: "#work",
  },

  {
    label: "Capabilities",
    href: "#capabilities",
  },

  {
    label: "Process",
    href: "#process",
  },

  {
    label: "About",
    href: "#about",
  },

  {
    label: "Contact",
    href: "#contact",
  },
];


/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  brand: "COGNIHEIM",

  tagline: "Technology & Product Studio",

  description:
    "We think, design, and build digital products that solve real problems.",

  email: "hello@cogniheim.in",

  copyright: "© Cogniheim",

  links: [
    {
      label: "Work",
      href: "#work",
    },

    {
      label: "Capabilities",
      href: "#capabilities",
    },

    {
      label: "About",
      href: "#about",
    },

    {
      label: "Contact",
      href: "#contact",
    },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cogniheim',
  url: 'https://cogniheim.in',
  logo: 'https://cogniheim.in/logo.png',
  description:
    'Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.',
  founder: {
    '@type': 'Person',
    name: 'S. Mohamed Sameer',
    url: 'https://mohamedsameer.tech',
  },
  knowsAbout: [
    'Technology and product studio',
    'Product design',
    'Software engineering',
    'SaaS development',
    'Web applications',
    'Digital products',
    'Product strategy',
  ],
};


/* -------------------------------------------------------------------------- */
/* HOME PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
            px-5
            py-24
            sm:px-8
          "
        >

          {/* Warm cream → peach → terracotta drift, from the site tokens
              (surface-3 / accent / amber). Decorative only. */}
          <Velaris
            bg="#f4f1ea"
            colors={["#f6dcc4", "#eab08f", "#e6bd85", "#f4f1ea"]}
            speed={0.6}
            grain={0.15}
            height="100%"
            className="absolute inset-0 -z-10 w-full"
          />

          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-3/30 via-transparent to-surface-3/60"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-wide text-center">

            <p className="hero-eyebrow text-sm tracking-[0.2em] text-accent">
              {HERO.eyebrow}
            </p>

            <h1
              className="
                hero-title
                mx-auto
                mt-6
                max-w-6xl
                text-5xl
                font-semibold
                tracking-[-0.04em]
                text-ink
                sm:text-7xl
                lg:text-8xl
              "
            >
              {HERO.title}
            </h1>

            <p
              className="
                hero-description
                mx-auto
                mt-8
                max-w-2xl
                text-lg
                leading-relaxed
                text-muted
                sm:text-xl
              "
            >
              {HERO.description}
            </p>

            <div className="hero-actions mt-10 flex flex-wrap justify-center gap-4">

              <Button
                as="a"
                href={HERO.primaryAction.href}
              >
                {HERO.primaryAction.label}

                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                as="a"
                href={HERO.secondaryAction.href}
                variant="ghost"
              >
                {HERO.secondaryAction.label}
              </Button>

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
            scroll-mt-24
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto max-w-wide">

            <div>

              <p className="section-eyebrow text-sm tracking-[0.2em] text-accent">
                01 — SELECTED WORK
              </p>

              <h2
                id="work-heading"
                className="
                  mt-4
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-ink
                  sm:text-6xl
                "
              >
                Work built with purpose.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                A selection of digital products and experiences we&apos;ve
                designed and engineered.
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
          className="
            scroll-mt-24
            px-5
            py-28
            sm:px-8
          "
        >

          <div
            className="
              mx-auto
              grid
              max-w-wide
              gap-12
              lg:grid-cols-[0.8fr_1.7fr]
              lg:gap-20
              lg:items-start
            "
          >

            <div className="lg:sticky lg:top-28 lg:self-start">

              <p className="text-sm tracking-[0.2em] text-accent">
                02 — CAPABILITIES
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-ink
                  sm:text-6xl
                "
              >
                We build the whole product.
              </h2>

            </div>


            <div>
              <p className="mb-8 max-w-xl leading-relaxed text-muted">
                From product thinking and interface design to software
                engineering and SaaS development.
              </p>

              <ol className="border-t border-line">

              {SERVICES.map(
                ({ number, title, body, icon: Icon }) => (

                  <li
                    key={title}
                    className="
                      group
                      border-b
                      border-line/40
                      py-8
                      transition-colors
                      hover:bg-white/2
                      px-4
                      -mx-4
                    "
                  >

                    <div className="flex gap-5">

                      <span
                        className="
                          pt-1
                          font-mono
                          text-sm
                          font-semibold
                          text-faint
                          transition-colors
                          group-hover:text-accent
                        "
                      >
                        {number}
                      </span>

                      <div className="flex-1">

                        <h3
                          className="
                            flex
                            items-center
                            gap-3
                            text-2xl
                            font-semibold
                            text-ink
                            transition-colors
                            group-hover:text-accent
                          "
                        >

                          <Icon className="h-5 w-5 text-accent" />

                          {title}

                        </h3>

                        <p
                          className="
                            mt-3
                            max-w-xl
                            leading-relaxed
                            text-muted
                          "
                        >
                          {body}
                        </p>

                      </div>

                    </div>

                  </li>

                )
              )}

              </ol>
            </div>

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

            <p className="reveal text-sm tracking-[0.2em] text-accent">
              03 — {PHILOSOPHY.eyebrow}
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
          className="
            scroll-mt-24
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto max-w-wide">

            <p className="text-sm tracking-[0.2em] text-accent">
              04 — OUR PROCESS
            </p>

            <h2
              className="
                mt-4
                max-w-3xl
                text-4xl
                font-semibold
                tracking-tight
                text-ink
                sm:text-6xl
              "
            >
              From first question to working product.
            </h2>


            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">

              {PROCESS.map(
                ({ number, title, body, icon: Icon }) => (

                  <article
                    key={title}
                    className="
                      process-item
                      rounded-xl
                      border
                      border-line/30
                      bg-white/2.5
                      px-6
                      py-8
                      md:px-8
                      md:py-10
                      transition-all
                      duration-300
                      hover:border-accent/30
                      hover:bg-white/5
                      hover:shadow-[0_8px_24px_-12px_rgba(217,119,87,0.15)]
                    "
                  >

                    <div className="flex items-center justify-between pb-4">

                      <span className="font-mono text-xs font-semibold text-faint/80 uppercase tracking-wide">
                        Step {number}
                      </span>

                      <Icon className="h-5 w-5 text-accent" />

                    </div>

                    <h3
                      className="
                        mt-6
                        text-2xl
                        font-semibold
                        text-ink
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-md
                        leading-relaxed
                        text-muted
                      "
                    >
                      {body}
                    </p>

                  </article>

                )
              )}

            </div>

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
              <p className="text-sm tracking-[0.2em] text-accent">
                05 — {LABS.eyebrow}
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

              <a
                href={LABS.action.href}
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-accent
                  transition-opacity
                  hover:opacity-70
                "
              >
                {LABS.action.label}

                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* ABOUT                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="about"
          className="
            scroll-mt-24
            px-5
            py-28
            sm:px-8
          "
        >

          <div
            className="
              mx-auto
              grid
              max-w-wide
              gap-12
              lg:grid-cols-[0.75fr_1.5fr]
              lg:gap-20
            "
          >

            <div>

              <p className="text-sm tracking-[0.2em] text-accent">
                06 — {ABOUT.eyebrow}
              </p>

              <h2
                className="
                  mt-8
                  text-4xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-ink
                  sm:text-6xl
                "
              >
                {ABOUT.title}
              </h2>

            </div>


            <div>

              <div className="space-y-6">

                <p className="max-w-2xl text-lg leading-relaxed text-muted">
                  Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.
                </p>

                {ABOUT.paragraphs.map((paragraph) => (

                  <p
                    key={paragraph}
                    className="
                      max-w-2xl
                      text-lg
                      leading-relaxed
                      text-muted
                    "
                  >
                    {paragraph}
                  </p>

                ))}

              </div>

            </div>

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
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              heading="Clear answers about Cogniheim."
              items={FAQ_ITEMS}
              support={{
                text: "Something we didn't cover?",
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
          className="
            relative
            flex
            min-h-svh
            items-center
            overflow-hidden
            bg-noir
            px-5
            py-28
            text-white
            sm:px-8
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-96
              w-96
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-accent/20
              blur-[120px]
            "
          />

          <div className="relative mx-auto w-full max-w-wide">

            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">

              <div>
                <p className="text-sm tracking-[0.2em] text-white/40">
                  07 — {CONTACT.eyebrow}
                </p>

                <h2
                  className="
                    contact-title
                    mt-6
                    max-w-3xl
                    text-4xl
                    font-semibold
                    tracking-[-0.04em]
                    sm:text-6xl
                    lg:text-7xl
                  "
                >
                  {CONTACT.title}
                </h2>

                <p
                  className="
                    mt-6
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-white/60
                    sm:text-lg
                  "
                >
                  {CONTACT.description}
                </p>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    border-white/30
                    pb-1.5
                    text-base
                    transition-colors
                    hover:border-accent
                    hover:text-accent
                  "
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:text-accent"
                    >
                      <FontAwesomeIcon icon={icon} className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <ContactForm />
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <footer className="bg-noir px-5 pb-10 sm:px-8">

        <div
          className="
            mx-auto
            flex
            max-w-wide
            flex-col
            gap-6
            border-t
            border-white/10
            pt-8
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <p className="text-lg font-medium text-white">
              {FOOTER.brand}
            </p>

            <p className="mt-1 text-sm text-white/40">
              {FOOTER.tagline}
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              {FOOTER.description}
            </p>

          </div>


          <div className="flex flex-wrap gap-5">

            {FOOTER.links.map((link) => (

              <a
                key={link.label}
                href={link.href}
                className="
                  text-sm
                  text-white/50
                  transition-colors
                  hover:text-white
                "
              >
                {link.label}
              </a>

            ))}

          </div>

        </div>


        <div
          className="
            mx-auto
            mt-10
            flex
            max-w-wide
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >

          <p className="text-xs text-white/30">
            {FOOTER.copyright}
          </p>

          <a
            href="#top"
            className="
              text-xs
              text-white/40
              transition-colors
              hover:text-white
            "
          >
            Back to top ↑
          </a>

        </div>

      </footer>
    </>
  );
}