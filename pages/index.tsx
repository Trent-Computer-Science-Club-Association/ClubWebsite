import styles from '../styles/Home.module.scss';
import { home_page } from '../config';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import Section from '../layouts/Section';

export default function Home() {
  const { sections } = home_page;
  // UI
  return (
    <>
      <EventBanner />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner />
          {/* In the config we have a list of sections, this is how we iterate through them */}
          {sections.map((section, i) => (
            <section key={i}>
              <Section sectionConfig={section} index={i} />
            </section>
          ))}
        </main>
        <Footer />
      </section>
    </>
  );
}
