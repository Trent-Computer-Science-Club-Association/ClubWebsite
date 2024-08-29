import styles from '../styles/About.module.scss';
import { about_page } from '../config';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import Section from '../layouts/Section';

export default function About() {
  const { sections } = about_page;

  return (
    <>
      <EventBanner />
      <NavBar currentPage='About' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner />
          {/* Sections found in the config */}
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
