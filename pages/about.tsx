import styles from '../styles/About.module.scss';
import { about_page } from '../config';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
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
          {/* Sections found in the config */}
          {sections.map((section, i) => (
            <Section sectionConfig={section} index={i + 1} key={i} />
          ))}
        </main>
        <Footer />
      </section>
    </>
  );
}
