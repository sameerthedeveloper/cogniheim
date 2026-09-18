import { useState } from "react";
import type { FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseAuth";

function friendlyError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again in a moment.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email.";
    default:
      return "Couldn't sign in. Please try again.";
  }
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setError(friendlyError(code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070808] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0c0d0d] p-8 shadow-2xl"
      >
        <div className="mb-7 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Cogniheim"
            className="h-10 w-auto object-contain"
          />
        </div>

        <label className="mb-4 block">
          <span className="mb-1.5 block text-[13px] font-medium text-white/70">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors focus:border-[#39b9b0] focus:bg-white/[0.07]"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-1.5 block text-[13px] font-medium text-white/70">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors focus:border-[#39b9b0] focus:bg-white/[0.07]"
          />
        </label>

        {error && <p className="mb-4 text-[13px] text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-white px-5 py-2.5 text-[13px] font-semibold text-black transition-opacity hover:bg-neutral-200 disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-[12px] text-white/40 transition-colors hover:text-white"
          >
            ← Back to site
          </a>
        </div>
      </form>
    </div>
  );
}
