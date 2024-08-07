import moment from 'moment';
import React from 'react';
import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import styles from '../styles/layouts/LatestNews.module.scss';
import ReactMarkdown from 'react-markdown';

const NewsSectionStyle = {
  primary: styles.primaryStyle,
  secondary: styles.secondaryStyle,
} as const;

type NewsSectionStyleType =
  (typeof NewsSectionStyle)[keyof typeof NewsSectionStyle];

interface NewsItem {
  text: string;
  href: string;
  date: Date;
}

interface NewsSectionProps {
  newsFeed: NewsItem[];
  style?: NewsSectionStyleType;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  newsFeed,
  style = NewsSectionStyle.primary,
}) => {
  return (
    <div className={`${styles.latestNewsLayout} ${style}`}>
      {newsFeed.map((item, index) => (
        <NewsItemComponent key={index} {...item} />
      ))}
    </div>
  );
};

const NewsItemComponent: React.FC<NewsItem> = ({ text, href, date }) => {
  return (
    <Link className={styles.newsItem} href={href}>
      <div className={styles.left}>
        <ReactMarkdown className={styles.title}>{text}</ReactMarkdown>
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

const formatDate = (date: Date): string => {
  return moment(date).format('MMMM Do, YYYY');
};

export default NewsSection;
export {
  NewsSectionStyle,
  type NewsItem,
  type NewsSectionProps,
  type NewsSectionStyleType,
};
