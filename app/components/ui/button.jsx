import { cn } from '../../lib/utils.js';

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-surface-2 text-ink hover:bg-line',
  ghost: 'text-accent hover:opacity-70',
  invert: 'bg-white text-noir hover:bg-surface-2',
};

const sizes = {
  default: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-[17px]',
};

export function Button({ as: Comp = 'button', variant = 'primary', size = 'default', className, children, ...props }) {
  return (
    <Comp
      className={cn(
        'magnetic inline-flex items-center justify-center gap-1.5 rounded-full font-medium tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
