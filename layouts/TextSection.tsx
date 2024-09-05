import React from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/layouts/TextSection.module.scss';
import { type TextSection } from '../config';

const TextSectionStyle = {
  primary: styles.primaryStyle,
  secondary: styles.secondaryStyle,
} as const;

type TextSectionStyleType =
  (typeof TextSectionStyle)[keyof typeof TextSectionStyle];

interface Props {
  section: TextSection;
  style?: TextSectionStyleType;
}

interface PropsWithButton extends Props {
  buttonText: string;
  link: string;
}

export default function TextSection({
  section: { text, image, button },
  style = TextSectionStyle.primary,
  ...props
}: Props | PropsWithButton) {
  return (
    <div className={styles.TextSectionWrapper}>
      <div className={`${styles.TextSection} ${style}`}>
        <div className={styles.ImageWrapper}>
          <Image
            src={image.src}
            alt={image.alt}
            fill={true}
            className={styles.TextSectionImage}
          />
        </div>
        <div className={styles.TextAndButton}>
          <p>{text}</p>
          {/* Checks if buttonText and link are in props in order to conditionally render a button */}
          {button != null && (
            <Button
              type={ButtonType.LIGHT}
              href={button.href}
              label={button.text}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { TextSectionStyle, type TextSectionStyleType };
