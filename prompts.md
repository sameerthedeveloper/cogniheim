# Image prompts for unfilled placeholders

Six `.placeholder-img` slots in `app/page.jsx` still show the styled
gradient placeholder (amber-to-cream gradient, ink border, `data-label` chip).
Each entry below has the placeholder's label, where it appears, the exact
pixel/aspect specs from `app/sections.css`, and a prompt to generate or
commission a replacement image. Once you have a file, drop it in
`public/` and swap the `<div className="placeholder-img" data-label="...">`
for an `<img src="..." alt="...">` (see how `public/projects/*.webp` and
`public/portrait.webp` are already wired in for the pattern to copy).

Style guide for all images: warm, high-contrast, editorial — matches the
site's palette (`--bg #f1ecdc` paper, `--ink #16130c`, `--accent #e8a33d`
amber, `--accent-2 #e4482a` coral, `--accent-3 #1f8a7a` teal). Avoid stock-
photo gloss; favor a slightly grainy, printed-poster feel with a visible
grid/dot texture in the background if generated.

---

## 1. Hero image

**Label:** `Hero image` · **Section:** Hero, full-bleed banner below the name
**Size:** full-width, `70vh` desktop / `45vh` mobile, no fixed aspect ratio (crops via `object-fit: cover` once real)

> A wide editorial hero shot representing "building real, live software" —
> e.g. a clean overhead desk shot with a laptop mid-code, warm afternoon
> light, a coffee cup, sketchy notebook nearby. Warm cream/amber color
> grade, shallow depth of field, off-center composition with negative
> space on one side for the name to visually breathe against when scrolled
> into view. No visible text/UI on the laptop screen (avoid dating it).

---

## 2. Services header icon

**Label:** `Icon` · **Section:** Services header, small circular badge above "Your vision. My expertise."
**Size:** `4.5rem × 4.5rem` circle, `object-fit: cover`

> A small circular monogram or abstract mark — either a tight crop of the
> "activity"/pulse-line motif already used elsewhere on the site (in
> amber on cream), or a crop of the real portrait (`public/portrait.webp`)
> centered on the face. Should read clearly at 72px.

---

## 3. Frontend Development

**Label:** `Frontend` · **Section:** Services, card 1
**Size:** `8rem × 5rem` desktop (small, right-aligned) / full-width `8rem` tall on mobile

> A tight, cropped screenshot-style graphic of a clean component-driven UI
> — a card grid or design-system Storybook-like layout, in an amber/cream
> palette to match the site, shown at an angle or with a browser-chrome
> sliver at the top. Should read as "structured, componentized frontend
> work" at a glance, even cropped small.

---

## 4. PWA & Offline-First Engineering

**Label:** `PWA` · **Section:** Services, card 2
**Size:** same as above (`8rem × 5rem` desktop / full-width mobile)

> A phone mockup showing an offline/no-connection state gracefully
> handled — e.g. a subtle "You're offline, changes will sync" banner over
> an otherwise normal app UI, or a Wi-Fi-off icon integrated into a clean
> UI screenshot. Should visually pair with the `wifi-off` lucide icon
> already used on this card.

---

## 5. Real-Time & Sync Systems

**Label:** `Sync` · **Section:** Services, card 3
**Size:** same as above

> An abstract or literal depiction of live data syncing between two
> devices — e.g. two phone/laptop silhouettes connected by a pulsing
> signal line (echo the site's heartbeat/"activity" glyph), or a live map
> with a moving marker (nodding to the FoodGuard project's routing
> feature). Amber/teal accent line on a dark or cream ground.

---

## 6. Accessibility-First UI

**Label:** `Accessibility` · **Section:** Services, card 4
**Size:** same as above

> A UI screenshot demonstrating visible accessibility care — a focus-
> ring highlight on an interactive element, a high-contrast toggle, or a
> screen-reader label callout annotated on top of a real-looking
> interface. Should visually pair with the `accessibility` lucide icon
> already used on this card.

---

## Already filled — not included above

- `public/projects/*.webp` — the six Featured Work screenshots.
- `public/portrait.webp` — the About section portrait (real photo, wired
  in directly, no AI generation used).
