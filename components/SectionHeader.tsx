import React from 'react';
import styles from '../styles/components/SectionHeader.module.scss';

const SectionLocation = {
  RIGHT_ALIGNED: 'justify-end',
  LEFT_ALIGNED: 'justify-start',
};

enum SectionHeaderStyle {
  BLACK_ON_GREEN,
  GREEN_ON_BLACK,
}

type LocationType = (typeof SectionLocation)[keyof typeof SectionLocation];

interface Props {
  title: string;
  style?: SectionHeaderStyle;
  location?: LocationType;
}

export default function SectionHeader({
  title,
  style = SectionHeaderStyle.BLACK_ON_GREEN,
  location = SectionLocation.LEFT_ALIGNED,
}: Props) {
  let backgroundColor: string;
  let foregroundColor: string;

  switch (style) {
    case SectionHeaderStyle.BLACK_ON_GREEN:
      backgroundColor = 'bg-color-1';
      foregroundColor = 'bg-color-4';
      break;
    case SectionHeaderStyle.GREEN_ON_BLACK:
      backgroundColor = 'bg-color-4';
      foregroundColor = 'bg-color-1';
      break;
  }
  return (
    <div className={`${styles.sectionHeader} ${backgroundColor} ${location}`}>
      <div className={`${styles.sectionHeaderContainer} ${foregroundColor}`}>
        <h2 className={`${styles.sectionHeaderTitle} `}>{title}</h2>
      </div>
    </div>
  );
}

export { SectionLocation, SectionHeaderStyle };
