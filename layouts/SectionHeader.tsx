import React from 'react';
import styles from '../styles/layouts/SectionHeader.module.scss';
import { SectionStyle } from '../config';

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
  className?: string;
}

const SectionHeader = ({ title, alignment, className }: Props) => {
  return (
    <div
      className={`${styles.container} ${className} ${getAlignment(alignment)}`}
    >
      <span></span>
      <h2>{title}</h2>
      <span></span>
    </div>
  );
};

export default SectionHeader;
