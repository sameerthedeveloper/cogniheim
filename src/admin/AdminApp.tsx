import { useMemo, useState } from "react";
import { useContent } from "../content/ContentContext";
import type { SiteContent } from "../content/defaultContent";
import { useDocumentMeta, useNoIndex } from "../lib/useDocumentMeta";
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
  const { content, setContent, resetContent } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [active, setActive] = useState<SectionKey>("seo");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useNoIndex();
  useDocumentMeta("Admin · Cogniheim", "Content dashboard for the Cogniheim website.");

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  function patch<K extends SectionKey>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function save() {
    setContent(draft);
    setSavedAt(Date.now());
  }

  function discard() {
    setDraft(content);
  }

  function resetAll() {
    resetContent();
    setDraft(content);
  }

  return (
    <div className="admin-light min-h-screen bg-[#f7f7f5] text-[#141414]">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 flex-col border-r border-[#e6e5e1] bg-white px-5 py-7 md:flex">
          <div className="mb-8 flex items-center gap-2.5 px-1">
            <img src="/cogniheim-mark.svg" alt="" className="h-6 w-6" />
            <span className="text-[13px] font-semibold tracking-[0.14em]">
              COGNIHEIM
            </span>
          </div>
          <p className="mb-3 px-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a9a94]">
            Content
          </p>
          <nav className="flex flex-1 flex-col gap-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors ${
                  active === s.key
                    ? "bg-[#0f1110] text-white"
                    : "text-[#4a4a45] hover:bg-[#efeee9]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <a
            href="/"
            className="mt-6 rounded-lg border border-[#e6e5e1] px-3 py-2.5 text-center text-[13px] font-medium text-[#4a4a45] transition-colors hover:bg-[#efeee9]"
          >
            ← View site
          </a>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#e6e5e1] bg-white px-6 py-4 md:px-10">
            <div>
              <h1 className="text-[15px] font-semibold">
                {SECTIONS.find((s) => s.key === active)?.label}
              </h1>
              <p className="text-[12px] text-[#9a9a94]">
                Edits are saved to this browser only.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {savedAt && !dirty && (
                <span className="text-[12px] text-[#0f8f7c]">Saved</span>
              )}
              {dirty && (
                <button
                  onClick={discard}
                  className="rounded-full border border-[#e6e5e1] px-4 py-2 text-[13px] font-medium text-[#4a4a45] transition-colors hover:bg-[#efeee9]"
                >
                  Discard
                </button>
              )}
              <button
                onClick={save}
                disabled={!dirty}
                className="rounded-full bg-[#0f1110] px-5 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-30"
              >
                Save changes
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
            <div className="mx-auto max-w-2xl">
              {active === "seo" && (
                <div className="space-y-5">
                  <Field label="Page title (shown in browser tabs & search results)" value={draft.seo.title} onChange={(v) => patch("seo", { ...draft.seo, title: v })} />
                  <TextArea label="Meta description (search & social preview text)" value={draft.seo.description} onChange={(v) => patch("seo", { ...draft.seo, description: v })} />
                  <p className="text-[12px] leading-relaxed text-[#9a9a94]">
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
                  className="text-[13px] font-medium text-[#b3413a] hover:underline"
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
