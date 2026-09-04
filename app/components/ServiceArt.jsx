// Apple's feature tiles are almost never stock photography — they're custom
// gradient/glyph artwork (System Settings, Health, the "what's new" panels).
// One reusable soft-gradient composition per service, tuned per tone, in
// place of the low-res stock photos.
const TONES = {
  frontend: {
    from: '#d97757',
    to: '#b85c3d',
    id: 'frontend',
  },
  offline: {
    from: '#7c8b5b',
    to: '#5f6e45',
    id: 'offline',
  },
  realtime: {
    from: '#d9a05b',
    to: '#c17f3a',
    id: 'realtime',
  },
  accessibility: {
    from: '#9b6b8c',
    to: '#6e4f63',
    id: 'accessibility',
  },
};

export default function ServiceArt({ tone }) {
  const { from, to, id } = TONES[tone];
  const gradId = `svc-grad-${id}`;
  const glowId = `svc-glow-${id}`;

  return (
    <svg viewBox="0 0 400 176" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="176" fill={`url(#${gradId})`} />
      <rect width="400" height="176" fill={`url(#${glowId})`} />

      {tone === 'frontend' && (
        <g stroke="white" strokeOpacity="0.55" strokeWidth="1.5" fill="none">
          <rect x="150" y="38" width="185" height="120" rx="14" fill="white" fillOpacity="0.08" />
          <line x1="150" y1="70" x2="335" y2="70" />
          <rect x="164" y="84" width="60" height="60" rx="8" fill="white" fillOpacity="0.16" />
          <line x1="236" y1="86" x2="321" y2="86" strokeOpacity="0.35" />
          <line x1="236" y1="100" x2="300" y2="100" strokeOpacity="0.35" />
          <line x1="236" y1="114" x2="310" y2="114" strokeOpacity="0.35" />
        </g>
      )}

      {tone === 'offline' && (
        <g stroke="white" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M120 120a90 90 0 0 1 160 0" strokeOpacity="0.25" />
          <path d="M145 130a58 58 0 0 1 110 0" strokeOpacity="0.45" />
          <path d="M172 140a28 28 0 0 1 56 0" strokeOpacity="0.7" />
          <circle cx="200" cy="150" r="5" fill="white" />
          <line x1="90" y1="70" x2="310" y2="130" strokeOpacity="0.9" strokeWidth="3" />
        </g>
      )}

      {tone === 'realtime' && (
        <g stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="60,120 130,120 150,70 180,150 205,95 230,120 340,120" strokeOpacity="0.9" />
          <circle cx="150" cy="70" r="4" fill="white" />
          <circle cx="180" cy="150" r="4" fill="white" />
        </g>
      )}

      {tone === 'accessibility' && (
        <g stroke="white" fill="none">
          <circle cx="200" cy="90" r="55" strokeWidth="1.5" strokeOpacity="0.3" />
          <circle cx="200" cy="90" r="36" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="200" cy="90" r="17" strokeWidth="2" strokeOpacity="0.85" />
          <circle cx="200" cy="90" r="5" fill="white" />
        </g>
      )}
    </svg>
  );
}
