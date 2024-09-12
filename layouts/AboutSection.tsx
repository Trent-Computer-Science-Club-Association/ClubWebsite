import React from 'react';
import Image from '../components/Image';
import styles from '../styles/layouts/AboutSection.module.scss';
import BulletPoint from '../components/BulletPoint';
import { type SectionStyle, getSectionStyling, Fonts } from '../utils';
import { type AboutSection } from '../config';

interface Props {
  section: AboutSection;
  style: SectionStyle;
  className?: string;
}

const AboutSection = ({
  section: { text, image, bullet_points },
  style,
  className,
}: Props) => {
  const sectionStyle = getSectionStyling(style);
  return (
    <div
      className={`${styles.container} ${className ?? ''} ${Fonts.Open_Sans} ${sectionStyle.backgroundColor}`}
    >
      <div>
        <div>
          <p>{text}</p>
        </div>
        {bullet_points.length != 0 && (
          <div className={styles.bulletList}>
            {bullet_points.map((bullet, i) => (
              <BulletPoint bullet={bullet} style={style} key={i} />
            ))}
          </div>
        )}
        <div className={styles.imageContainer}>
          <Image src={image.src} alt={image.alt} fill={true} />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
