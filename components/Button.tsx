import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  href,
  className,
}) => {
  // Runtime validation to ensure only label or children is provided
  if ((label && children) || (!label && !children)) {
    throw new Error(
      'Button component must have either a label or children, but not both.'
    );
  }


  return href ? (
    <Link href={href} prefetch={true}>
      <span className={`${className}`}>
        {label || children}
      </span>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${className}`}
    >
      {label || children}
    </button>
  );
};

export default Button;
