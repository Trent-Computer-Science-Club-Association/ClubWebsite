import React from 'react';
import { Link } from 'next/link';

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  href?: string;
  className?: string;
  hoverColor?: string;
  padding?: [string, string];
  margin?: [string, string];
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  disabled = false,
  color = 'text-white',
  backgroundColor = 'bg-color-1',
  borderRadius = 'rounded-md',
  href,
  className,
  hoverColor = 'hover:bg-hover-1',
  padding = ['px-0', 'py-0'],
  margin = ['mx-0', 'my-0'],
}) => {
  // Runtime validation to ensure only label or children is provided
  if ((label && children) || (!label && !children)) {
    throw new Error(
      'Button component must have either a label or children, but not both.'
    );
  }

  // Destructure padding and margin tuples
  const [paddingX, paddingY] = padding;
  const [marginX, marginY] = margin;

  // Button content
  const content = (
    <span
      className={`${color} ${backgroundColor} ${borderRadius} ${hoverColor} ${paddingX} ${paddingY} ${marginX} ${marginY}`}
    >
      {label || children}
    </span>
  );

  return href ? (
    <Link href={href}>
      <a
        className={`${className}`}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {content}
      </a>
    </Link>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color} ${backgroundColor} ${borderRadius} ${hoverColor} ${paddingX} ${paddingY} ${marginX} ${marginY} ${className}`}
    >
      {label || children}
    </button>
  );
};

export default Button;
