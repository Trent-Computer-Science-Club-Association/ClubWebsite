import React from 'react';
import Image from '../components/Image';
import Button from '../components/Button';
import styles from '../styles/layouts/TextSection.module.scss';
import { type SectionStyle, getSectionStyling } from '../utils';
import { type TextSection } from '../config';

interface Props {
  section: TextSection;
  style: SectionStyle;
  className?: string;
}

const TextSection = ({
  section: { text, image, button },
  style,
  className,
}: Props) => {
  const sectionStyle = getSectionStyling(style);
  return (
    <div
      className={`${styles.container} ${className ?? ''} ${sectionStyle.backgroundColor}`}
    >
      <div className={styles.imageContainer}>
        <Image src={image.src} alt={image.alt} fill={true} />
      </div>
      <div className={styles.contentContainer}>
        <p>{text}</p>
        {button != undefined && (
          <Button href={button.href} label={button.text} />
        )}
      </div>
    </div>
  );
};

export default TextSection;
