// Fast framing check: seeks the scene to given times (no interaction) and
// saves a contact sheet. node scripts/tour-stills.mjs 2,12,24 /tmp/sheet.png
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(path.resolve('node_modules/@webprodigies/flute/package.json'));
const { chromium } = require('playwright');
const times = (process.argv[2] ?? '').split(',').map(Number);
const out = process.argv[3] ?? '/tmp/claude-501/sheet.png';
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:3001/flute?flute-scene=cogniheim-tour', { waitUntil: 'load', timeout: 120000 });
await page.addStyleTag({ content: '[data-flute-preview-chrome],nextjs-portal{visibility:hidden!important}' });
await page.waitForFunction(() => typeof window.__FLUTE_CAPTURE__?.seek === 'function');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);
const shots = [];
for (const t of times) {
  await page.evaluate((ms) => window.__FLUTE_CAPTURE__.seek(ms), t * 1000);
  await page.waitForTimeout(150);
  shots.push(await page.screenshot({ type: 'png' }));
}
await browser.close();
const fs = await import('node:fs');
shots.forEach((b, i) => fs.writeFileSync(`/tmp/claude-501/cal-${times[i]}.png`, b));
console.log('saved', times.join(','));
