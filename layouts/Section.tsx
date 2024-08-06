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
    return {
      sectionStyle: SectionHeaderStyle.BLACK_ON_GREEN,
      location: SectionLocation.LEFT_ALIGNED,
      newsSectionStyle: NewsSectionStyle.primary,
      textSectionStyle: TextSectionStyle.primary,
    };
  } else {
    return {
      sectionStyle: SectionHeaderStyle.GREEN_ON_BLACK,
      location: SectionLocation.RIGHT_ALIGNED,
      newsSectionStyle: NewsSectionStyle.secondary,
      textSectionStyle: TextSectionStyle.secondary,
    };
  }
};

const cloneChildWithStyle = (
  child: SectionChild,
  textSectionStyle: TextSectionStyleType,
  newsSectionStyle: NewsSectionStyleType
) => {
  if (React.isValidElement(child)) {
    if (child.type === TextSection) {
      return React.cloneElement(child, { style: textSectionStyle });
    }
    if (child.type === LatestNewsLayout) {
      return React.cloneElement(child, { style: newsSectionStyle });
    }
  }
  return child;
};

const Section: React.FC<SectionProps> = ({ title, index, children }) => {
  const { sectionStyle, location, newsSectionStyle, textSectionStyle } =
    getStyle(index);

  const styledChild = React.Children.map(children, (child) =>
    cloneChildWithStyle(child, textSectionStyle, newsSectionStyle)
  );

  return (
    <section>
      <SectionHeader title={title} style={sectionStyle} location={location} />
      {styledChild}
    </section>
  );
};

export default Section;
