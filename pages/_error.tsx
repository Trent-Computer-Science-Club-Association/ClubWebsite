// CSS
import styles from '../styles/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';
import { NextPageContext } from 'next';

export default function ErrorPage({ 
  statusCode 
}:{
  statusCode: number
}) {
  const returnTo = '/';

  return (
    <div className={styles.canvas}>
      <NavBar currentPage='Home' />
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
          Oops!
          </h1>
          <p className={styles.body}>
            {statusCode
              ? `Page not found, a ${statusCode} error occurred on server`
              : 'An error occurred on client'}
          </p>
          {/* Return to home page */}
          <div>
            <Button 
              type={ButtonType.LIGHT}
              href={returnTo}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
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