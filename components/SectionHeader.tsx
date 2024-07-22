import React from 'react';
import styles from '../styles/components/SectionHeader.module.scss';

const SectionLocation = {
  RIGHT_ALIGNED: 'justify-start',
  LEFT_ALIGNED: 'justify-end',
};

type LocationType = (typeof SectionLocation)[keyof typeof SectionLocation];
// type Location = 'justify-start' | 'justify-end';

interface Props {
  title: string;
  backgroundColor?: string;
  foregroundColor?: string;
  textColor?: string;
  location?: LocationType;
}

export default function SectionHeader({
  title,
  backgroundColor = 'bg-color-1',
  foregroundColor = 'bg-color-4',
  textColor = 'text-color-2',
  location = SectionLocation.RIGHT_ALIGNED,
}: Props) {
  return (
    <div className={`${styles.sectionHeader} ${backgroundColor} ${location}`}>
      <div className={`${styles.sectionHeaderContainer} ${foregroundColor}`}>
        <h2 className={`${styles.sectionHeaderTitle} ${textColor}`}>{title}</h2>
      </div>
    </div>
  );
}

export { SectionLocation };
