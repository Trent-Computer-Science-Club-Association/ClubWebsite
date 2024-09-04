import moment from 'moment';
import React, { lazy, Suspense } from 'react';
import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import styles from '../styles/layouts/LatestNews.module.scss';
import { type NewsSection } from '../config';

const ReactMarkdown = lazy(() => import('react-markdown'));

export const NewsSectionStyle = {
  primary: styles.primaryStyle,
  secondary: styles.secondaryStyle,
} as const;

export type NewsSectionStyleType =
  (typeof NewsSectionStyle)[keyof typeof NewsSectionStyle];

interface NewsItem {
  text: string;
  date: Date;
  href: string;
}

const formatDate = (date: Date): string => {
  return moment(date).format('MMMM Do, YYYY');
};

const NewsItemComponent: React.FC<NewsItem> = ({ text, href, date }) => {
  return (
    <Link className={styles.newsItem} href={href}>
      <div className={styles.left}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactMarkdown className={styles.title}>{text}</ReactMarkdown>
        </Suspense>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
      <div className={styles.right}>
        <Button
          type={ButtonType.LIGHT}
          className={styles.learnMore}
          label='Learn more'
        />
      </div>
    </Link>
  );
};

interface NewsSectionProps {
  section: NewsSection;
  style?: NewsSectionStyleType;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  section: { news_feed },
  style = NewsSectionStyle.primary,
}) => {
  return (
    <div className={`${styles.latestNewsLayout} ${style}`}>
      {news_feed.map((item, i) => (
        <NewsItemComponent key={i} {...item} />
      ))}
    </div>
  );
};

export default NewsSection;
