import React from 'react';
import Image from '../components/Image';
import Button, { ButtonStyle } from '../components/Button';
import styles from '../styles/layouts/TextSection.module.scss';
import { TextSectionButton, type TextSection } from '../config';

const getButtonStyle = (buttonStyle: TextSectionButton): ButtonStyle => {
  switch (buttonStyle) {
    case TextSectionButton.Default:
      return ButtonStyle.Default;
    case TextSectionButton.Sponsor:
      return ButtonStyle.Sponsor;
  }
};

interface Props {
  section: TextSection;
  className?: string;
}

const TextSection = ({
  section: { text, image, button },
  className,
}: Props) => {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <div className={styles.imageContainer}>
        <Image src={image.src} alt={image.alt} fill={true} />
      </div>
      <div className={styles.contentContainer}>
        <p>{text}</p>
        {button != undefined && (
          <Button
            buttonStyle={getButtonStyle(button.style)}
            href={button.href}
            label={button.text}
          />
        )}
      </div>
    </div>
  );
};

export default TextSection;
