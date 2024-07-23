import React from 'react';
import styles from '../styles/components/SectionHeader.module.scss';

const SectionLocation = {
  RIGHT_ALIGNED: 'justify-end',
  LEFT_ALIGNED: 'justify-start',
};

enum SectionStyle {
  BLACK_ON_GREEN,
  GREEN_ON_BLACK,
}

type LocationType = (typeof SectionLocation)[keyof typeof SectionLocation];

interface Props {
  title: string;
  style?: SectionStyle;
  textColor?: string;
  location?: LocationType;
}

export default function SectionHeader({
  title,
  style = SectionStyle.BLACK_ON_GREEN,
  textColor = 'text-color-2',
  location = SectionLocation.LEFT_ALIGNED,
}: Props) {
  let backgroundColor: string;
  let foregroundColor: string;

  switch (style) {
    case SectionStyle.BLACK_ON_GREEN:
      backgroundColor = 'bg-color-1';
      foregroundColor = 'bg-color-4';
      break;
    case SectionStyle.GREEN_ON_BLACK:
      backgroundColor = 'bg-color-4';
      foregroundColor = 'bg-color-1';
      break;
  }
  return (
    <div className={`${styles.sectionHeader} ${backgroundColor} ${location}`}>
      <div className={`${styles.sectionHeaderContainer} ${foregroundColor}`}>
        <h2 className={`${styles.sectionHeaderTitle} ${textColor}`}>{title}</h2>
      </div>
    </div>
  );
}

export { SectionLocation, SectionStyle };
