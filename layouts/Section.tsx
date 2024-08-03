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

const Section: React.FC<SectionProps> = ({ title, index, children }) => {
  const sectionStyle =
    index % 2 === 0
      ? SectionHeaderStyle.BLACK_ON_GREEN
      : SectionHeaderStyle.GREEN_ON_BLACK;
  const location =
    index % 2 === 0
      ? SectionLocation.LEFT_ALIGNED
      : SectionLocation.RIGHT_ALIGNED;
  const newsSectionStyle =
    index % 2 === 0 ? NewsSectionStyle.BLACK : NewsSectionStyle.GREEN;
  const textSectionStyle =
    index % 2 === 0 ? TextSectionStyle.BLACK : TextSectionStyle.GREEN;

  console.log(index);

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
