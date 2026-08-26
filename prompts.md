# Image prompts for unfilled placeholders

Two `.placeholder-img` slots in `app/page.jsx` still show the styled
gradient placeholder (amber-to-cream gradient, ink border, `data-label` chip).
Each entry below has the placeholder's label, where it appears, the exact
pixel/aspect specs from `app/sections.css`, and a prompt to generate or
commission a replacement image. Once you have a file, drop it in
`public/` and swap the `<div className="placeholder-img" data-label="...">`
for an `<img src="..." alt="...">` (see how `public/projects/*.webp`,
`public/portrait.webp`, `public/hero-cutout.webp`, and `public/keys/*.webp`
are already wired in for the pattern to copy).

Style guide for all images: moody, cinematic, editorial — matches the
site's current dark palette (`--bg #100d0b` near-black, `--ink #efe7dc`
warm off-white, `--accent #c2652f` burnt terracotta). Warm directional
lighting, slight grain, low-contrast shadows. Avoid stock-photo gloss and
bright/flat lighting.

---

## 1. Hero image

**Label:** `Hero image` · **Section:** originally a full-bleed banner below the name — since replaced by `hero-cutout.webp` (a real transparent cutout photo), this placeholder no longer exists in the current layout. Left here only in case you want a literal background-image treatment again later.

> A wide editorial hero shot representing "building real, live software" —
> e.g. a clean overhead desk shot with a laptop mid-code, warm light, a
> coffee cup, sketchy notebook nearby. Shallow depth of field, off-center
> composition. No visible text/UI on the laptop screen (avoid dating it).

---

## 2. Services header icon

**Label:** `Icon` · **Section:** Services header, small circular badge above "Your vision. My expertise."
**Size:** `4.5rem × 4.5rem` circle, `object-fit: cover`

> A small circular monogram or abstract mark — either a tight crop of the
> "activity"/pulse-line motif already used elsewhere on the site (in
> terracotta on dark), or a crop of the real portrait/hero cutout centered
> on the face. Should read clearly at 72px.

---

## Already filled — not included above

- `public/projects/*.webp` — the six Featured Work screenshots.
- `public/portrait.webp` — the About section portrait (real photo).
- `public/hero-cutout.webp` — the Hero section's full-body transparent
  cutout (real photo, background removed, composited straight onto the
  dark hero background — no rectangular photo frame).
- `public/keys/*.webp` — the four Services card images (Frontend,
  Offline-First PWA, Real-Time & Sync, Accessibility), added directly by
  the user to match their respective prompts above.

Only the services header icon is still a placeholder.
