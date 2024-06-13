// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import { HeroIcons } from '../config.yaml';

// left and right column, right side taking up 2/3 of the space
interface Props {
  imagePath: string;
}

export default function HeroBanner({ imagePath }: Props) {

  if (!imagePath) {
    throw new Error('Image path is required');
  }

  return (
    <div className={styles.HeroBanner}>
      {/* 2 columns, 1 on the left and 1 on the right */}
      < div className={styles.leftColumn} >
        <h1 className={styles.title}>Trent Computer Science Club Association</h1>
        <div className={styles.divider}></div>
        <p className={styles.tagLine}>Where Innovation Happens</p>
      </div >
      {/* Right column */}
      < div className={styles.rightColumn} >
        <img src={imagePath} alt="Hero Banner" />
        <div className={styles.socials}>
          {HeroIcons.map((icon: { link: string, altText: string, path: string }, index: number) => (
            <a key={index} href={icon.link} className={styles.socialIcon} >
              <img src={icon.path} alt={icon.altText} />
            </a>
          ))}
        </div>
      </div >
    </div >
  );
}
