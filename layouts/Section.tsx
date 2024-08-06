import React from 'react';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from './SectionHeader';
import NewsSection, { NewsSectionStyle } from './LatestNews';
import TextSection, { TextSectionStyle } from './TextSection';
import { type HomeSection } from '../config.yaml';

type NewsSectionStyleType =
  (typeof NewsSectionStyle)[keyof typeof NewsSectionStyle];
type TextSectionStyleType =
  (typeof TextSectionStyle)[keyof typeof TextSectionStyle];

interface SectionProps {
  sectionConfig: typeof HomeSection;
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

const Section: React.FC<SectionProps> = ({ sectionConfig, index }) => {
  const { sectionStyle, location, newsSectionStyle, textSectionStyle } =
    getStyle(index);

  let content: React.ReactNode;

  if (sectionConfig.type === 'TextSection') {
    content = (
      <TextSection
        imagePath={sectionConfig.image}
        altText={sectionConfig.imageAlt}
        text={sectionConfig.text}
        buttonText={sectionConfig.buttonText}
        link={sectionConfig.buttonRoute}
        style={textSectionStyle}
      />
    );
  } else if (sectionConfig.type === 'LatestNews') {
    content = (
      <NewsSection newsFeed={sectionConfig.newsFeed} style={newsSectionStyle} />
    );
  }

  return (
    <section>
      <SectionHeader
        title={sectionConfig.header}
        style={sectionStyle}
        location={location}
      />
      {content}
    </section>
  );
};

export default Section;
