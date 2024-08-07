// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import Button, { ButtonType } from './Button';
import { heroIcons, tagline } from '../config.yaml';
import Logo from '../components/Logo';

export default function HeroBanner() {
  return (
    <div className={styles.HeroBanner}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <Logo />
        <Button type={ButtonType.LIGHT} label='Apply' />
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <h1>Trent Computer Science Club Association</h1>
        <hr />
        <div className={styles.tagline}>{tagline}</div>
        <div className={styles.socialMedia}>
          {heroIcons.map((icon) => (
            <Button
              key={icon.altText}
              type={ButtonType.SOCIAL}
              image={{ src: icon.path, altText: icon.altText }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
