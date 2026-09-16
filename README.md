# Cogniheim — World of Thinkers

Marketing site for Cogniheim, a technology & product studio. Built with Vite, React, TypeScript, Tailwind CSS, and GSAP, following the brand's dark, teal-accented visual system.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Admin (`/admin`)

Site copy is stored in Firestore (`site/content`) and edited live from `/admin`, gated behind Firebase Auth email/password sign-in.

One-time setup in the [Firebase console](https://console.firebase.google.com/) for the `cogniheim` project:

1. **Authentication → Sign-in method** → enable **Email/Password**.
2. **Authentication → Users** → add the admin's email/password manually (there's no public sign-up flow).
3. **Firestore Database → Rules** → paste the contents of `firestore.rules` (public read, auth-required write) and publish. Until this is set, Firestore's default rules may block all access.

No other secrets are needed — the Firebase web config in `src/lib/firebase.ts` is safe to commit; it identifies the project, access is controlled entirely by the rules above.
