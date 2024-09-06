import styles from '../styles/layouts/NewsSection.module.scss';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Button, { ButtonType } from '../components/Button';
import { formatDate } from '../utils';
import { type NewsSection, type NewsItem } from '../config';

const NewsItemComponent = ({ text, href, date }: NewsItem) => {
  const content = (
    <span>
      <ReactMarkdown>{text}</ReactMarkdown>
      <p>{formatDate(date)}</p>
    </span>
  );
  if (href == undefined) {
    return <div className={styles.newsItem}>{content}</div>;
  } else {
    return (
      <Link className={styles.newsItem} href={href}>
        {content}
        <span>
          <Button type={ButtonType.LIGHT} label='Learn more' />
        </span>
      </Link>
    );
  }
};

interface NewsSectionProps {
  section: NewsSection;
  className?: string;
}
const NewsSection = ({ section, className }: NewsSectionProps) => {
  const { news_feed } = section;
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      {news_feed.map((item, i) => (
        <NewsItemComponent key={i} {...item} />
      ))}
    </div>
  );
};
export default NewsSection;
