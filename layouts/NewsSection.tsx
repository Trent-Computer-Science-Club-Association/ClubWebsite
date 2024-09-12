import styles from '../styles/layouts/NewsSection.module.scss';
import React from 'react';
import Link from 'next/link';
import Button from '../components/Button';
import { SlCalender, SlLocationPin } from 'react-icons/sl';
import {
  type SectionStyle,
  getSectionStyling,
  Fonts,
  DateFormat,
  formatDate,
} from '../utils';
import { type NewsSection, type NewsItem } from '../config';

const NewsItemComponent = ({ newsItem }: { newsItem: NewsItem }) => {
  const { text, href, date, location } = newsItem;
  const content = (
    <span className={[styles.content, Fonts.Open_Sans].join(' ')}>
      <h3 className={Fonts.Anonymous_Pro}>{text}</h3>
      <span>
        <time dateTime={formatDate(date, DateFormat.HTMlDateTime)}>
          <SlCalender />
          {formatDate(date)}
        </time>
        {location != undefined && '|'}
        {location != undefined && <SlLocationPin />}
        {location != undefined && location}
      </span>
    </span>
  );
  if (href == undefined) {
    return (
      <div className={styles.newsItem}>
        {content}
        <span></span>
      </div>
    );
  } else {
    return (
      <Link className={styles.newsItem} href={href}>
        {content}
        <span className={styles.buttonContainer}>
          <Button label='Learn more' />
        </span>
      </Link>
    );
  }
};

interface NewsSectionProps {
  section: NewsSection;
  style: SectionStyle;
  className?: string;
}
const NewsSection = ({ section, style, className }: NewsSectionProps) => {
  const { news_feed } = section;
  const sectionStyle = getSectionStyling(style);
  return (
    <div
      className={`${styles.container} ${className ?? ''} ${sectionStyle.backgroundColor}`}
    >
      {news_feed.map((item, i) => (
        <NewsItemComponent key={i} newsItem={item} />
      ))}
    </div>
  );
};
export default NewsSection;
