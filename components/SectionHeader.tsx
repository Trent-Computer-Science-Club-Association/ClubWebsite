import React from 'react';
import styles from '../styles/components/SectionHeader.module.scss';

type Location = 'justify-start' | 'justify-end';

interface Props {
  title: string;
  backgroundColor?: string;
  foregroundColor?: string;
  textColor?: string;
  location?: Location;
}

export default function SectionHeader({
  title,
  backgroundColor = 'bg-color-1',
  foregroundColor = 'bg-dark-gray',
  textColor = 'text-color-2',
  location = 'justify-start',
}: Props) {
  return (
    <div className={`${styles.sectionHeader} ${backgroundColor} ${location}`}>
      <div className={`${styles.sectionHeaderContainer} ${foregroundColor}`}>
        <h2 className={`${styles.sectionHeaderTitle} ${textColor}`}>{title}</h2>
      </div>
    </div>
  );
}
