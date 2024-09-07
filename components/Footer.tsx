import styles from '../styles/components/Footer.module.scss';
import Button, { ButtonStyle, ButtonModifier } from '../components/Button';
import Link from 'next/link';
import { website_config, footer_config } from '../config';
import ReactMarkdown from 'react-markdown';
import Logo from '../components/Logo';

export default function Footer() {
  const { social_icons } = website_config;
  const { text } = footer_config;
  // ui
  return (
    <footer className={styles.container}>
      {/* Top section */}
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      {/* Left side */}
      <span>
        <Logo className={styles.logo} />
        <Link href={`mailto:${website_config.email}`}>
          {website_config.email}
        </Link>
      </span>
      {/* Right side */}
      <span className={styles.socialButtons}>
        {social_icons.map(({ alt_text, link, path }, i) => (
          <Button
            key={i}
            buttonStyle={ButtonStyle.Social}
            buttonModifiers={[ButtonModifier.Dark]}
            image={{ src: path, alt: alt_text }}
            href={link}
          />
        ))}
      </span>
    </footer>
  );
}
