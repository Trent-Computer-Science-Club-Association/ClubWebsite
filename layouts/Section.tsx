import React from 'react';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from './SectionHeader';
import NewsSection, {
  NewsSectionStyle,
  type NewsSectionStyleType,
} from './LatestNews';
import TextSection, {
  TextSectionStyle,
  type TextSectionStyleType,
} from './TextSection';
import { SectionType, type Section } from '../config';

interface SectionProps {
  sectionConfig: Section;
  index: number;
}

const getStyle = (index: number) => {
  if (index % 2 === 0) {
    return {
      sectionStyle: SectionHeaderStyle.primary,
      location: SectionLocation.LEFT_ALIGNED,
      newsSectionStyle: NewsSectionStyle.primary,
      textSectionStyle: TextSectionStyle.primary,
    };
  } else {
    return {
      sectionStyle: SectionHeaderStyle.secondary,
      location: SectionLocation.RIGHT_ALIGNED,
      newsSectionStyle: NewsSectionStyle.secondary,
      textSectionStyle: TextSectionStyle.secondary,
    };
  }
};

const getContent = (
  sectionConfig: Section,
  index: number,
  style: {
    newsSectionStyle: NewsSectionStyleType;
    textSectionStyle: TextSectionStyleType;
  }
) => {
  switch (sectionConfig.section_type) {
    case SectionType.TextSection:
      return (
        <TextSection section={sectionConfig} style={style.textSectionStyle} />
      );
    case SectionType.LatestNews:
      return (
        <NewsSection section={sectionConfig} style={style.newsSectionStyle} />
      );
  }
};

const Section: React.FC<SectionProps> = ({ sectionConfig, index }) => {
  const { sectionStyle, location, newsSectionStyle, textSectionStyle } =
    getStyle(index);

  const content = getContent(sectionConfig, index, {
    newsSectionStyle,
    textSectionStyle,
  });

  return (
    <section>
      <SectionHeader
        title={sectionConfig.section_header}
        style={sectionStyle}
        location={location}
      />
      {content}
    </section>
  );
};

export default Section;
