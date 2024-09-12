import React from 'react';
import SectionHeader, { Alignment } from './SectionHeader';
import NewsSection from './NewsSection';
import TextSection from './TextSection';
import EventSection from './EventSection';
import AboutSection from './AboutSection';
import { SectionStyle } from '../utils';
import { SectionType, type Section } from '../config';

interface SectionProps {
  sectionConfig: Section;
  index: number;
}

const getStyle = (index: number) => {
  if (index % 2 === 0) {
    return {
      style: SectionStyle.Primary,
      alignment: Alignment.Left,
    };
  } else {
    return {
      style: SectionStyle.Secondary,
      alignment: Alignment.Right,
    };
  }
};

const getContent = (
  sectionConfig: Section,
  sectionStyle: SectionStyle
): JSX.Element => {
  switch (sectionConfig.section_type) {
    case SectionType.TextSection:
      return <TextSection section={sectionConfig} style={sectionStyle} />;
    case SectionType.NewsSection:
      return <NewsSection section={sectionConfig} style={sectionStyle} />;
    case SectionType.EventSection:
      return <EventSection section={sectionConfig} style={sectionStyle} />;
    case SectionType.AboutSection:
      return <AboutSection section={sectionConfig} style={sectionStyle} />;
  }
};

const Section = ({ sectionConfig, index }: SectionProps) => {
  const { style, alignment } = getStyle(index);

  const content = getContent(sectionConfig, style);

  return (
    <section>
      <SectionHeader
        title={sectionConfig.section_header}
        style={style}
        headerType={sectionConfig.header_style}
        alignment={alignment}
      />
      {content}
    </section>
  );
};

export default Section;
