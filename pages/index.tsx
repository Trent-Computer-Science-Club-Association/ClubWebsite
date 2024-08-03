import styles from '../styles/Home.module.scss';
import { homeSections } from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import TextSection from '../layouts/TextSection';
import LatestNews, { NewsItem } from '../layouts/LatestNews';
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
          {homeSections.map((section, index) => (
            <section key={index}>
              <Section title={section.title} index={index}>
                <TextSection
                  imagePath={section.image}
                  altText={section.imageAlt}
                  text={section.text}
                  {...(section.buttonText && {
                    buttonText: section.buttonText,
                  })}
                  {...(section.buttonRoute && { link: section.buttonRoute })}
                />
              </Section>
            </section>
          ))}
          <Section title='Latest News' index={homeSections.length}>
            <LatestNews>
              <NewsItem
                title='NEWS ABOUT TRENT COMPUTER SCIENCE'
                date='September 10th, 2024'
                href='/'
              />
              <NewsItem
                title='NEWS ABOUT EXCITING EVENT'
                date='July 25th, 2024'
                href='/'
              />
            </LatestNews>
          </Section>
        </main>
        <Footer />
      </section>
    </>
  );
}
