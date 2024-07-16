// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import Button, { ButtonType } from './Button';
import { HeroIcons } from '../config.yaml';
import Image from '../components/Image';

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
        <Image src={imagePath} alt='TCSCA Logo' width={100} height={100} />
        <Button type={ButtonType.LIGHT}>Apply</Button>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.title}>
          Trent Computer Science Club Association
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tagline}>Where passion meets code</div>
        <div className={styles.socialMedia}>
          {HeroIcons.map((icon) => (
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
