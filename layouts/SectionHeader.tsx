import React from 'react';
import styles from '../styles/layouts/SectionHeader.module.scss';

const SectionLocation = {
  RIGHT_ALIGNED: 'justify-end',
  LEFT_ALIGNED: 'justify-start',
} as const;

const SectionHeaderStyle = {
  BLACK_ON_GREEN: styles.style1,
  GREEN_ON_BLACK: styles.style2,
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
  style = SectionHeaderStyle.BLACK_ON_GREEN,
  location = SectionLocation.LEFT_ALIGNED,
}: Props) {
  return (
    <div className={`${styles.sectionHeader} ${style} ${location}`}>
      <span className={`${styles.sectionHeaderContainer}`}>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
      </span>
    </div>
  );
}

export { SectionLocation, SectionHeaderStyle };
