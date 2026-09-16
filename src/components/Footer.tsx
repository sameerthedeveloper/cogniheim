import { useContent } from "../content/ContentContext";

export function Footer() {
  const { content } = useContent();
  const { brand, footer } = content;

  return (
    <footer className="relative border-t border-line py-14">
      <div className="ch-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/cogniheim-mark.svg" alt="" className="h-5 w-5" />
            <span className="font-display text-[14px] font-medium tracking-[0.16em] text-text">
              {brand.name}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{brand.tagline}</p>
          <p className="mt-1 text-sm text-muted/70">{brand.category}</p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-sm text-muted/60">{footer.copyright}</p>
          <a
            href="/admin"
            className="text-xs text-muted/40 underline-offset-2 transition-colors hover:text-muted hover:underline"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
