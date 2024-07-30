import React from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/components/TextSection.module.scss';

const TextSectionStyle = {
  BLACK: 'bg-color-4',
  GREEN: 'bg-color-1',
};

type TextSectionStyleType =
  (typeof TextSectionStyle)[keyof typeof TextSectionStyle];

interface Props {
  imagePath: string;
  altText: string;
  text: string;
  style?: TextSectionStyleType;
}

interface PropsWithButton extends Props {
  buttonText: string;
  link: string;
}

// props or props with button
export default function TextSection({
  imagePath,
  altText,
  text,
  style = TextSectionStyle.BLACK,
  ...props
}: Props | PropsWithButton) {
  return (
    <div className={`${styles.TextSection} ${style}`}>
      <div className={styles.TextAndButton}>
        <p className={styles.TextSectionText}>{text}</p>
        {'buttonText' in props && 'link' in props && (
          <Button type={ButtonType.LIGHT} href={props.link}>
            {props.buttonText}
          </Button>
        )}
      </div>
      <Image
        src={imagePath}
        alt={altText}
        width={100}
        height={100}
        className={styles.TextSectionImage}
      />
    </div>
  );
}

export { TextSectionStyle };
