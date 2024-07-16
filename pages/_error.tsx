// CSS
import styles from '../styles/Error.module.scss';
import NavBar from '../components/NavBar';

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
          <p>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </p>
          <div>
            <button
              type='button'
              className={styles.return}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 
ErrorPage.getInitialProps = ({ 
    res, 
    err 
  }:{
    res: any,
    err: any,
  }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}