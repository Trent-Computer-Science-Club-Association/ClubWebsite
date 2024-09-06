import styles from '../styles/layouts/Section.module.scss';
import React from 'react';
import SectionHeader, { Alignment } from './SectionHeader';
import NewsSection from './NewsSection';
import TextSection from './TextSection';
import { SectionType, type Section } from '../config';

interface SectionProps {
  sectionConfig: Section;
  index: number;
}

const getStyle = (index: number) => {
  if (index % 2 === 0) {
    return {
      headerStyle: styles.primaryHeader,
      sectionStyle: styles.primaryStyle,
      alignment: Alignment.Left,
    };
  } else {
    return {
      headerStyle: styles.secondaryHeader,
      sectionStyle: styles.secondaryStyle,
      alignment: Alignment.Right,
    };
  }
};

const getContent = (
  sectionConfig: Section,
  index: number,
  sectionStyle: string
) => {
  switch (sectionConfig.section_type) {
    case SectionType.TextSection:
      return <TextSection section={sectionConfig} className={sectionStyle} />;
    case SectionType.NewsSection:
      return <NewsSection section={sectionConfig} className={sectionStyle} />;
  }
};

const Section: React.FC<SectionProps> = ({ sectionConfig, index }) => {
  const { headerStyle, sectionStyle, alignment } = getStyle(index);

  const content = getContent(sectionConfig, index, sectionStyle);

  return (
    <section>
      <SectionHeader
        title={sectionConfig.section_header}
        alignment={alignment}
        className={headerStyle}
      />
      {content}
    </section>
  );
};

export default Section;
