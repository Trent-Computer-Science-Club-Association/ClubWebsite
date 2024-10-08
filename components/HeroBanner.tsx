// CSS
import styles from '../styles/components/HeroBanner.module.scss';
import Button, { ButtonStyle } from './Button';
import Logo from '../components/Logo';
import { website_config } from '../config';

export default function HeroBanner() {
  const { title, social_icons, tagline } = website_config;
  // ui
  return (
    <div className={styles.HeroBanner}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <Logo priority={true} className={styles.logo} />
        <Button label='Apply' href={'/Contact'} />
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <h1>{title}</h1>
        <hr />
        <div className={styles.tagline}>{tagline}</div>
        <div className={styles.socialMedia}>
          {social_icons.map(({ alt_text, link, path }, i) => (
            <Button
              key={i}
              href={link}
              buttonStyle={ButtonStyle.Social}
              image={{ src: path, alt: alt_text }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
