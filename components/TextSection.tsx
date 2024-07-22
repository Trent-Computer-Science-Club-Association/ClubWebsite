import React from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/components/TextSection.module.scss';

interface Props {
  imagePath: string;
  altText: string;
  text: string;
}

interface PropsWithButton extends Props {
  buttonText: string;
  link: string;
}

// props or props with button
export default function TextSection(props: Props | PropsWithButton) {
  return (
    <div className={styles.AboutUs}>
      <div className={styles.TextAndButton}>
        <p className={styles.AboutUsText}>{props.text}</p>
        {'buttonText' in props && 'link' in props && (
          <Button type={ButtonType.LIGHT} href={props.link}>
            {props.buttonText}
          </Button>
        )}
      </div>
      <Image
        src={props.imagePath}
        alt={props.altText}
        width={100}
        height={100}
        className={styles.AboutUsImage}
      />
    </div>
  );
}
