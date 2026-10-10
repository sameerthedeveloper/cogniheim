import { cn } from '../../lib/utils.js';

// Status is always written out; the dot only reinforces it.
const DOT = {
  Live: 'bg-accent',
  Prototype: 'border-2 border-accent',
  'In development': 'border-2 border-faint',
};

export function StatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-2 rounded-full', DOT[status])} />
      {status}
    </span>
  );
}
