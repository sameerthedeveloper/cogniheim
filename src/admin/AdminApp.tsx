import { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseAuth";
import { useContent } from "../content/ContentContext";
import type { SiteContent } from "../content/defaultContent";
import { useDocumentMeta, useNoIndex } from "../lib/useDocumentMeta";
import { useAuth } from "./useAuth";
import { Login } from "./Login";
import { Field, TextArea, ListEditor } from "./fields";

type SectionKey =
  | "seo"
  | "brand"
  | "hero"
  | "intro"
  | "capabilities"
  | "process"
  | "work"
  | "philosophy"
  | "future"
  | "contact"
  | "footer";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "seo", label: "SEO" },
  { key: "brand", label: "Brand" },
  { key: "hero", label: "Hero" },
  { key: "intro", label: "Intro" },
  { key: "capabilities", label: "Capabilities" },
  { key: "process", label: "Process" },
  { key: "work", label: "Selected Work" },
  { key: "philosophy", label: "Philosophy" },
  { key: "future", label: "Product Studio" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Footer" },
];

export function AdminApp() {
  useNoIndex();
  useDocumentMeta("Admin · Cogniheim", "Content dashboard for the Cogniheim website.");

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#070808]">
        <img
          src="/logo.png"
          alt="Cogniheim"
          className="h-10 w-auto object-contain animate-pulse"
        />
        <div className="mt-5 h-[2px] w-12 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full bg-[#39b9b0] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) return <Login />;

  return <Dashboard userEmail={user.email} />;
}

function Dashboard({ userEmail }: { userEmail: string | null }) {
  const { content, setContent, resetContent, loading: contentLoading } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [active, setActive] = useState<SectionKey>("seo");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSynced = useRef(content);

  // Adopt live Firestore content into the draft as long as the admin hasn't
  // made unsaved edits since the last sync (so we don't clobber in-progress work).
  useEffect(() => {
    if (JSON.stringify(draft) === JSON.stringify(lastSynced.current)) {
      setDraft(content);
    }
    lastSynced.current = content;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  function patch<K extends SectionKey>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await setContent(draft);
      setSavedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    setDraft(content);
  }

  async function resetAll() {
    setSaving(true);
    setError(null);
    try {
      await resetContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reset. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-light min-h-screen bg-[#f7f7f5] text-[#141414]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col m-3 rounded-2xl border border-white/[0.08] bg-[#0c0d0d] p-5 shadow-2xl md:flex">
          <div className="mb-7 flex items-center px-1">
            <img
              src="/logo.png"
              alt="Cogniheim"
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="mb-2.5 px-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Content
          </p>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
            {SECTIONS.map((s) => {
              const isActive = active === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13.5px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.1] text-white shadow-sm border border-white/[0.08]"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span>{s.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39b9b0] shadow-[0_0_8px_#39b9b0]" />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="mt-6 space-y-2 border-t border-white/[0.08] pt-4">
            <p className="truncate px-2 text-[11.5px] font-mono tracking-tight text-white/40">
              {userEmail}
            </p>
            <a
              href="/"
              className="block rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-center text-[13px] font-medium text-white/80 transition-all hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
            >
              ← View site
            </a>
            <button
              onClick={() => signOut(auth)}
              className="w-full rounded-xl px-3.5 py-2 text-center text-[13px] font-medium text-rose-400/90 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#e6e5e1] bg-white px-6 py-4 md:px-10">
            <div>
              <h1 className="text-[15px] font-semibold text-[#141414]">
                {SECTIONS.find((s) => s.key === active)?.label}
              </h1>
              <p className="text-[12px] text-[#6e6e69]">
                {contentLoading ? "Loading live content…" : "Synced live via Firebase."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {error && <span className="text-[12px] text-[#b3413a]">{error}</span>}
              {savedAt && !dirty && !error && (
                <span className="text-[12px] text-[#0f8f7c]">Saved</span>
              )}
              {dirty && (
                <button
                  onClick={discard}
                  className="rounded-full border border-[#d8d7d2] bg-white px-4 py-1.5 text-[13px] font-medium text-[#2a2a28] transition-colors hover:bg-[#f2f1ed]"
                >
                  Discard
                </button>
              )}
              <button
                onClick={save}
                disabled={!dirty || saving}
                className="rounded-full bg-[#141414] px-5 py-1.5 text-[13px] font-medium text-white transition-opacity hover:bg-black disabled:opacity-30"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
            <div className="mx-auto max-w-2xl">
              {active === "seo" && (
                <div className="space-y-5">
                  <Field label="Page title (shown in browser tabs & search results)" value={draft.seo.title} onChange={(v) => patch("seo", { ...draft.seo, title: v })} />
                  <TextArea label="Meta description (search & social preview text)" value={draft.seo.description} onChange={(v) => patch("seo", { ...draft.seo, description: v })} />
                  <p className="text-[12px] leading-relaxed text-black">
                    These update the live page for browsers and JavaScript-aware crawlers. AI/LLM answer-engine bots and basic search crawlers read the static tags baked into index.html at build time — update those in the repo if you change these often.
                  </p>
                </div>
              )}

              {active === "brand" && (
                <div className="space-y-5">
                  <Field label="Name" value={draft.brand.name} onChange={(v) => patch("brand", { ...draft.brand, name: v })} />
                  <Field label="Tagline" value={draft.brand.tagline} onChange={(v) => patch("brand", { ...draft.brand, tagline: v })} />
                  <Field label="Category" value={draft.brand.category} onChange={(v) => patch("brand", { ...draft.brand, category: v })} />
                </div>
              )}

              {active === "hero" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => patch("hero", { ...draft.hero, eyebrow: v })} />
                  <TextArea label="Headline" value={draft.hero.headline} onChange={(v) => patch("hero", { ...draft.hero, headline: v })} />
                  <TextArea label="Subheading" value={draft.hero.sub} onChange={(v) => patch("hero", { ...draft.hero, sub: v })} />
                  <Field label="Primary CTA" value={draft.hero.ctaPrimary} onChange={(v) => patch("hero", { ...draft.hero, ctaPrimary: v })} />
                  <Field label="Secondary CTA" value={draft.hero.ctaSecondary} onChange={(v) => patch("hero", { ...draft.hero, ctaSecondary: v })} />
                  <Field label="Tag line under CTAs" value={draft.hero.tag} onChange={(v) => patch("hero", { ...draft.hero, tag: v })} />
                </div>
              )}

              {active === "intro" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.intro.eyebrow} onChange={(v) => patch("intro", { ...draft.intro, eyebrow: v })} />
                  <TextArea label="Heading" value={draft.intro.heading} onChange={(v) => patch("intro", { ...draft.intro, heading: v })} />
                  <TextArea label="Body 1" value={draft.intro.body1} onChange={(v) => patch("intro", { ...draft.intro, body1: v })} />
                  <TextArea label="Body 2" value={draft.intro.body2} onChange={(v) => patch("intro", { ...draft.intro, body2: v })} />
                </div>
              )}

              {active === "capabilities" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.capabilities.eyebrow} onChange={(v) => patch("capabilities", { ...draft.capabilities, eyebrow: v })} />
                  <ListEditor
                    items={draft.capabilities.items}
                    fields={[{ key: "title", label: "Title" }, { key: "desc", label: "Description", multiline: true }]}
                    onChange={(items) => patch("capabilities", { ...draft.capabilities, items })}
                  />
                </div>
              )}

              {active === "process" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.process.eyebrow} onChange={(v) => patch("process", { ...draft.process, eyebrow: v })} />
                  <ListEditor
                    items={draft.process.steps}
                    fields={[{ key: "name", label: "Step" }, { key: "desc", label: "Description", multiline: true }]}
                    onChange={(steps) => patch("process", { ...draft.process, steps })}
                  />
                </div>
              )}

              {active === "work" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.work.eyebrow} onChange={(v) => patch("work", { ...draft.work, eyebrow: v })} />
                  <Field label="Project title" value={draft.work.title} onChange={(v) => patch("work", { ...draft.work, title: v })} />
                  <TextArea label="Description" value={draft.work.desc} onChange={(v) => patch("work", { ...draft.work, desc: v })} />
                  <Field label="CTA label" value={draft.work.cta} onChange={(v) => patch("work", { ...draft.work, cta: v })} />
                  <Field label="Tile initials" value={draft.work.initials} onChange={(v) => patch("work", { ...draft.work, initials: v })} />
                </div>
              )}

              {active === "philosophy" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.philosophy.eyebrow} onChange={(v) => patch("philosophy", { ...draft.philosophy, eyebrow: v })} />
                  <TextArea label="Heading (new line = line break)" value={draft.philosophy.heading} onChange={(v) => patch("philosophy", { ...draft.philosophy, heading: v })} />
                  <TextArea label="Body" value={draft.philosophy.body} onChange={(v) => patch("philosophy", { ...draft.philosophy, body: v })} />
                </div>
              )}

              {active === "future" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.future.eyebrow} onChange={(v) => patch("future", { ...draft.future, eyebrow: v })} />
                  <Field label="Heading" value={draft.future.heading} onChange={(v) => patch("future", { ...draft.future, heading: v })} />
                  <TextArea label="Body" value={draft.future.body} onChange={(v) => patch("future", { ...draft.future, body: v })} />
                </div>
              )}

              {active === "contact" && (
                <div className="space-y-5">
                  <Field label="Eyebrow" value={draft.contact.eyebrow} onChange={(v) => patch("contact", { ...draft.contact, eyebrow: v })} />
                  <Field label="Heading" value={draft.contact.heading} onChange={(v) => patch("contact", { ...draft.contact, heading: v })} />
                  <TextArea label="Subheading" value={draft.contact.sub} onChange={(v) => patch("contact", { ...draft.contact, sub: v })} />
                  <Field label="CTA label" value={draft.contact.cta} onChange={(v) => patch("contact", { ...draft.contact, cta: v })} />
                </div>
              )}

              {active === "footer" && (
                <div className="space-y-5">
                  <Field label="Copyright line" value={draft.footer.copyright} onChange={(v) => patch("footer", { ...draft.footer, copyright: v })} />
                </div>
              )}

              <div className="mt-12 border-t border-[#e6e5e1] pt-6">
                <button
                  onClick={resetAll}
                  disabled={saving}
                  className="text-[13px] font-medium text-[#b3413a] hover:underline disabled:opacity-50"
                >
                  Reset all content to defaults
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
