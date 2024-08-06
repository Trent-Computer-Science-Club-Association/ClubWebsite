import styles from '../styles/Home.module.scss';
import { homeSections } from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import TextSection from '../layouts/TextSection';
import NewsSection from '../layouts/LatestNews';
import Footer from '../components/Footer';
import Section from '../layouts/Section';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner />
          {/* In the config we have a list of sections, this is how we iterate through them */}
          {homeSections.map((section, index) => (
            <section key={index}>
              <Section sectionConfig={section} index={index} />
            </section>
          ))}
          {/* <Section title='Latest News' index={homeSections.length}> */}
          {/*   <NewsSection newsFeed={newsFeed.items} /> */}
          {/* </Section> */}
        </main>
        <Footer />
      </section>
    </>
  );
}
