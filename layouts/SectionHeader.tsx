import React from 'react';
import styles from '../styles/layouts/SectionHeader.module.scss';
import { HeaderStyle } from '../config';
import { type SectionStyle, getSectionStyling } from '../utils';

export enum Alignment {
  Left,
  Center,
  Right,
}
const getAlignment = (alignment: Alignment) => {
  switch (alignment) {
    case Alignment.Left:
      return styles.left;
    case Alignment.Center:
      return ''; // Center is default
    case Alignment.Right:
      return styles.right;
  }
};
interface Props {
  title: string;
  alignment: Alignment;
  headerType: HeaderStyle;
  style: SectionStyle;
  className?: string;
}

const SectionHeader = ({
  title,
  alignment,
  headerType,
  className,
  style,
}: Props): JSX.Element => {
  const sectionStyle = getSectionStyling(style);
  switch (headerType) {
    case HeaderStyle.Default:
      return (
        <div
          className={`${styles.container} ${className} ${getAlignment(alignment)} ${sectionStyle.backgroundColor}`}
        >
          <span className={sectionStyle.foregroundColor}></span>
          <h2 className={sectionStyle.backgroundColor}>{title}</h2>
          <span className={sectionStyle.foregroundColor}></span>
        </div>
      );
    case HeaderStyle.Inline:
      return (
        <div
          className={`${styles.inline} ${sectionStyle.backgroundColor} ${className}`}
        >
          <h2>{title}</h2>
        </div>
      );
  }
};

export default SectionHeader;
