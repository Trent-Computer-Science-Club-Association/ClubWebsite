// Style
import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <aside className={styles.SideArea}></aside>
        <main className={styles.MainArea}>
          This is where the main page content goes here
        </main>
      </section>
    </>
  );
}
