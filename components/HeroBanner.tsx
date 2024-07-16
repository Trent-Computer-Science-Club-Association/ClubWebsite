// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import Button from './Button';
import { HeroIcons } from '../config.yaml';
import Image from 'next/image';

interface Props {
  imagePath: string;
}

export default function HeroBanner({ imagePath }: Props) {
  if (!imagePath) {
    throw new Error('Image path is required');
  }

  return (
    <div className={styles.HeroBanner}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        {/* square with ./public/images/logo.svg in it */}
        {/* <img src={imagePath} alt="TCSCA Logo" /> */}
        <Image src={imagePath} alt="TCSCA Logo" width={100} height={100} />
        <Button>Apply</Button>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.title}>Trent Computer Science Club Association</div>
        <div className={styles.divider}></div>
        <div className={styles.tagline}>Where passion meets code</div>
        <div className={styles.socialMedia}>
          {HeroIcons.map((icon) => (
            <img src={icon.path} alt={icon.altText} key={icon.altText} />
          ))}
        </div>
      </div>
    </div>
  );
}
