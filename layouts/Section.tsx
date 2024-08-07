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
import { type HomeSection } from '../config.yaml';

interface SectionProps {
  sectionConfig: HomeSection;
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
  sectionConfig: HomeSection,
  style: {
    newsSectionStyle: NewsSectionStyleType;
    textSectionStyle: TextSectionStyleType;
  }
) => {
  switch (sectionConfig.type) {
    case 'TextSection':
      return (
        <TextSection
          imagePath={sectionConfig.image}
          altText={sectionConfig.imageAlt}
          text={sectionConfig.text}
          buttonText={sectionConfig.buttonText}
          link={sectionConfig.buttonRoute}
          style={style.textSectionStyle}
        />
      );
    case 'LatestNews':
      return (
        <NewsSection
          newsFeed={sectionConfig.newsFeed}
          style={style.newsSectionStyle}
        />
      );
  }
};

const Section: React.FC<SectionProps> = ({ sectionConfig, index }) => {
  const { sectionStyle, location, newsSectionStyle, textSectionStyle } =
    getStyle(index);

  const content = getContent(sectionConfig, {
    newsSectionStyle,
    textSectionStyle,
  });

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
