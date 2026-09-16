type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#4a4a45]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#e6e5e1] bg-white px-3.5 py-2.5 text-[14px] text-[#141414] outline-none transition-colors focus:border-[#39b9b0]"
      />
    </label>
  );
}

export function TextArea({ label, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#4a4a45]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-y rounded-lg border border-[#e6e5e1] bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-[#141414] outline-none transition-colors focus:border-[#39b9b0]"
      />
    </label>
  );
}

type ListFieldSpec<T> = { key: keyof T; label: string; multiline?: boolean };

type ListEditorProps<T> = {
  items: T[];
  fields: ListFieldSpec<T>[];
  onChange: (items: T[]) => void;
};

export function ListEditor<T extends Record<string, string>>({
  items,
  fields,
  onChange,
}: ListEditorProps<T>) {
  function updateItem(index: number, key: keyof T, value: string) {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="space-y-3 rounded-xl border border-[#e6e5e1] bg-white p-4"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9a94]">
            Item {i + 1}
          </p>
          {fields.map((f) =>
            f.multiline ? (
              <TextArea
                key={String(f.key)}
                label={f.label}
                value={item[f.key] ?? ""}
                onChange={(v) => updateItem(i, f.key, v)}
              />
            ) : (
              <Field
                key={String(f.key)}
                label={f.label}
                value={item[f.key] ?? ""}
                onChange={(v) => updateItem(i, f.key, v)}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
