import React from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/layouts/TextSection.module.scss';

const TextSectionStyle = {
  primary: styles.primaryStyle,
  secondary: styles.secondaryStyle,
} as const;

type TextSectionStyleType =
  (typeof TextSectionStyle)[keyof typeof TextSectionStyle];

interface Props {
  imagePath: string;
  altText: string;
  text: string;
  title?: string;
  style?: TextSectionStyleType;
}

interface PropsWithButton extends Props {
  buttonText: string;
  link: string;
}

export default function TextSection({
  imagePath,
  altText,
  title,
  text,
  style = TextSectionStyle.primary,
  ...props
}: Props | PropsWithButton) {
  return (
    <div className={styles.TextSectionWrapper}>
      <div className={`${styles.TextSection} ${style}`}>
        <div className={styles.TextAndButton}>
          {title && <h2>{title}</h2>}
          <p>{text}</p>
          {/* Checks if buttonText and link are in props in order to conditionally render a button */}
          {'buttonText' in props && 'link' in props && (
            <Button
              type={ButtonType.LIGHT}
              href={props.link}
              label={props.buttonText}
            />
          )}
        </div>
        <div className={styles.ImageWrapper}>
          <Image
            src={imagePath}
            alt={altText}
            fill={true}
            className={styles.TextSectionImage}
          />
        </div>
      </div>
    </div>
  );
}

export { TextSectionStyle, type TextSectionStyleType };
