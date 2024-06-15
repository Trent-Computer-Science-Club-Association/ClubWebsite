// CSS
import styles from '../styles/Error.module.scss';

export default function ErrorPage() {
  // Return error screen
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
      404 PAGE NOT FOUND
      </h1>
      <p className={styles.content}>
      Oops! This page is missing or being developed, sorry! <br/>
      Head back, or to [link to home] and choose a new adventure :)
      </p>
    </div>
  );
}