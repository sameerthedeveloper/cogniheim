export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="ch-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/cogniheim-mark.svg" alt="" className="h-5 w-5" />
            <span className="font-display text-[14px] font-medium tracking-[0.16em] text-text">
              COGNIHEIM
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">World of Thinkers.</p>
          <p className="mt-1 text-sm text-muted/70">
            Technology &amp; Product Studio
          </p>
        </div>

        <p className="text-sm text-muted/60">
          © {new Date().getFullYear()} Cogniheim. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
