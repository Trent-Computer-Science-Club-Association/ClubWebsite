import styles from '../styles/Home.module.scss';
import { homeSections } from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import SectionHeader, {
  SectionLocation,
  SectionHeaderStyle,
} from '../components/SectionHeader';
import TextSection, { TextSectionStyle } from '../components/TextSection';
import LatestNews from '../components/LatestNews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner imagePath='logo.svg' altText='TCSCA Logo' />
          {/* NOTE: we may want to put stuff in seperate sections rather than back to back */}
          {homeSections.map((section, index) => {
            const sectionStyle =
              index % 2 === 0
                ? SectionHeaderStyle.BLACK_ON_GREEN
                : SectionHeaderStyle.GREEN_ON_BLACK;
            const location =
              index % 2 === 0
                ? SectionLocation.LEFT_ALIGNED
                : SectionLocation.RIGHT_ALIGNED;
            const textSectionStyle =
              index % 2 === 0 ? TextSectionStyle.BLACK : TextSectionStyle.GREEN;
            return (
              <>
                <SectionHeader
                  key={index}
                  title={section.title}
                  style={sectionStyle}
                  location={location}
                />
                <TextSection
                  key={index}
                  imagePath={section.image}
                  altText={section.imageAlt}
                  text={section.text}
                  style={textSectionStyle}
                  {...(section.buttonText && {
                    buttonText: section.buttonText,
                  })}
                  {...(section.buttonRoute && { link: section.buttonRoute })}
                />
              </>
            );
          })}
          <SectionHeader
            title='Latest News'
            style={SectionHeaderStyle.GREEN_ON_BLACK}
            location={SectionLocation.RIGHT_ALIGNED}
          />
          <LatestNews />
          <Footer />
        </main>
      </section>
    </>
  );
}
