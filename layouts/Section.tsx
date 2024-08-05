import React from 'react';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from './SectionHeader';
import LatestNewsLayout, { NewsSectionStyle } from './LatestNews';
import TextSection, { TextSectionStyle } from './TextSection';

type NewsSectionStyleType =
  (typeof NewsSectionStyle)[keyof typeof NewsSectionStyle];
type TextSectionStyleType =
  (typeof TextSectionStyle)[keyof typeof TextSectionStyle];

type SectionChild = React.ReactElement<{
  style?: NewsSectionStyleType | TextSectionStyleType;
}>;

interface SectionProps {
  title: string;
  index: number;
  children: SectionChild;
}

const getStyle = (index: number) => {
  if (index % 2 === 0) {
    return { sectionStyle: SectionHeaderStyle.BLACK_ON_GREEN, location: SectionLocation.LEFT_ALIGNED, newsSectionStyle: NewsSectionStyle.BLACK, textSectionStyle: TextSectionStyle.BLACK };
  } else {
    return { sectionStyle: SectionHeaderStyle.GREEN_ON_BLACK, location: SectionLocation.RIGHT_ALIGNED, newsSectionStyle: NewsSectionStyle.GREEN, textSectionStyle: TextSectionStyle.GREEN };
  }
};

const Section: React.FC<SectionProps> = ({ title, index, children }) => {
  const { sectionStyle, location, newsSectionStyle, textSectionStyle } = getStyle(index);
  return (
    <section>
      <SectionHeader title={title} style={sectionStyle} location={location} />
      {React.isValidElement(children) &&
        (children.type === TextSection
          ? React.cloneElement(children, { style: textSectionStyle })
          : children.type === LatestNewsLayout
            ? React.cloneElement(children, { style: newsSectionStyle })
            : children)}
    </section>
  );
};

export default Section;
