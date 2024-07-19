import React from 'react';
import { aboutUs } from '../config.yaml';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
// css
import styles from '../styles/components/AboutUs.module.scss';

export default function AboutUs() {
  return (
    <div className={styles.AboutUs}>
      <div className={styles.TextAndButton}>
        <p className={styles.AboutUsText}>{aboutUs.text}</p>
        <Button type={ButtonType.LIGHT} className={styles.AboutUsButton}>
          Learn More
        </Button>
      </div>
      <Image
        src={aboutUs.image}
        alt={aboutUs.altText}
        width={100}
        height={100}
        className={styles.AboutUsImage}
      />
    </div>
  );
}
