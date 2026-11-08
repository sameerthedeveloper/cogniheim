import { cn } from '../../lib/utils.js';

// Status is always written out; the dot only reinforces it.
const DOT = {
  Live: 'bg-accent',
  Prototype: 'border-2 border-accent',
  Planning: 'border-2 border-dashed border-faint',
  'In development': 'border-2 border-faint',
};

export function StatusBadge({ status, className = '', pulse = false }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('relative size-2 rounded-full', DOT[status])}>
        {pulse && status === 'Live' && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
        )}
      </span>
      {status}
    </span>
  );
}
