import Button, { ButtonType } from '../components/Button';
import Link from '../components/Link';
import styles from '../styles/components/LatestNews.module.scss';

//  NOTE: will not take in props for now (later will be able to take in props or just process the config)
export default function LatestNews() {
  return (
    <Link className={styles.latestNews} href='/'>
      <div className={styles.newsItem}>
        <div className={styles.left}>
          <h1 className={styles.title}>NEWS ABOUT TRENT COMPUTER SCIENCE</h1>
          <p className={styles.date}>September 10th, 2024</p>
        </div>
        <div className={styles.right}>
          <Button type={ButtonType.LIGHT} className={styles.learnMore}>
            Learn more
          </Button>
        </div>
      </div>
      <div className={styles.newsItem}>
        <div className={styles.left}>
          <h1 className={styles.title}>NEWS ABOUT EXCITING EVENT</h1>
          <p className={styles.date}>July 25th, 2024</p>
        </div>
        <div className={styles.right}>
          <Button type={ButtonType.LIGHT} className={styles.learnMore}>
            Learn more
          </Button>
        </div>
      </div>
    </Link>
  );
}
