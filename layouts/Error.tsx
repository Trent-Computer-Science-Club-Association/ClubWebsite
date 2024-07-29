// CSS
import styles from '../styles/layouts/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';

// Error component
export default function ErrorLayout({
  children,
}:{
  children: React.ReactNode
}) {
  // Allow user to return to home
  const returnHref = '/';
  return(
    <main className={styles.container}>
      <NavBar currentPage='Home' />
      <div className={styles.page}>
        <div className={styles.pageContent}>
          <h1>
          Oops!
          </h1>
          {/* Display passed error message */}
          {children}
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