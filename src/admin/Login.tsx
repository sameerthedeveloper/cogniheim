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
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#e6e5e1] bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <img src="/cogniheim-mark.svg" alt="" className="h-6 w-6" />
          <span className="text-[13px] font-semibold tracking-[0.14em] text-[#141414]">
            COGNIHEIM ADMIN
          </span>
        </div>

        <label className="mb-4 block">
          <span className="mb-1.5 block text-[13px] font-medium text-[#4a4a45]">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[#e6e5e1] bg-white px-3.5 py-2.5 text-[14px] text-[#141414] outline-none transition-colors focus:border-[#39b9b0]"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-1.5 block text-[13px] font-medium text-[#4a4a45]">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#e6e5e1] bg-white px-3.5 py-2.5 text-[14px] text-[#141414] outline-none transition-colors focus:border-[#39b9b0]"
          />
        </label>

        {error && <p className="mb-4 text-[13px] text-[#b3413a]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-[#0f1110] px-5 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
