import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { variant = 'primary', className = '', children, ...props },
  ref
) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition';
  const variants = {
    primary: 'app-btn',
    ghost: 'app-btn-soft',
    outline: 'app-btn-soft'
  };

  return (
    <button ref={ref} className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
});

export default Button;
