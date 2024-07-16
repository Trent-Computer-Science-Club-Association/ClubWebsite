import React from 'react';
import Link from 'next/link';

enum ButtonType {
  NAVBAR = '',
  LIGHT = 'light-btn',
  SOCIAL = 'social-btn',
}

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
  type: ButtonType;
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
  type,
}) => {
  return href ? (
    <Link href={href}>
      <span className={`${className} ${type}`}>{label || children}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={`${className} ${type}`}>
      {label || children}
    </button>
  );
};

export default Button;
