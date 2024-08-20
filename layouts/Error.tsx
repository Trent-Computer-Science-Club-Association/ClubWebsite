// CSS
import styles from '../styles/layouts/Error.module.scss';
// Components
import NavBar from '../components/NavBar';
import Button, { ButtonType } from '../components/Button';
import React from 'react';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

export default function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allowReport, setAllowReport] = useState(false);
  const departureUrl = 'https://tcsca';
  const returnHref = '/'; // Allow user to return to home
  const reportHref =
    'https://github.com/Trent-Computer-Science-Club-Association/ClubWebsite/issues/new?labels=page-error&template=page-error.md'; // Allow users to report on GitHub

  useEffect(() => {
    // If the user is coming from a broken link on our site, they can report an issue
    // Note: document.referrer is not always reliable as there are ways it can be blocked
    if (
      document.referrer.includes(
        'localhost:3000' || document.referrer.startsWith(departureUrl)
      )
    ) {
      setAllowReport(true);
    } else {
      // If not, they don't need to report an issue
      setAllowReport(false);
    }
  }, []);

  return (
    <section className={styles.container}>
      <NavBar currentPage='' />
      <main className={styles.container}>
        <div className={styles.page}>
          <h1>Oops!</h1>
          {/* Display passed error message */}
          <div>{children}</div>
          {/* Actions the user can take */}
          <div>
            <Button
              type={ButtonType.LIGHT}
              href={returnHref}
              className={styles.button}
              label='Return Home'
            />
            {allowReport && (
              <Button
                type={ButtonType.LIGHT}
                href={reportHref}
                className={styles.button}
                label='Let us know'
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}
