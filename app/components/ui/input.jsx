import { cn } from '../../lib/utils.js';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-faint transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
        className
      )}
      {...props}
    />
  );
}
