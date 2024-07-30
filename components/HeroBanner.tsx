// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import Button, { ButtonType } from './Button';
import { heroIcons, tagline } from '../config.yaml';
import Image from '../components/Image';
import Logo from '../components/Logo';


export default function HeroBanner() {
  return (
    <div className={styles.HeroBanner}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <Logo />
        <Button type={ButtonType.LIGHT}>Apply</Button>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <h1>Trent Computer Science Club Association</h1>
        <hr />
        <div className={styles.tagline}>{tagline}</div>
        <div className={styles.socialMedia}>
          {heroIcons.map((icon) => (
            <Button key={icon.altText} type={ButtonType.SOCIAL}>
              <Image
                key={icon.altText}
                src={icon.path}
                alt={icon.altText}
                width={100}
                height={100}
                className={styles.socialMedia}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
