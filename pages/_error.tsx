// CSS
import styles from '../styles/Error.module.scss';
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';

export default function ErrorPage({ 
  statusCode 
}:{
  statusCode: any
}) {
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
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </p>
          <div>
            <Button type={ButtonType.LIGHT}>Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
ErrorPage.getInitialProps = ({ 
  res, 
  err 
}:{
  res: any,
  err: any,
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};