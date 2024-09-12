import React from 'react';
import styles from '../styles/components/BulletPoint.module.scss';
import { type SectionStyle, getSectionStyling, Fonts } from '../utils';
import { type BulletPoint } from '../config';
import Icon from './Icon';

interface Props {
  bullet: BulletPoint;
  style: SectionStyle;
}

const Button = ({ bullet, style }: Props): JSX.Element => {
  const sectionStyle = getSectionStyling(style);
  return (
    <div className={[styles.container, Fonts.Open_Sans].join(' ')}>
      <div
        className={[styles.iconContainer, sectionStyle.foregroundColor].join(
          ' '
        )}
      >
        <Icon iconType={bullet.icon} />
      </div>
      <h4>{bullet.title}</h4>
      <span>{bullet.text}</span>
    </div>
  );
};

export default Button;
