import React from 'react';
import styles from '../styles/components/TextBox.module.scss';
import Image from './Image';

interface Props {
  title: string;
  description: string;
  links?: { icon: string; link: string; text: string }[];
}

export default function TextBox({ title, description, links }: Props) {
  return (
    <div className={styles.TextBox}>
      <h2>{title}</h2>
      <p>{description}</p>
      {links && (
        <div className={styles.links}>
          {links.map((link, index) => (
            <a key={index} href={link.link} target='_blank' rel='noreferrer'>
              <div className={styles.iconWrapper}>
                <Image src={link.icon} alt={link.link} width={15} height={15} />
              </div>
              <span>{link.text}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
