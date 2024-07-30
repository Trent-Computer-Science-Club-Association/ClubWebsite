import Button, { ButtonType } from '../components/Button';
import Link from 'next/link';
import styles from '../styles/layouts/LatestNews.module.scss';

interface LatestNewsLayoutProps {
  children: React.ReactNode;
}

const LatestNewsLayout: React.FC<LatestNewsLayoutProps> = ({ children }) => {
  return <div className={styles.latestNewsLayout}>{children}</div>;
};

export default LatestNewsLayout;

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
        <Button type={ButtonType.LIGHT} className={styles.learnMore}>
          Learn more
        </Button>
      </div>
    </Link>
  );
};
