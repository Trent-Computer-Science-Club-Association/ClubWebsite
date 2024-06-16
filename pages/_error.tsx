// CSS
import styles from '../styles/Error.module.scss';
import NavBar from '../components/NavBar';

export default function ErrorPage() {
  // Return error screen
  return (
    <div className={styles.canvas}>
      <NavBar currentPage='Home' />
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
          404 PAGE NOT FOUND
          </h1>
          <p>
          Oops! This page is missing or being developed, sorry! <br/>
          Head back, or to [link to home] and choose a new adventure :)
          </p>
        </div>
      </div>
    </div>
  );
}