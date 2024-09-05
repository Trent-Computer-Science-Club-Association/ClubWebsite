import React from 'react';
import styles from '../styles/components/TextBox.module.scss';
import Image from './Image';
import { type SocialIcon } from '../config';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  links?: SocialIcon[];
}

export default function TextBox({ title, description, links }: Props) {
  return (
    <div className={styles.TextBox}>
      <h2>{title}</h2>
      <p>{description}</p>
      {links && (
        <div className={styles.links}>
          {links.map((link, index) => (
            <Link key={index} href={link.link} target='_blank' rel='noreferrer'>
              <div className={styles.iconWrapper}>
                <Image src={link.path} alt={link.text} width={15} height={15} />
              </div>
              <span>{link.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
