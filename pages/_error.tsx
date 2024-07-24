// CSS
import styles from '../styles/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';
import { NextPageContext } from 'next';

interface Props {
  statusCode: number;
}

export default function ErrorPage({ 
  statusCode 
}: Props) {
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
            {statusCode
              ? `Page not found, a ${statusCode} error occurred on server`
              : 'An error occurred on client'}
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

// Get error information
ErrorPage.getInitialProps = ({ 
  res, 
  err 
}: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};