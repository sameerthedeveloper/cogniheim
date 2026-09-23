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
import { Button } from "./components/ui/button";
import WorkGrid from "./components/WorkGrid";
import ContactForm from "./components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

/*
|--------------------------------------------------------------------------
| COGNIHEIM — COMPANY CONTENT
|--------------------------------------------------------------------------
|
| This replaces the personal portfolio content.
|
| Visual reference:
| - mohamedsameer.tech
|
| Company content:
| - cogniheim.in
|
| Existing creative direction:
| - cogniheim.lovable.app
|
| CMS:
| - Firebase Firestore
|
| Animation:
| - GSAP + ScrollTrigger
|
|--------------------------------------------------------------------------
*/


/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "TECHNOLOGY & PRODUCT STUDIO",

  title: "Ideas deserve to become real.",

  description:
    "We think, design, and build digital products that solve real problems — from ambitious web experiences to reliable software and SaaS.",

  primaryAction: {
    label: "Start a project",
    href: "#contact",
  },

  secondaryAction: {
    label: "Explore our work",
    href: "#work",
  },
};


/* -------------------------------------------------------------------------- */
/* CAPABILITIES                                                               */
/* -------------------------------------------------------------------------- */

export const SERVICES = [
  {
    number: "01",
    title: "Digital Products",

    body:
      "Useful, coherent products shaped around real problems, clear thinking, and meaningful user needs.",

    icon: Layers3,
    tone: "products",
  },

  {
    number: "02",
    title: "Product Design",

    body:
      "Clear interfaces, thoughtful experiences, and design systems built to make complex products feel simple.",

    icon: PenTool,
    tone: "design",
  },

  {
    number: "03",
    title: "Software Engineering",

    body:
      "Reliable, maintainable software engineered with modern technologies, strong foundations, and attention to detail.",

    icon: Code2,
    tone: "engineering",
  },

  {
    number: "04",
    title: "SaaS Development",

    body:
      "From product direction to production software, we build focused SaaS products designed to grow with their users.",

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
      "A premium digital experience for CinemaFocus, bringing high-end audio and home cinema into a clear, immersive web experience.",

    highlight:
      "Premium audio & home cinema experience",

    featured: true,
  },

  /*
   * Add future Cogniheim client/product projects here.
   *
   * These should eventually come from Firebase instead of
   * being hard-coded.
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

  title: "Good software starts with good thinking.",

  description:
    "Technology is the medium. Thinking is the foundation. We start by understanding the problem, questioning assumptions, and finding the simplest meaningful way forward.",
};


/* -------------------------------------------------------------------------- */
/* PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

export const PROCESS = [
  {
    number: "01",
    title: "Think",

    body:
      "We find the real problem before reaching for a solution. We ask questions, understand context, and define what actually matters.",

    icon: Lightbulb,
  },

  {
    number: "02",
    title: "Design",

    body:
      "We turn complexity into a clear product direction through thoughtful interfaces, systems, and experiences.",

    icon: PenTool,
  },

  {
    number: "03",
    title: "Build",

    body:
      "We engineer the product with care, using modern technologies and foundations that are designed to remain maintainable.",

    icon: Wrench,
  },

  {
    number: "04",
    title: "Evolve",

    body:
      "We learn from real usage, refine what matters, and help the product become stronger over time.",

    icon: RefreshCw,
  },
];


/* -------------------------------------------------------------------------- */
/* LABS                                                                       */
/* -------------------------------------------------------------------------- */

export const LABS = {
  eyebrow: "COGNIHEIM LABS",

  title: "Ideas become products.",

  description:
    "Labs is where we explore promising ideas, question assumptions, and shape focused experiments into useful products.",

  action: {
    label: "Start a project",
    href: "#contact",
  },
};


/* -------------------------------------------------------------------------- */
/* ABOUT                                                                      */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  eyebrow: "ABOUT COGNIHEIM",

  title:
    "A technology and product studio for thoughtful ideas that deserve serious craft.",

  paragraphs: [
    "Cogniheim brings product thinking, design, and engineering together to turn ideas into useful digital products.",

    "We work across digital products, product design, software engineering, and SaaS — from the first question to the working product.",

    "Our approach is intentionally focused: understand the problem, make thoughtful decisions, build with care, and keep improving.",
  ],
};


/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  eyebrow: "START A CONVERSATION",

  title: "Have an idea worth building?",

  description:
    "Tell us what you're thinking. Whether you're starting from an idea, solving a difficult problem, or looking to improve an existing product, we'd love to hear about it.",

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
      "Cogniheim is a technology and product studio focused on building modern web products, software, and SaaS experiences.",
  },
  {
    question: "What does Cogniheim do?",
    answer:
      "Cogniheim helps teams and founders turn ideas into useful digital products through product thinking, design, software engineering, and SaaS development.",
  },
  {
    question: "What services does Cogniheim provide?",
    answer:
      "Cogniheim works across product design, software engineering, SaaS development, web applications, digital product development, and product strategy.",
  },
  {
    question: "Does Cogniheim build SaaS products?",
    answer:
      "Yes. Cogniheim builds software and SaaS experiences designed to solve real problems and evolve with product needs.",
  },
  {
    question: "Who founded Cogniheim?",
    answer:
      "Cogniheim was founded by S. Mohamed Sameer.",
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

          <div className="mx-auto w-full max-w-wide text-center">

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
          className="
            scroll-mt-24
            min-h-svh
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto grid max-w-wide gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">

            <div className="max-w-2xl">

              <p className="section-eyebrow text-sm tracking-[0.2em] text-accent">
                01 — SELECTED WORK
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
                Work built with purpose.
              </h2>

              <p className="mt-5 text-lg text-muted">
                A selection of digital products and experiences we&apos;ve
                designed and engineered.
              </p>

            </div>


            <div className="lg:pb-1">

              <WorkGrid work={WORK} />

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
            min-h-svh
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

              <p className="mt-5 max-w-sm text-muted">
                From product thinking and interface design to software
                engineering and SaaS development.
              </p>

            </div>


            <ol className="border-t border-line">

              {SERVICES.map(
                ({ number, title, body, icon: Icon }) => (

                  <li
                    key={title}
                    className="
                      group
                      border-b
                      border-line
                      py-8
                    "
                  >

                    <div className="flex gap-5">

                      <span
                        className="
                          pt-1
                          font-mono
                          text-sm
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
                            font-medium
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

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* PHILOSOPHY                                                       */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="philosophy"
          className="
            scroll-mt-24
            min-h-svh
            bg-noir
            px-5
            py-32
            text-white
            sm:px-8
          "
        >

          <div className="mx-auto grid max-w-wide gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">

            <p className="text-sm tracking-[0.2em] text-white/50">
              03 — {PHILOSOPHY.eyebrow}
            </p>

            <h2
              className="
                philosophy-title
                mt-8
                max-w-5xl
                text-5xl
                font-semibold
                tracking-[-0.04em]
                sm:text-7xl
                lg:text-8xl
              "
            >
              {PHILOSOPHY.title}
            </h2>

            <p
              className="
                philosophy-description
                mt-10
                max-w-2xl
                text-lg
                leading-relaxed
                text-white/60
                sm:text-xl
              "
            >
              {PHILOSOPHY.description}
            </p>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* PROCESS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="process"
          className="
            scroll-mt-24
            min-h-svh
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


            <div className="mt-20 grid gap-x-10 gap-y-0 md:grid-cols-2 lg:gap-x-16">

              {PROCESS.map(
                ({ number, title, body, icon: Icon }) => (

                  <article
                    key={title}
                    className="
                      process-item
                      border-t
                      border-line
                      px-0
                      py-10
                      md:px-8
                      md:py-12
                    "
                  >

                    <div className="flex items-center justify-between">

                      <span className="font-mono text-sm text-faint">
                        {number}
                      </span>

                      <Icon className="h-5 w-5 text-accent" />

                    </div>

                    <h3
                      className="
                        mt-8
                        text-3xl
                        font-medium
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
            min-h-svh
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >

          <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-20">

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

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-relaxed
                text-muted
              "
            >
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
                lg:justify-self-end
              "
            >
              {LABS.action.label}

              <ArrowUpRight className="h-4 w-4" />
            </a>

          </div>

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* ABOUT                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="about"
          className="
            scroll-mt-24
            min-h-svh
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

            </div>


            <div>

              <h2
                className="
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

              <div className="mt-10 space-y-6">

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
          className="
            scroll-mt-24
            min-h-svh
            bg-surface-2
            px-5
            py-28
            sm:px-8
          "
        >
          <div className="mx-auto max-w-wide">
            <p className="text-sm tracking-[0.2em] text-accent">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Clear answers about Cogniheim.
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="rounded-2xl border border-line bg-white/30 p-6">
                  <h3 className="text-xl font-medium text-ink">{item.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
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