import React from 'react';
import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import styles from '../styles/layouts/LatestNews.module.scss';
import ReactMarkdown from 'react-markdown';

const NewsSectionStyle = {
  BLACK: styles.blackOnGreen,
  GREEN: styles.greenOnBlack,
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
  style = NewsSectionStyle.BLACK,
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
  const day = date.getDate();

  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const [month, year] = date
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    .split(' ');

  return `${month} ${day}${getDaySuffix(day)}, ${year}`;
};

export default NewsSection;
export { NewsSectionStyle, type NewsItem, type NewsSectionProps };
