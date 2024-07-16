// Style
import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <HeroBanner imagePath='/HeroBanner.jpg' />
      <section className={styles.container}>
        {/* <aside className={styles.SideArea}></aside> */}
        <main className={styles.MainArea}>
          <HeroBanner imagePath='logo.svg' />
          {/* This is where the main page content goes here */}
        </main>
      </section>
    </>
  );
}
