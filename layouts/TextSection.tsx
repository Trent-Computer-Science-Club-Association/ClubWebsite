import React from 'react';
import Image from '../components/Image';
import Button from '../components/Button';
import styles from '../styles/layouts/TextSection.module.scss';
import { type TextSection } from '../config';

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
          <Button href={button.href} label={button.text} />
        )}
      </div>
    </div>
  );
};

export default TextSection;
