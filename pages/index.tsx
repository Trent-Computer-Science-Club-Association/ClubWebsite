import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import AboutUs from '../components/AboutUs';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner imagePath='logo.svg' altText='TCSCA Logo' />
          <SectionHeader title='About Us' location='justify-start' />
          <AboutUs />
        </main>
      </section>
    </>
  );
}
