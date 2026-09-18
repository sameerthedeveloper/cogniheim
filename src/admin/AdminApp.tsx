import { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseAuth";
import { useContent } from "../content/ContentContext";
import type { SiteContent } from "../content/defaultContent";
import { useDocumentMeta, useNoIndex } from "../lib/useDocumentMeta";
import { useAuth } from "./useAuth";
import { Login } from "./Login";
import { Field, TextArea, ListEditor, GooglePreview, SocialPreview, BackupTools } from "./fields";
import {
  LayoutDashboard,
  Search,
  Tag,
  Sparkles,
  FileText,
  Layers,
  CheckCircle2,
  Briefcase,
  BookOpen,
  Rocket,
  Mail,
  Sliders,
  Database,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Save,
  Check,
} from "lucide-react";

type SectionKey =
  | "dashboard"
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
  | "footer"
  | "backup";

interface SectionMeta {
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category?: string;
}

const SECTIONS: SectionMeta[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "seo", label: "SEO & Search Preview", icon: Search },
  { key: "brand", label: "Brand Identity", icon: Tag },
  { key: "hero", label: "Hero Section", icon: Sparkles },
  { key: "intro", label: "Studio Intro", icon: FileText },
  { key: "capabilities", label: "Capabilities", icon: Layers },
  { key: "process", label: "Process Steps", icon: CheckCircle2 },
  { key: "work", label: "Selected Work", icon: Briefcase },
  { key: "philosophy", label: "Philosophy", icon: BookOpen },
  { key: "future", label: "Product Studio", icon: Rocket },
  { key: "contact", label: "Contact Info", icon: Mail },
  { key: "footer", label: "Footer & Copyright", icon: Sliders },
  { key: "backup", label: "Backup & Data", icon: Database },
];

export function AdminApp() {
  useNoIndex();
  useDocumentMeta("Admin · Cogniheim", "Content & SEO management dashboard for Cogniheim.");

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#070808]">
        <img src="/logo.png" alt="Cogniheim" className="h-10 w-auto object-contain animate-pulse" />
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
  const { content, setContent, resetContent, loading: contentLoading, error: syncError } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [active, setActive] = useState<SectionKey>("dashboard");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const lastSynced = useRef(content);

  // Adopt live Firestore content into the draft as long as the admin hasn't
  // made unsaved edits since the last sync
  useEffect(() => {
    if (JSON.stringify(draft) === JSON.stringify(lastSynced.current)) {
      setDraft(content);
    }
    lastSynced.current = content;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await setContent(draft);
      setSavedAt(Date.now());
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save to Firestore. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    setDraft(content);
  }

  async function handleResetAll() {
    if (!window.confirm("Are you sure you want to reset all site content back to factory defaults?")) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await resetContent();
      setSavedAt(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't reset content. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Keyboard shortcut: Cmd+S or Ctrl+S to save
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (dirty && !saving) {
          save();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dirty, saving, draft]);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#141414] antialiased flex flex-col md:flex-row">
      {/* Mobile Top App Bar */}
      <div className="flex h-16 items-center justify-between border-b border-[#e5e4de] bg-[#0c0d0d] px-5 md:hidden">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Cogniheim" className="h-8 w-auto object-contain" />
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#39b9b0]">
            Admin
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.08] bg-[#0c0d0d] p-5 shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Cogniheim" className="h-9 w-auto object-contain" />
            <span className="rounded-md border border-[#39b9b0]/30 bg-[#39b9b0]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#39b9b0]">
              Studio v1.2
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-1 text-white/50 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-2 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Management</p>
        </div>

        {/* Nav Items List */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                onClick={() => {
                  setActive(s.key);
                  setIsMobileOpen(false);
                }}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-white/[0.1] text-white shadow-sm border border-white/[0.08]"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={17}
                    className={isActive ? "text-[#39b9b0]" : "text-white/40 group-hover:text-white/70"}
                  />
                  <span>{s.label}</span>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39b9b0] shadow-[0_0_8px_#39b9b0]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info & links */}
        <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-4">
          <div className="flex items-center justify-between px-2">
            <p className="truncate text-[11.5px] font-mono tracking-tight text-white/40">{userEmail}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#0f8f7c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f8f7c] animate-pulse" />
              Live
            </span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13px] font-medium text-white/80 transition-all hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
          >
            <ExternalLink size={14} />
            View Live Site
          </a>

          <button
            onClick={() => signOut(auth)}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium text-rose-400/90 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-h-screen">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e5e4de] bg-white/95 px-6 py-4 shadow-sm backdrop-blur-md md:px-10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[16px] font-semibold text-neutral-900">
                {SECTIONS.find((s) => s.key === active)?.label}
              </h1>
              {dirty && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                  Unsaved Edits
                </span>
              )}
            </div>
            <p className="text-[12px] text-neutral-600">
              {contentLoading
                ? "Syncing with Firestore…"
                : syncError
                ? `Sync issue: ${syncError}`
                : "Real-time sync connected with Firestore."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {error && <span className="text-[12px] text-rose-600 font-medium">{error}</span>}

            {showSavedToast && (
              <span className="inline-flex items-center gap-1 text-[12px] text-[#0f8f7c] font-medium">
                <Check size={14} />
                Saved!
              </span>
            )}

            {dirty && (
              <button
                onClick={discard}
                className="rounded-full border border-[#d8d7d2] bg-white px-4 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Discard
              </button>
            )}

            <button
              onClick={save}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-5 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-black disabled:opacity-35"
              title="Shortcut: Cmd+S / Ctrl+S"
            >
              <Save size={15} />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Tab Contents */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
          <div className="mx-auto max-w-3xl pb-16">
            {/* 1. DASHBOARD OVERVIEW */}
            {active === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Studio Overview</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Live metrics, content health status, and quick control tools.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div
                    onClick={() => setActive("capabilities")}
                    className="cursor-pointer rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm transition-all hover:border-[#39b9b0] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-[12px] font-semibold uppercase tracking-wider">Capabilities</span>
                      <div className="rounded-lg bg-[#39b9b0]/10 p-2 text-[#1f8e88]">
                        <Layers size={18} />
                      </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-neutral-900">{draft.capabilities.items.length}</p>
                    <p className="mt-1 text-[11px] text-neutral-600">Items offered</p>
                  </div>

                  <div
                    onClick={() => setActive("process")}
                    className="cursor-pointer rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm transition-all hover:border-[#39b9b0] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-[12px] font-semibold uppercase tracking-wider">Process</span>
                      <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-neutral-900">{draft.process.steps.length}</p>
                    <p className="mt-1 text-[11px] text-neutral-600">Phases defined</p>
                  </div>

                  <div
                    onClick={() => setActive("seo")}
                    className="cursor-pointer rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm transition-all hover:border-[#39b9b0] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-[12px] font-semibold uppercase tracking-wider">SEO Title</span>
                      <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                        <Search size={18} />
                      </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-neutral-900">
                      {draft.seo.title ? "Optimized" : "Empty"}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-600">{draft.seo.title.length} chars</p>
                  </div>

                  <div
                    onClick={() => setActive("work")}
                    className="cursor-pointer rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm transition-all hover:border-[#39b9b0] hover:shadow-md"
                  >
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-[12px] font-semibold uppercase tracking-wider">Featured Work</span>
                      <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                        <Briefcase size={18} />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-neutral-900 truncate">{draft.work.title}</p>
                    <p className="mt-1 text-[11px] text-neutral-600">Current case study</p>
                  </div>
                </div>

                {/* Quick Action Shortcuts */}
                <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-neutral-900">Quick Shortcuts</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <button
                      onClick={() => setActive("seo")}
                      className="flex items-center gap-3 rounded-xl border border-[#ecebe6] p-3 text-left transition-colors hover:border-[#39b9b0] hover:bg-[#39b9b0]/5"
                    >
                      <Search size={18} className="text-[#39b9b0]" />
                      <div>
                        <p className="text-[13px] font-semibold text-neutral-900">Configure SEO</p>
                        <p className="text-[11px] text-neutral-600">Google SERP previews</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActive("hero")}
                      className="flex items-center gap-3 rounded-xl border border-[#ecebe6] p-3 text-left transition-colors hover:border-[#39b9b0] hover:bg-[#39b9b0]/5"
                    >
                      <Sparkles size={18} className="text-[#39b9b0]" />
                      <div>
                        <p className="text-[13px] font-semibold text-neutral-900">Hero Section</p>
                        <p className="text-[11px] text-neutral-600">Headlines &amp; CTAs</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActive("backup")}
                      className="flex items-center gap-3 rounded-xl border border-[#ecebe6] p-3 text-left transition-colors hover:border-[#39b9b0] hover:bg-[#39b9b0]/5"
                    >
                      <Database size={18} className="text-[#39b9b0]" />
                      <div>
                        <p className="text-[13px] font-semibold text-neutral-900">Export Backup</p>
                        <p className="text-[11px] text-neutral-600">Download site JSON</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* System Status Panel */}
                <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-neutral-900">Database &amp; Sync Status</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Connected to Firestore
                    </span>
                  </div>
                  <p className="text-[13px] text-neutral-600">
                    Content is automatically stored in the <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[12px]">site/content</code> Firestore document. Edits take effect live across visitor browsers.
                  </p>
                  {savedAt && (
                    <p className="text-[12px] font-mono text-neutral-600">
                      Last published: {new Date(savedAt).toLocaleTimeString()} on {new Date(savedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 2. SEO & SEARCH PREVIEW */}
            {active === "seo" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Search Engine Optimization (SEO)</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Manage title tags, meta descriptions, and simulate real-time Google search snippets.
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field
                    label="Page Title Tag"
                    value={draft.seo.title}
                    onChange={(v) => patch("seo", { ...draft.seo, title: v })}
                    maxLength={60}
                    hint="Appears in browser tabs and as the clickable link in Google search results (recommended: 50–60 characters)."
                  />

                  <TextArea
                    label="Meta Description"
                    value={draft.seo.description}
                    onChange={(e) => patch("seo", { ...draft.seo, description: e })}
                    maxLength={160}
                    rows={3}
                    hint="Shown under the title in search engine results and social previews (recommended: 120–160 characters)."
                  />
                </div>

                {/* Google Search Live Preview */}
                <GooglePreview title={draft.seo.title} description={draft.seo.description} />

                {/* Social Card Preview */}
                <SocialPreview title={draft.seo.title} description={draft.seo.description} />
              </div>
            )}

            {/* 3. BRAND IDENTITY */}
            {active === "brand" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Brand Identity</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Studio name, primary category, and global brand tagline.
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Brand Name" value={draft.brand.name} onChange={(v) => patch("brand", { ...draft.brand, name: v })} />
                  <Field label="Brand Tagline" value={draft.brand.tagline} onChange={(v) => patch("brand", { ...draft.brand, tagline: v })} hint="e.g. World of Thinkers." />
                  <Field label="Category / Positioning" value={draft.brand.category} onChange={(v) => patch("brand", { ...draft.brand, category: v })} hint="e.g. Technology & Product Studio" />
                </div>
              </div>
            )}

            {/* 4. HERO SECTION */}
            {active === "hero" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Hero Section</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Main landing viewport headlines, subtexts, and primary calls-to-action.
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Eyebrow Tag" value={draft.hero.eyebrow} onChange={(v) => patch("hero", { ...draft.hero, eyebrow: v })} />
                  <TextArea label="Main Headline" value={draft.hero.headline} onChange={(v) => patch("hero", { ...draft.hero, headline: v })} rows={3} />
                  <TextArea label="Subheading" value={draft.hero.sub} onChange={(v) => patch("hero", { ...draft.hero, sub: v })} rows={3} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Primary CTA Label" value={draft.hero.ctaPrimary} onChange={(v) => patch("hero", { ...draft.hero, ctaPrimary: v })} />
                    <Field label="Secondary CTA Label" value={draft.hero.ctaSecondary} onChange={(v) => patch("hero", { ...draft.hero, ctaSecondary: v })} />
                  </div>
                  <Field label="Bottom Tagline (under buttons)" value={draft.hero.tag} onChange={(v) => patch("hero", { ...draft.hero, tag: v })} />
                </div>
              </div>
            )}

            {/* 5. INTRO SECTION */}
            {active === "intro" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Intro Section</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">Opening editorial statement and studio manifesto.</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Eyebrow" value={draft.intro.eyebrow} onChange={(v) => patch("intro", { ...draft.intro, eyebrow: v })} />
                  <TextArea label="Heading" value={draft.intro.heading} onChange={(v) => patch("intro", { ...draft.intro, heading: v })} rows={2} />
                  <TextArea label="Paragraph 1" value={draft.intro.body1} onChange={(v) => patch("intro", { ...draft.intro, body1: v })} rows={3} />
                  <TextArea label="Paragraph 2" value={draft.intro.body2} onChange={(v) => patch("intro", { ...draft.intro, body2: v })} rows={3} />
                </div>
              </div>
            )}

            {/* 6. CAPABILITIES (Interactive List) */}
            {active === "capabilities" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Capabilities &amp; Services</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Add, edit, and organize the services displayed on the interactive grid.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field
                    label="Section Eyebrow"
                    value={draft.capabilities.eyebrow}
                    onChange={(v) => patch("capabilities", { ...draft.capabilities, eyebrow: v })}
                  />
                </div>

                <ListEditor
                  title="Capability"
                  items={draft.capabilities.items}
                  fields={[
                    { key: "title", label: "Capability Title" },
                    { key: "desc", label: "Description", multiline: true },
                  ]}
                  onChange={(items) => patch("capabilities", { ...draft.capabilities, items })}
                  newItemTemplate={{ title: "New Service", desc: "Description of the capability." }}
                />
              </div>
            )}

            {/* 7. PROCESS STEPS (Interactive List) */}
            {active === "process" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Process &amp; Methodology</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    The steps that illustrate how Cogniheim turns problems into software.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field
                    label="Section Eyebrow"
                    value={draft.process.eyebrow}
                    onChange={(v) => patch("process", { ...draft.process, eyebrow: v })}
                  />
                </div>

                <ListEditor
                  title="Phase"
                  items={draft.process.steps}
                  fields={[
                    { key: "name", label: "Phase Name (e.g. Think, Design)" },
                    { key: "desc", label: "Phase Summary", multiline: true },
                  ]}
                  onChange={(steps) => patch("process", { ...draft.process, steps })}
                  newItemTemplate={{ name: "New Phase", desc: "Description of the methodology step." }}
                />
              </div>
            )}

            {/* 8. SELECTED WORK */}
            {active === "work" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Selected Work (Case Study)</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Featured project showcase with 3D tilt interaction card.
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Section Eyebrow" value={draft.work.eyebrow} onChange={(v) => patch("work", { ...draft.work, eyebrow: v })} />
                  <Field label="Project Title" value={draft.work.title} onChange={(v) => patch("work", { ...draft.work, title: v })} />
                  <TextArea label="Project Summary" value={draft.work.desc} onChange={(v) => patch("work", { ...draft.work, desc: v })} rows={3} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Action Button Label" value={draft.work.cta} onChange={(v) => patch("work", { ...draft.work, cta: v })} />
                    <Field label="Card Monogram / Initials" value={draft.work.initials} onChange={(v) => patch("work", { ...draft.work, initials: v })} hint="e.g. CF" />
                  </div>
                </div>
              </div>
            )}

            {/* 9. PHILOSOPHY */}
            {active === "philosophy" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Philosophy</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">Core studio convictions and way of thinking.</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Eyebrow" value={draft.philosophy.eyebrow} onChange={(v) => patch("philosophy", { ...draft.philosophy, eyebrow: v })} />
                  <TextArea
                    label="Heading (New line creates visual break)"
                    value={draft.philosophy.heading}
                    onChange={(v) => patch("philosophy", { ...draft.philosophy, heading: v })}
                    rows={3}
                  />
                  <TextArea label="Body Statement" value={draft.philosophy.body} onChange={(v) => patch("philosophy", { ...draft.philosophy, body: v })} rows={4} />
                </div>
              </div>
            )}

            {/* 10. PRODUCT STUDIO */}
            {active === "future" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Product Studio (Future)</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">The incubator and internal ventures initiative.</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Eyebrow" value={draft.future.eyebrow} onChange={(v) => patch("future", { ...draft.future, eyebrow: v })} />
                  <Field label="Heading" value={draft.future.heading} onChange={(v) => patch("future", { ...draft.future, heading: v })} />
                  <TextArea label="Body Paragraph" value={draft.future.body} onChange={(v) => patch("future", { ...draft.future, body: v })} rows={4} />
                </div>
              </div>
            )}

            {/* 11. CONTACT INFO */}
            {active === "contact" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Contact Section</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">Inquiry headline, call-to-action, and conversation prompt.</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Eyebrow" value={draft.contact.eyebrow} onChange={(v) => patch("contact", { ...draft.contact, eyebrow: v })} />
                  <Field label="Main Heading" value={draft.contact.heading} onChange={(v) => patch("contact", { ...draft.contact, heading: v })} />
                  <TextArea label="Subheading" value={draft.contact.sub} onChange={(v) => patch("contact", { ...draft.contact, sub: v })} rows={2} />
                  <Field label="CTA Button Text" value={draft.contact.cta} onChange={(v) => patch("contact", { ...draft.contact, cta: v })} />
                </div>
              </div>
            )}

            {/* 12. FOOTER */}
            {active === "footer" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Footer Settings</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">Copyright statement and legal lines.</p>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
                  <Field label="Copyright Line" value={draft.footer.copyright} onChange={(v) => patch("footer", { ...draft.footer, copyright: v })} />
                </div>
              </div>
            )}

            {/* 13. BACKUP & TOOLS */}
            {active === "backup" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-neutral-900">Data Management &amp; Backups</h2>
                  <p className="mt-1 text-[13px] text-neutral-600">
                    Export JSON backups, restore previous iterations, or reset factory defaults.
                  </p>
                </div>

                <BackupTools
                  content={draft}
                  onRestore={(imported) => {
                    setDraft(imported);
                    alert("Backup loaded into draft! Click 'Save Changes' at the top to publish.");
                  }}
                  onReset={handleResetAll}
                  disabled={saving}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
