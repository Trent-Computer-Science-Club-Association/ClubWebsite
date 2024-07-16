import React from 'react';
import Link from 'next/link';
import styles from '../styles/Button.module.scss';

enum ButtonType {
  NAVBAR = styles.navBtn,
  NAVBAR_ACTIVE = [styles.navBtn, styles.active].join(' '),
  LIGHT = styles.lightBtn,
  SOCIAL = styles.socialBtn,
}

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
  type: ButtonType;
  prefetch?: boolean;
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
  prefetch = false,
}) => {
  const classes = `${className} ${type} ${styles.button}`;
  const content = label || children;

  return href ? (
    <Link href={href} className={classes} onClick={onClick} prefetch={prefetch}>
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
