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
  image?: never;
}

interface IconProps extends Props {
  image: {
    src: string;
    altText: string;
  };
  label?: string;
}

const Button: React.FC<LabelProps | IconProps> = ({
  onClick,
  href = '',
  className,
  type = ButtonType.NAVBAR,
  ...props
}) => {
  const classes = `${className} ${type} ${styles.button}`;
  const content = props.label;
  if (props.image) {
    return (
      <Link
        className={`${styles.iconContainer} ${classes}`}
        href={href}
        onClick={onClick}
      >
        <div className={styles.imageWrapper}>
          <Image src={props.image.src} alt={props.image.altText} fill={true} />
        </div>
        {content && <span className={styles.buttonText}>{content}</span>}
      </Link>
    );
  }

  return href ? (
    <Link href={href} className={classes} onClick={onClick}>
      <span>{content}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
export { ButtonType };
