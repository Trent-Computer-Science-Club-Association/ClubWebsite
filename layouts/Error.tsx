// CSS
import styles from '../styles/layouts/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';
import React from 'react';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const departure_url = 'http://tcsca';

export default function ErrorLayout({
  children,
}:{
  children: React.ReactNode
}) {
  const [allowReport, setAllowReport] = useState(false);
  useEffect(() => {
    // If the user is coming from a broken link on our site, they can report an issue
    if (document.referrer.includes('localhost:3000' || document.referrer.startsWith(departure_url))){
     setAllowReport(true);
    }
    // If not, they don't need to report an issue
    else{
      setAllowReport(false);
    }
  }, []);

  return(
    <section className={styles.container}>
      <NavBar currentPage='Home' />
      <main className={styles.container}>
        <div className={styles.page}>
          <div className={styles.pageContent}>
            <h1>
            Oops!
            </h1>
            {/* Display passed error message */}
            {children}
            {/* Actions the user can take */}
            {allowReport && displayButtons()}
            {!allowReport && displayHomeButton()}
          </div>
        </div>
      </main>
      <Footer/>
    </section>
  );
}

function displayHomeButton(){
  // Allow user to return to home
  const returnHref = '/';
  return (
    <>
      <Button 
        type={ButtonType.LIGHT}
        href={returnHref}
        className={styles.button}
        label='Return Home'
      />
    </>
  );
}

function displayButtons(){
  // Allow users to report on GitHub
  const reportHref = '';
  const homeButton = displayHomeButton();
  return (
    <div>
      {homeButton}
      <Button 
        type={ButtonType.LIGHT}
        href={reportHref}
        className={styles.button}
        label='Let us know'
      />
    </div>
  );
}