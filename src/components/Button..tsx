import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  const className = `btn ${
    variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  }`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
        <ArrowRight size={17} />
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
      <ArrowRight size={17} />
    </button>
  );
}