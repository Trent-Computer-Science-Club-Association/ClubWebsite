import React from 'react';
import Link from 'next/link';
import styles from '../styles/Button.module.scss';
import Image from '../components/Image';

const ButtonType = {
  NAVBAR: styles.navBtn,
  NAVBAR_ACTIVE: [styles.navBtn, styles.active].join(' '),
  LIGHT: styles.lightBtn,
  SOCIAL: styles.socialBtn,
  SOCIAL_DARK: styles.socialBtnDark,
} as const;

type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
  type: ButtonType;
}

interface LabelProps extends Props {
  label: string;
  children?: never;
  icon?: never;
  altText?: never;
}

interface ChildrenProps extends Props {
  children: React.ReactNode;
  label?: never;
  icon?: never;
  altText?: never;
}

interface IconProps extends Props {
  icon: string;
  altText: string;
  children?: never;
  label?: never;
}

const Button: React.FC<LabelProps | ChildrenProps | IconProps> = ({
  onClick,
  href,
  className,
  type = ButtonType.NAVBAR,
  ...props
}) => {
  const classes = `${className} ${type} ${styles.button}`;
  const content = props.label || props.children || props.icon;

  if (props.icon) {
    return (
      // also include styles.iconContainer and classes
      <div className={`${styles.iconContainer} ${classes}`}>
        <Image src={props.icon} alt={props.altText} fill={true} />
      </div >
    );
  }

  return href ? (
    <Link href={href} className={classes} onClick={onClick}>
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
