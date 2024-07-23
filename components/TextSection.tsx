import React from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/components/TextSection.module.scss';

enum TextSectionStyle {
  BLACK,
  GREEN,
}

interface Props {
  imagePath: string;
  altText: string;
  text: string;
  style?: TextSectionStyle;
}

interface PropsWithButton extends Props {
  buttonText: string;
  link: string;
}

// props or props with button
export default function TextTextSection({
  imagePath,
  altText,
  text,
  style = TextSectionStyle.BLACK,
  ...props
}: Props | PropsWithButton) {
  let backgroundColor: string;

  switch (style) {
    case TextSectionStyle.BLACK:
      backgroundColor = 'bg-color-4';
      break;
    case TextSectionStyle.GREEN:
      backgroundColor = 'bg-color-1';
      break;
  }

  return (
    <div className={`${styles.AboutUs} ${backgroundColor}`}>
      <div className={styles.TextAndButton}>
        <p className={styles.AboutUsText}>{text}</p>
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
        className={styles.AboutUsImage}
      />
    </div>
  );
}

export { TextSectionStyle };
