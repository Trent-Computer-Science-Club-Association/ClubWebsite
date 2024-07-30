import styles from '../styles/components/Footer.module.scss';
import config from '../config.yaml';
// import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import Link from '../components/Link';
import { footer } from '../config.yaml';
import ReactMarkdown from 'react-markdown';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      {/* Top section */}
      <div className={styles.top}>
        <ReactMarkdown className={styles.text}>{footer.text}</ReactMarkdown>
      </div>
      {/* Left side */}
      <div className={styles.left}>
        <Button
          icon='/logo.svg'
          altText='TCSCA Logo'
          type={ButtonType.SOCIAL_DARK}
        />
        <Link href={`mailto:${config.email}`} className={styles.link}>
          {config.email}
        </Link>
      </div>
      {/* Right side */}
      <div className={styles.right}>
        <div className={styles.socialMedia}>
          {config.heroIcons.map((icon) => (
            <Button key={icon.altText} type={ButtonType.SOCIAL_DARK}>
              <Button
                icon={icon.path}
                altText={icon.altText}
                type={ButtonType.SOCIAL_DARK}
                href={icon.path}
                className={styles.socialMedia}
              />
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
