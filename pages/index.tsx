import styles from '../styles/Home.module.scss';
import { aboutUs } from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import SectionHeader, { SectionLocation } from '../components/SectionHeader';
import TextSection from '../components/TextSection';
import ContactUs from '../components/ContactUs';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner imagePath='logo.svg' altText='TCSCA Logo' />
          <SectionHeader
            title='About Us'
            location={SectionLocation.RIGHT_ALIGNED}
          />
          <TextSection
            imagePath={aboutUs.image}
            altText={aboutUs.altText}
            text={aboutUs.text}
            buttonText='Learn More'
            link='/About'
          />
          <ContactUs />
        </main>
      </section>
    </>
  );
}
