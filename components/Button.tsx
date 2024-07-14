import React from 'react';
import Link from 'next/link';

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
}

interface LabelProps extends Props {
  label: string;
}

interface ChildrenProps extends Props {
  children: React.ReactNode;
}

const Button: React.FC<LabelProps | ChildrenProps> = ({
  label,
  children,
  onClick,
  href,
  className,
}) => {
  return href ? (
    <Link href={href}>
      <span className={`${className}`}>{label || children}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={`${className}`}>
      {label || children}
    </button>
  );
};

export default Button;
