import styles from '../styles/layouts/Section.module.scss';
import React from 'react';
import SectionHeader, { Alignment } from './SectionHeader';
import NewsSection from './NewsSection';
import TextSection from './TextSection';
import { SectionType, type Section } from '../config';

export enum Style {
  Primary,
  Secondary,
}
export const getHeaderStyle = (headerStyle: Style): string => {
  switch (headerStyle) {
    case Style.Primary:
      return styles.primaryHeader;
    case Style.Secondary:
      return styles.secondaryHeader;
  }
};
const getSectionStyle = (sectionStyle: Style): string => {
  switch (sectionStyle) {
    case Style.Primary:
      return styles.primaryStyle;
    case Style.Secondary:
      return styles.secondaryStyle;
  }
};

const getStyle = (index: number) => {
  if (index % 2 === 0) {
    return {
      style: Style.Primary,
      alignment: Alignment.Left,
    };
  } else {
    return {
      style: Style.Secondary,
      alignment: Alignment.Right,
    };
  }
};

const getContent = (sectionConfig: Section, style: Style) => {
  const sectionStyle = getSectionStyle(style);
  switch (sectionConfig.section_type) {
    case SectionType.TextSection:
      return <TextSection section={sectionConfig} className={sectionStyle} />;
    case SectionType.NewsSection:
      return <NewsSection section={sectionConfig} className={sectionStyle} />;
  }
};

interface SectionConfigProps {
  sectionConfig: Section;
  index: number;
  includeHeader?: boolean;
  headerStyle?: Style;
  sectionStyle?: Style;
  alignment?: Alignment;
}
const Section = ({
  sectionConfig,
  index,
  includeHeader = true,
  headerStyle,
  sectionStyle,
  alignment,
}: SectionConfigProps) => {
  const sectionStyling = getStyle(index);

  const content = getContent(
    sectionConfig,
    sectionStyle ?? sectionStyling.style
  );

  return (
    <section>
      {includeHeader && (
        <SectionHeader
          title={sectionConfig.section_header}
          alignment={alignment ?? sectionStyling.alignment}
          className={getHeaderStyle(headerStyle ?? sectionStyling.style)}
        />
      )}
      {content}
    </section>
  );
};

export { Alignment };
export default Section;
