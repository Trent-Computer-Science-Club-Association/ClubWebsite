import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Button.module.scss';
import Image from '../components/Image';
import { type ImageDescription } from '../config';

export enum ButtonStyle {
  // Regular
  Default,
  // Social
  Social,
  // Navbar
  NavButton,
  NavToggle,
}
const getButtonStyle = (buttonStyle: ButtonStyle) => {
  switch (buttonStyle) {
    // Regular
    case ButtonStyle.Default:
      return [styles.default];
    // Social
    case ButtonStyle.Social:
      return [styles.social];
    // Navbar
    case ButtonStyle.NavButton:
      return [styles.nav];
    case ButtonStyle.NavToggle:
      return [styles.navToggle];
  }
};

/**
 * A list of possible button modifiers.
 */
export enum ButtonModifier {
  /**
   * Uses the active variant of the button if available.
   */
  Active,
  /**
   * Uses the dark variant of the button if available.
   */
  Dark,
}
const getButtonModifiers = (buttonModifiers: ButtonModifier[]) => {
  const modifierStyles: string[] = [];
  for (const modifier of buttonModifiers) {
    switch (modifier) {
      case ButtonModifier.Active:
        modifierStyles.push(styles.active);
        break;
      case ButtonModifier.Dark:
        modifierStyles.push(styles.dark);
        break;
    }
  }
  return modifierStyles;
};

interface Props {
  buttonStyle?: ButtonStyle;
  buttonModifiers?: ButtonModifier[];
  className?: string;
  onClick?: () => void;
  href?: string;
}

interface LabelProps extends Props {
  label: string;
  image?: never;
}
interface IconProps extends Props {
  image: ImageDescription;
  label?: string;
}

const Button = ({
  onClick,
  href = '',
  className,
  buttonStyle = ButtonStyle.Default,
  buttonModifiers = [],
  label,
  image,
}: LabelProps | IconProps) => {
  // Get Styles
  const classes = [
    className,
    styles.container,
    ...getButtonStyle(buttonStyle),
    ...getButtonModifiers(buttonModifiers),
  ].join(' ');
  // Build Content
  const content = [];
  if (image != undefined) {
    content.push(
      <div key='button-image'>
        <Image src={image.src} alt={image.alt} fill={true} />
      </div>
    );
  }
  if (label != undefined) {
    content.push(
      <span className={styles.buttonText} key='button-content'>
        {label}
      </span>
    );
  }
  // Wrap Component
  return href ? (
    <Link className={classes} href={href} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
