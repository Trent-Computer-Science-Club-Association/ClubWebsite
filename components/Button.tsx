import React from 'react';
import Link from 'next/link';
import styles from '../styles/Button.module.scss';

enum ButtonType {
  NAVBAR = styles.navBtn,
  LIGHT = styles.lightBtn,
  SOCIAL = styles.socialBtn,
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
  type = ButtonType.NAVBAR,
}) => {
  const classes = `${className} ${type}`;
  const content = label || children;

  return href ? (
    <Link href={href} className={classes}>
      <span> {content} </span>
    </Link>
  ) : (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
export { ButtonType };
