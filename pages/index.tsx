import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';

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
          <ContactUs />
        </main>
      </section>
    </>
  );
}
