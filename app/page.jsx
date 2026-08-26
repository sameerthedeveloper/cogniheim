import SiteEffects from './components/SiteEffects.jsx';
import ContactForm from './components/ContactForm.jsx';

export default function Home() {
  return (
    <>
      <SiteEffects />

      {/* NAV */}
      <nav className="site-nav">
        <a href="#top" className="logo">
          MOHAMED<span className="dot"> </span>SAMEER
        </a>
        <button className="menu-toggle" aria-expanded="false" aria-controls="nav-overlay">
          <span className="menu-label label-open">Menu</span>
          <span className="menu-label label-close">Close</span>
        </button>
      </nav>

      <div className="nav-overlay" id="nav-overlay" hidden>
        <ul className="nav-overlay-links">
          <li><a href="#top">Home</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#journey">Journey</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-overlay-footer">
          <div className="nav-overlay-col">
            <p className="eyebrow">Find Me</p>
            <a href="https://linkedin.com/in/mdsameers/" target="_blank" rel="noopener">
              <i data-lucide="external-link" width="16" height="16"></i> LinkedIn
            </a>
          </div>
          <div className="nav-overlay-col">
            <p className="eyebrow">Get in Touch</p>
            <a href="mailto:mohamedsameer.s.2007@gmail.com">
              <i data-lucide="mail" width="16" height="16"></i> mohamedsameer.s.2007@gmail.com
            </a>
          </div>
        </div>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <span className="hero-watermark" aria-hidden="true">{'{ }'}</span>
          <span className="hero-bracket hero-bracket-tl" aria-hidden="true"></span>
          <span className="hero-bracket hero-bracket-br" aria-hidden="true"></span>

          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-photo" src="/hero-cutout.webp" alt="Mohamed Sameer S" />
          </div>

          <div className="hero-code" aria-hidden="true">
            <pre>{`const developer = {
  name: "Sameer",
  skills: ["React", "Next.js",
    "JavaScript", "GSAP"],
  passion: "Design x Code",
};`}</pre>
          </div>

          <div className="hero-scrim" aria-hidden="true"></div>

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">Hello, I&apos;m</p>
            <h1 className="hero-name">Sameer</h1>
            <p className="hero-bio">
              I build frontend experiences that are fast, accessible, and{' '}
              <em>shipped with intent.</em>
            </p>
            <div className="hero-actions">
              <a href="#work" className="hero-cta">
                Explore my work <i data-lucide="arrow-up-right" width="16" height="16"></i>
              </a>
              <a href="/resume.pdf" target="_blank" className="hero-cta-secondary">
                <i data-lucide="file-text" width="14" height="14"></i> View Resume
              </a>
            </div>
          </div>

          <div className="hero-meta hero-meta-left">
            <span className="status-dot" aria-hidden="true"></span>
            Based in Chennai, India
          </div>
          <div className="hero-meta hero-meta-right">
            <span className="pulse-dot" aria-hidden="true"></span>
            Open to internships
          </div>
          <a href="mailto:mohamedsameer.s.2007@gmail.com" className="hero-email">
            mohamedsameer.s.2007@gmail.com
          </a>
        </section>

        {/* ABOUT */}
        <section className="about">
          <div className="about-header">
            <h2>Hi, I&apos;m</h2>
            <h2>Sameer</h2>
          </div>
          <div className="about-bio">
            <p className="about-copy">
              I&apos;m a frontend developer based in Chennai, studying Computer Science
              Engineering, who builds software meant to actually run in someone&apos;s
              hands — offline-capable PWAs, sync engines, and real-time tools,
              shipped in React and Next.js for real clients and real communities.
            </p>
            <p className="about-tagline">React / Ship / Sync / Repeat</p>
          </div>
          <div className="about-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="project-thumb" src="/portrait.webp" alt="Mohamed Sameer S" />
          </div>
          <div className="about-tags" aria-hidden="true">
            <span className="about-tag" id="tag-1">React</span>
            <span className="about-tag" id="tag-2">Next.js</span>
            <span className="about-tag" id="tag-3">PWA</span>
            <span className="about-tag" id="tag-4">Sync</span>
            <span className="about-tag" id="tag-5">A11y</span>
          </div>
        </section>

        {/* FEATURED WORK */}
        <section className="work" id="work">
          <div className="work-pin">
            <div className="section-head">
              <p className="eyebrow">Featured Work</p>
            </div>

            <div className="work-titles">
              <h3 className="work-title-item" data-preview="cinemafocus.in">
                <a href="https://cinemafocus.in" target="_blank" rel="noopener" className="work-title-link">
                  cinemafocus.in <i data-lucide="external-link" width="18" height="18"></i>
                </a>
                <span className="work-meta">Next.js · Supabase · Tailwind CSS</span>
              </h3>
              <h3 className="work-title-item" data-preview="SalahSync">
                SalahSync
                <span className="work-meta">Next.js · Capacitor · OCR — 100 users on offline storage</span>
              </h3>
              <h3 className="work-title-item" data-preview="RetailFlow">
                RetailFlow
                <span className="work-meta">Next.js · React · Supabase — 30% increase in engagement</span>
              </h3>
              <h3 className="work-title-item" data-preview="IslamicTamilPod">
                IslamicTamilPod
                <span className="work-meta">Service Workers · IndexedDB — 85 Lighthouse, 50% faster loads</span>
              </h3>
              <h3 className="work-title-item" data-preview="OpenNotes">
                OpenNotes
                <span className="work-meta">React · Vite · Material UI (M3) · Firebase · TipTap</span>
              </h3>
              <h3 className="work-title-item" data-preview="FoodGuard 2.0">
                FoodGuard 2.0
                <span className="work-meta">React 19 · Vite · Firebase · Leaflet · Framer Motion</span>
              </h3>
            </div>

            <div className="work-cards" aria-hidden="true"></div>
            <div className="work-indicator"></div>

            <div className="work-footer">
              <p className="mn">Project Portfolio [ 06 ]</p>
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- literal divider text, not a comment */}
              <p className="mn">///////////////////</p>
              <a href="https://linkedin.com/in/mdsameers/" target="_blank" rel="noopener" className="mn">
                More on LinkedIn ↗
              </a>
            </div>
          </div>

          <ul className="work-list-mobile">
            <li>
              <a href="https://cinemafocus.in" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work-thumb" src="/projects/cinemafocus.webp" alt="cinemafocus.in preview" loading="lazy" />
                <span className="work-item-body">
                  <h3>cinemafocus.in</h3>
                  <span className="work-meta">Next.js · Supabase · Tailwind CSS</span>
                </span>
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-thumb" src="/projects/salahsync.webp" alt="SalahSync preview" loading="lazy" />
              <span className="work-item-body">
                <h3>SalahSync</h3>
                <span className="work-meta">Next.js · Capacitor · OCR — 100 users on offline storage</span>
              </span>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-thumb" src="/projects/retailflow.webp" alt="RetailFlow preview" loading="lazy" />
              <span className="work-item-body">
                <h3>RetailFlow</h3>
                <span className="work-meta">Next.js · React · Supabase — 30% increase in engagement</span>
              </span>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-thumb" src="/projects/islamictamilpod.svg" alt="IslamicTamilPod preview" loading="lazy" />
              <span className="work-item-body">
                <h3>IslamicTamilPod</h3>
                <span className="work-meta">Service Workers · IndexedDB — 85 Lighthouse, 50% faster loads</span>
              </span>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-thumb" src="/projects/opennotes.webp" alt="OpenNotes preview" loading="lazy" />
              <span className="work-item-body">
                <h3>OpenNotes</h3>
                <span className="work-meta">React · Vite · Material UI (M3) · Firebase · TipTap</span>
              </span>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-thumb" src="/projects/foodguard.webp" alt="FoodGuard 2.0 preview" loading="lazy" />
              <span className="work-item-body">
                <h3>FoodGuard 2.0</h3>
                <span className="work-meta">React 19 · Vite · Firebase · Leaflet · Framer Motion</span>
              </span>
            </li>
          </ul>
        </section>

        {/* JOURNEY */}
        <section className="journey" id="journey">
          <div className="section-head">
            <p className="eyebrow">Journey</p>
            <h2>How I got here.</h2>
          </div>
          <ol className="timeline">
            <div className="timeline-rail" aria-hidden="true"><span className="timeline-rail-fill"></span></div>

            <li className="timeline-item is-current">
              <span className="timeline-dot timeline-dot-current" aria-hidden="true"></span>
              <span className="timeline-kind">Role — ongoing</span>
              <span className="timeline-date">2025 — Present</span>
              <h3>Web Developer</h3>
              <p>Freelancer</p>
            </li>
            <li className="timeline-item">
              <span className="timeline-dot" aria-hidden="true"></span>
              <span className="timeline-kind">Role</span>
              <span className="timeline-date">2026</span>
              <h3>Full Stack Intern</h3>
              <p>Global Tech Computer Education, Chennai</p>
            </li>
            <li className="timeline-item">
              <span className="timeline-dot" aria-hidden="true"></span>
              <span className="timeline-kind">Education</span>
              <span className="timeline-date">2024 — 2028</span>
              <h3>BTech, Computer Science Engineering</h3>
              <p>BSA Crescent Institute of Science and Technology</p>
            </li>
            <li className="timeline-item timeline-item-cert">
              <span className="timeline-dot timeline-dot-cert" aria-hidden="true"></span>
              <span className="timeline-kind">Certification</span>
              <span className="timeline-date">2025</span>
              <h3>MERN Stack Certification</h3>
              <p>Global Tech Computer Education</p>
            </li>
            <li className="timeline-item timeline-item-cert">
              <span className="timeline-dot timeline-dot-cert" aria-hidden="true"></span>
              <span className="timeline-kind">Certification</span>
              <span className="timeline-date">2024</span>
              <h3>Front End Development Certification</h3>
              <p>Global Tech Computer Education</p>
            </li>
          </ol>
        </section>

        {/* SERVICES */}
        <section className="services-header">
          <div className="services-header-icon">
            <i data-lucide="sparkles" width="28" height="28" aria-hidden="true"></i>
          </div>
          <p className="services-header-tag">Your vision. My expertise.</p>
          <div className="services-header-title">
            <h2>Frontend development</h2>
            <h2>&amp; real-time systems</h2>
          </div>
          <div className="services-header-arrow" aria-hidden="true"><i data-lucide="arrow-down" width="28" height="28"></i></div>
        </section>

        <section className="services">
          <div className="service-card">
            <div className="service-card-inner">
              <div className="service-card-content">
                <span className="service-icon" aria-hidden="true"><i data-lucide="layout-template" width="24" height="24"></i></span>
                <h3>Frontend Development</h3>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="service-thumb" src="/keys/frontend-dev.webp" alt="Component-driven UI design system" />
            </div>
          </div>
          <div className="service-card">
            <div className="service-card-inner">
              <div className="service-card-content">
                <span className="service-icon" aria-hidden="true"><i data-lucide="wifi-off" width="24" height="24"></i></span>
                <h3>PWA &amp; Offline-First Engineering</h3>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="service-thumb" src="/keys/offline-pwa.webp" alt="Offline-first PWA UI on a phone" />
            </div>
          </div>
          <div className="service-card">
            <div className="service-card-inner">
              <div className="service-card-content">
                <span className="service-icon" aria-hidden="true"><i data-lucide="activity" width="24" height="24"></i></span>
                <h3>Real-Time &amp; Sync Systems</h3>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="service-thumb" src="/keys/real-time.webp" alt="Live device sync and real-time tracking" />
            </div>
          </div>
          <div className="service-card">
            <div className="service-card-inner">
              <div className="service-card-content">
                <span className="service-icon" aria-hidden="true"><i data-lucide="accessibility" width="24" height="24"></i></span>
                <h3>Accessibility-First UI</h3>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="service-thumb" src="/keys/accessibility.webp" alt="Accessibility settings with visible focus indicator" />
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="contact-cta" id="contact">
          <a href="mailto:mohamedsameer.s.2007@gmail.com" className="contact-cta-link">
            <span className="contact-cta-small">Open to internships and freelance work</span>
            <span className="contact-cta-large">Get in touch</span>
          </a>

          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-symbols" aria-hidden="true">
          <i data-lucide="activity" width="20" height="20"></i>
        </div>
        <h2 className="footer-header">Mohamed Sameer S</h2>
        <div className="footer-row">
          <div className="footer-col">
            <p className="eyebrow">Explore</p>
            <a href="#top">Home</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <p className="eyebrow">Connect</p>
            <a href="https://linkedin.com/in/mdsameers/" target="_blank" rel="noopener">
              <i data-lucide="external-link" width="15" height="15"></i> LinkedIn
            </a>
            <a href="mailto:mohamedsameer.s.2007@gmail.com">
              <i data-lucide="mail" width="15" height="15"></i> Email
            </a>
          </div>
          <div className="footer-col">
            <p className="eyebrow">Currently</p>
            <span>Chennai, India</span>
            <span>Open to internships</span>
          </div>
        </div>
        <p className="copyright">© Mohamed Sameer S — 2026</p>
      </footer>

      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
    </>
  );
}
