import React from 'react';
import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import styles from '../styles/layouts/LatestNews.module.scss';

const NewsSectionStyle = {
  BLACK: styles.blackOnGreen,
  GREEN: styles.greenOnBlack,
} as const;

type NewsSectionStyleType =
  (typeof NewsSectionStyle)[keyof typeof NewsSectionStyle];

interface LatestNewsLayoutProps {
  children: React.ReactNode;
  style?: NewsSectionStyleType;
}

const LatestNewsLayout: React.FC<LatestNewsLayoutProps> = ({
  children,
  style = NewsSectionStyle.BLACK,
}) => {
  // both latestNewsLayout and style are required
  return (
    <div className={`${styles.latestNewsLayout} ${style}`}>{children}</div>
  );
};

interface NewsItemProps {
  title: string;
  date: string;
  href: string;
}

export const NewsItem: React.FC<NewsItemProps> = ({ title, date, href }) => {
  return (
    <Link className={styles.newsItem} href={href}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.right}>
        <Button type={ButtonType.LIGHT} className={styles.learnMore} label="Learn more" />
      </div>
    </Link >
  );
};

export default LatestNewsLayout;
export { NewsSectionStyle };
