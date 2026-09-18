import { useState } from "react";
import { Plus, Trash2, Globe, Share2, Download, Upload, RotateCcw, Check, AlertCircle } from "lucide-react";
import type { SiteContent } from "../content/defaultContent";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  maxLength?: number;
  type?: string;
};

export function Field({ label, value, onChange, hint, maxLength, type = "text" }: FieldProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-neutral-800">{label}</span>
        {maxLength && (
          <span
            className={`text-[11px] font-mono ${
              value.length > maxLength ? "text-rose-500 font-semibold" : "text-neutral-600"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#dcdcd8] bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-600 focus:border-[#39b9b0] focus:ring-2 focus:ring-[#39b9b0]/15"
      />
      {hint && <p className="mt-1 text-[12px] text-neutral-700 leading-normal">{hint}</p>}
    </label>
  );
}

export function TextArea({ label, value, onChange, hint, maxLength, rows = 3 }: FieldProps & { rows?: number }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-neutral-800">{label}</span>
        {maxLength && (
          <span
            className={`text-[11px] font-mono ${
              value.length > maxLength ? "text-rose-500 font-semibold" : "text-neutral-600"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-y rounded-xl border border-[#dcdcd8] bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-neutral-900 shadow-sm outline-none transition-all placeholder:text-neutral-600 focus:border-[#39b9b0] focus:ring-2 focus:ring-[#39b9b0]/15"
      />
      {hint && <p className="mt-1 text-[12px] text-neutral-700 leading-normal">{hint}</p>}
    </label>
  );
}

type ListFieldSpec<T> = { key: keyof T; label: string; multiline?: boolean; hint?: string };

type ListEditorProps<T> = {
  title?: string;
  items: T[];
  fields: ListFieldSpec<T>[];
  onChange: (items: T[]) => void;
  newItemTemplate?: T;
};

export function ListEditor<T extends Record<string, string>>({
  title,
  items,
  fields,
  onChange,
  newItemTemplate,
}: ListEditorProps<T>) {
  function updateItem(index: number, key: keyof T, value: string) {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  function addItem() {
    const template =
      newItemTemplate ||
      (fields.reduce((acc, f) => {
        acc[f.key] = "" as unknown as T[keyof T];
        return acc;
      }, {} as T));
    onChange([...items, template]);
  }

  function removeItem(index: number) {
    if (items.length <= 1) return;
    const next = items.filter((_, i) => i !== index);
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative space-y-4 rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm transition-all hover:border-[#d2d1cb]"
        >
          <div className="flex items-center justify-between border-b border-[#f0efe9] pb-3">
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
              {title || "Item"} #{i + 1}
            </span>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </div>

          {fields.map((f) =>
            f.multiline ? (
              <TextArea
                key={String(f.key)}
                label={f.label}
                hint={f.hint}
                value={item[f.key] ?? ""}
                onChange={(v) => updateItem(i, f.key, v)}
              />
            ) : (
              <Field
                key={String(f.key)}
                label={f.label}
                hint={f.hint}
                value={item[f.key] ?? ""}
                onChange={(v) => updateItem(i, f.key, v)}
              />
            ),
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#c8c7c0] bg-white/70 px-4 py-3 text-[13px] font-semibold text-neutral-700 shadow-sm transition-all hover:border-[#39b9b0] hover:bg-[#39b9b0]/5 hover:text-[#18756e]"
      >
        <Plus size={16} />
        Add New {title || "Item"}
      </button>
    </div>
  );
}

export function GooglePreview({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[#39b9b0]" />
          <h3 className="text-[13px] font-semibold text-neutral-900">Google Search Result Preview</h3>
        </div>
        <span className="text-[11px] font-medium text-neutral-600">Simulated Desktop Snippet</span>
      </div>

      <div className="rounded-xl border border-[#ecebe6] bg-[#fdfdfc] p-4">
        <div className="flex items-center gap-2 text-[12px] text-[#202124]">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white">
            C
          </div>
          <div className="leading-none">
            <p className="font-medium text-neutral-800">Cogniheim</p>
            <p className="text-[11px] text-[#4d5156]">https://cogniheim.in</p>
          </div>
        </div>

        <h4 className="mt-2 text-[18px] font-medium leading-snug text-[#1a0dab] hover:underline cursor-pointer">
          {title || "Cogniheim — World of Thinkers"}
        </h4>
        <p className="mt-1 text-[13px] leading-normal text-[#4d5156]">
          {description || "Cogniheim is a technology and product studio..."}
        </p>
      </div>
    </div>
  );
}

export function SocialPreview({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-[#e5e4de] bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Share2 size={16} className="text-[#39b9b0]" />
        <h3 className="text-[13px] font-semibold text-neutral-900">Social Share Card (OpenGraph / Twitter)</h3>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#ecebe6] bg-[#fdfdfc]">
        <div className="relative aspect-[1200/630] max-h-48 w-full bg-neutral-950 overflow-hidden">
          <img src="/og-share.jpg" alt="Preview" className="h-full w-full object-cover opacity-90" />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">cogniheim.in</p>
          <h4 className="mt-1 text-[15px] font-semibold text-neutral-900 line-clamp-1">{title}</h4>
          <p className="mt-1 text-[12px] text-neutral-700 line-clamp-2 leading-normal">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function BackupTools({
  content,
  onRestore,
  onReset,
  disabled,
}: {
  content: SiteContent;
  onRestore: (imported: SiteContent) => void;
  onReset: () => void;
  disabled: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [restoreError, setRestoreError] = useState<string | null>(null);

  function downloadJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `cogniheim-content-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setRestoreError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.hero || !json.brand || !json.capabilities) {
          throw new Error("Invalid backup format. Missing core sections.");
        }
        onRestore(json as SiteContent);
      } catch (err) {
        setRestoreError(err instanceof Error ? err.message : "Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
        <h3 className="text-[15px] font-semibold text-neutral-900">Backup &amp; Export Content</h3>
        <p className="mt-1 text-[13px] text-neutral-700">
          Download a full JSON snapshot of all editable text, capabilities, and settings.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0f1110] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-neutral-800"
          >
            <Download size={16} />
            Download Backup (.json)
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(content, null, 2));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dcdcd8] bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50"
          >
            {copied ? <Check size={16} className="text-[#0f8f7c]" /> : <Share2 size={16} />}
            {copied ? "Copied to Clipboard" : "Copy JSON"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e5e4de] bg-white p-6 shadow-sm">
        <h3 className="text-[15px] font-semibold text-neutral-900">Restore from Backup</h3>
        <p className="mt-1 text-[13px] text-neutral-700">
          Upload a previously exported JSON backup to replace the current draft.
        </p>

        {restoreError && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-[13px] text-rose-700 border border-rose-200">
            <AlertCircle size={16} />
            {restoreError}
          </div>
        )}

        <div className="mt-5">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#c8c7c0] bg-neutral-50 px-4 py-3 text-[13px] font-medium text-neutral-700 transition-colors hover:border-[#39b9b0] hover:bg-[#39b9b0]/5 hover:text-[#18756e]">
            <Upload size={16} />
            Choose JSON file to restore
            <input type="file" accept=".json" onChange={handleFile} className="hidden" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
        <h3 className="text-[15px] font-semibold text-rose-800">Factory Reset</h3>
        <p className="mt-1 text-[13px] text-rose-700">
          Reset all content to the default factory content. This action can be reviewed before saving.
        </p>
        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-rose-700 disabled:opacity-50"
        >
          <RotateCcw size={15} />
          Reset All Content to Defaults
        </button>
      </div>
    </div>
  );
}
