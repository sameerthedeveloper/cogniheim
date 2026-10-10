// Renders the Cogniheim /flute tour with live interaction.
//
// Flute's own exporter only seeks the camera. This script drives the same
// capture bridge (window.__FLUTE_CAPTURE__.seek) frame by frame, but between
// frames it also moves a real mouse over the real components, so genuine
// :hover states fire, and clicks / types on a schedule (FAQ, modal, form).
//
//   node scripts/render-tour.mjs --url http://localhost:3001 --out .tmp-video/tour.mp4
//   node scripts/render-tour.mjs --fps 6 --out .tmp-video/preview.mp4 --stills 9,15,60
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const BASE = args.url ?? 'http://localhost:3001';
const FPS = Number(args.fps ?? 30);
const OUT = args.out ?? '.tmp-video/cogniheim-tour.mp4';
const STILLS = (args.stills ?? '').split(',').filter(Boolean).map(Number);
const W = 1920, H = 1080;

const require = createRequire(path.resolve('node_modules/@webprodigies/flute/package.json'));
const { chromium } = require('playwright');

// ---- Interaction schedule (seconds on the scene clock) ---------------------
// sel/i: element to follow with the mouse.  click: seconds after `at` to click.
// type: {text, cps}.  rail / strip: deterministic scroll-linked state.
const FAQ = '#faq button[aria-expanded]';
const BEATS = [
  { at: 1.0, dur: 1.8, sel: '#hero .hero-actions a', i: 0 },
  { at: 3.0, dur: 0.9, sel: 'header a[href="#work"]', i: 0 },

  { at: 8.0, dur: 1.5, sel: '#work article button[aria-label^="Open"]', i: 0 },
  { at: 9.7, dur: 1.6, sel: '#work article button[aria-label^="Open"]', i: 1 },
  { at: 11.5, dur: 1.5, strip: [11.5, 13.3], sel: '#work ul[aria-label]' },
  { at: 13.3, dur: 4.2, sel: '#work article button[aria-label^="Open"]', i: 2, click: 0.8, closeAt: 16.6 },

  { at: 22.6, dur: 1.4, sel: '#capabilities ul > li > div', i: 0 },
  { at: 24.0, dur: 1.4, sel: '#capabilities ul > li > div', i: 1 },
  { at: 25.4, dur: 1.4, sel: '#capabilities ul > li > div', i: 2 },
  { at: 26.8, dur: 1.4, sel: '#capabilities ul > li > div', i: 3 },

  { at: 31.8, dur: 1.8, sel: '#philosophy a[href="#process"]', i: 0 },

  { at: 37.0, dur: 7.5, rail: [37.0, 44.0] },
  { at: 41.5, dur: 2.5, sel: '#process .journey-row', i: 2 },

  { at: 49.0, dur: 1.4, sel: '#labs a', i: 0 },

  { at: 59.4, dur: 1.9, sel: FAQ, i: 0, click: 0.6 },
  { at: 61.9, dur: 1.9, sel: FAQ, i: 1, click: 0.6 },
  { at: 64.4, dur: 1.9, sel: FAQ, i: 2, click: 0.6 },

  { at: 70.4, dur: 1.5, sel: '#contact-name', click: 0.5, type: { text: 'Alex Morgan', cps: 11, start: 1.0 } },
  { at: 72.4, dur: 2.5, sel: '#contact-email', click: 0.5, type: { text: 'alex@studio.com', cps: 12, start: 1.0 } },
  { at: 75.1, dur: 3.9, sel: '#contact-message', click: 0.5, type: { text: 'We need a product site and a small SaaS dashboard.', cps: 19, start: 1.0 } },
  { at: 79.2, dur: 1.3, sel: 'button[form="contact-form"]', i: 0 },
  { at: 80.9, dur: 0.9, sel: '#contact ul a', i: 0 },
  { at: 81.9, dur: 0.9, sel: '#contact ul a', i: 1 },
  { at: 82.9, dur: 0.9, sel: '#contact ul a', i: 2 },

  { at: 88.4, dur: 1.4, sel: 'footer nav a[href="#capabilities"]', i: 0 },
  { at: 90.0, dur: 1.4, sel: 'footer a[href*="linkedin"]', i: 0 },
  { at: 91.6, dur: 1.2, sel: 'footer a[href="#top"]', i: 0 },
];

const clamp01 = (x) => Math.max(0, Math.min(1, x));

const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
await page.goto(`${BASE}/flute?flute-scene=cogniheim-tour`, { waitUntil: 'load', timeout: 120000 });
await page.addStyleTag({ content: '[data-flute-preview-chrome],nextjs-portal{visibility:hidden!important}' });
await page.waitForFunction(() => typeof window.__FLUTE_CAPTURE__?.seek === 'function', undefined, { timeout: 30000 });
await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
await page.waitForTimeout(1500);

const manifest = await page.evaluate(() => ({ d: window.__FLUTE_CAPTURE__.durationMs, s: window.__FLUTE_CAPTURE__.selector }));
const frames = Math.ceil((manifest.d * FPS) / 1000);
const rect = await page.locator(manifest.s).boundingBox();
console.log(`frames ${frames} @${FPS}fps, viewport`, rect);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const enc = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-nostdin', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-vcodec', 'png', '-i', 'pipe:0', '-an',
  '-vf', `scale=${args.w ?? W}:-2`, '-c:v', 'libx264', '-preset', args.preset ?? 'medium', '-crf', String(args.crf ?? 18), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'ignore', 'inherit'] });
enc.stdin.on('error', () => {});

const REST = { x: 1780, y: 1000 };
let mouse = { ...REST };
const typed = new Map();
const clicked = new Set();
const closed = new Set();
const dt = 1 / FPS;
const alpha = 1 - Math.exp(-dt * 7);

const centerOf = (sel, i = 0) => page.evaluate(([s, n]) => {
  const el = document.querySelectorAll(s)[n];
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}, [sel, i]);

for (let f = 0; f < frames; f++) {
  const t = f / FPS;
  await page.evaluate((ms) => window.__FLUTE_CAPTURE__.seek(ms), t * 1000);

  const active = BEATS.filter((b) => b.sel && !b.strip && t >= b.at && t < b.at + b.dur).pop();
  let target = REST;
  if (active) target = (await centerOf(active.sel, active.i ?? 0)) ?? REST;

  // deterministic scroll-linked state
  for (const b of BEATS) {
    if (b.strip) {
      const p = clamp01((t - b.strip[0]) / (b.strip[1] - b.strip[0]));
      const e = p * p * (3 - 2 * p);
      await page.evaluate(([s, v]) => { const el = document.querySelector(s); if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) * v; }, [b.sel, e]);
    }
    if (b.rail) {
      const p = clamp01((t - b.rail[0]) / (b.rail[1] - b.rail[0]));
      await page.evaluate((v) => {
        const fill = document.querySelector('.journey-rail-fill');
        if (fill) fill.style.transform = `translateX(-50%) scaleY(${v})`;
        document.querySelectorAll('.journey-dot').forEach((d, i, all) => d.classList.toggle('is-passed', v >= i / (all.length - 1) - 0.02 && v > 0));
      }, p);
    }
  }

  mouse = { x: mouse.x + (target.x - mouse.x) * alpha, y: mouse.y + (target.y - mouse.y) * alpha };
  await page.mouse.move(mouse.x, mouse.y);

  if (active?.click != null && t >= active.at + active.click && !clicked.has(active)) {
    clicked.add(active);
    mouse = { ...target };
    await page.mouse.move(mouse.x, mouse.y);
    await page.mouse.click(mouse.x, mouse.y);
  }
  if (active?.type) {
    const ty = active.type;
    const want = Math.max(0, Math.min(ty.text.length, Math.floor((t - active.at - ty.start) * ty.cps)));
    const have = typed.get(active) ?? 0;
    if (want > have) { await page.keyboard.type(ty.text.slice(have, want)); typed.set(active, want); }
  }
  for (const b of BEATS) {
    if (b.closeAt && t >= b.closeAt && !closed.has(b)) {
      closed.add(b);
      const c = await centerOf('[aria-label="Close project details"]');
      if (c) { await page.mouse.move(c.x, c.y); await page.mouse.click(c.x, c.y); mouse = c; }
    }
  }

  const png = await page.screenshot({ clip: rect, type: 'png', animations: 'disabled' });
  if (STILLS.some((s) => Math.abs(s - t) < dt / 2 + 1e-6)) fs.writeFileSync(`/tmp/claude-501/still-${Math.round(t * 10) / 10}.png`, png);
  await new Promise((res, rej) => enc.stdin.write(png, (e) => (e ? rej(e) : res())));
  if (f % (FPS * 5) === 0) console.log(`t=${t.toFixed(1)}s frame ${f}/${frames}`);
}
enc.stdin.end();
await new Promise((r) => enc.on('close', r));
await browser.close();
console.log('done', OUT, 'errors:', errors);
