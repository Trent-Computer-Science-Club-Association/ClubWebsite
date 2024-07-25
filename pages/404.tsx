// CSS
import styles from '../styles/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';

export default function ErrorPage() {
  // Allow user to return to home
  const returnHref = '/';

  return (
    <main className={styles.container}>
      <NavBar currentPage='Home' />
      <div className={styles.page}>
        <div className={styles.pageContent}>
          <h1>
          Oops!
          </h1>
          <p>
            404 - Page not found <br/>
            This page may be in development or may not exist at this time
          </p>
          {/* Return to home page */}
          <Button 
            type={ButtonType.LIGHT}
            href={returnHref}
            className={styles.homeButton}
          >
            Return Home
          </Button>
        </div>
      </div>
    </main>
  );
}