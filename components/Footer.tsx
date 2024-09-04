import React, { lazy, Suspense } from 'react';
import styles from '../styles/components/Footer.module.scss';
import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import { website_config, footer_config } from '../config';
import Logo from '../components/Logo';

const ReactMarkdown = lazy(() => import('react-markdown'));

export default function Footer() {
  const { social_icons } = website_config;
  const { text } = footer_config;

  // ui
  return (
    <footer className={styles.Footer}>
      {/* Top section */}
      <div className={styles.top}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactMarkdown className={styles.text}>{text}</ReactMarkdown>
        </Suspense>
      </div>
      {/* Left side */}
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link href={`mailto:${website_config.email}`} className={styles.link}>
          {website_config.email}
        </Link>
      </div>
      {/* Right side */}
      <div className={styles.right}>
        <div className={styles.socialMedia}>
          {social_icons.map(({ alt_text, link, path }, i) => (
            <Button
              key={i}
              image={{ src: path, altText: alt_text }}
              type={ButtonType.SOCIAL_DARK}
              href={link}
              className={styles.socialMedia}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
