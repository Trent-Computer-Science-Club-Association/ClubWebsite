import React from 'react';
import styles from '../styles/layouts/SectionHeader.module.scss';

const SectionLocation = {
  RIGHT_ALIGNED: styles.rightAligned,
  LEFT_ALIGNED: styles.leftAligned,
  MIDDLE_ALIGNED: styles.middleAligned,
} as const;

const SectionHeaderStyle = {
  primary: styles.style1,
  secondary: styles.style2,
} as const;

type LocationType = (typeof SectionLocation)[keyof typeof SectionLocation];
type StyleType = (typeof SectionHeaderStyle)[keyof typeof SectionHeaderStyle];

interface Props {
  title: string;
  style?: StyleType;
  location?: LocationType;
}

export default function SectionHeader({
  title,
  style = SectionHeaderStyle.primary,
  location = SectionLocation.LEFT_ALIGNED,
}: Props) {
  return (
    <div className={`${styles.sectionHeader} ${style} ${location}`}>
      <div className={styles.frontRoundedCornerContainer}>
        <div className={styles.frontRoundedCorner} />
      </div>
      <span className={styles.sectionHeaderContainer}>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
      </span>
      <div className={styles.backRoundedCornerContainer}>
        <div className={styles.backRoundedCorner} />
      </div>
    </div>
  );
}

export { SectionLocation, SectionHeaderStyle };
