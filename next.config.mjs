/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Disabled so the vanilla GSAP/Lenis bootstrap in SiteEffects (ported
  // as-is from the original main.js) doesn't double-run in dev, which
  // would double-bind event listeners and double-init ScrollTriggers.
  reactStrictMode: false,
  // Pin the workspace root so Turbopack doesn't pick up an unrelated
  // package-lock.json from a parent directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
