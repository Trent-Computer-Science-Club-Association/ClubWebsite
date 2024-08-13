import styles from '../styles/About.module.scss';
import config from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import TextSection from '../layouts/TextSection';
import { ButtonType } from '../components/Button';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from '../layouts/SectionHeader';

export default function Home() {
  return (
    <>
      <NavBar currentPage='Apply' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <BlurBanner
            imagePath='/FaryonBridge.jpg'
            altText='About Us Image'
            title='Trent Computer Science Club Association'
          />
          <ListingsSection positions={config.listings} />
          <SectionHeader
            title='Become a Sponsor'
            style={SectionHeaderStyle.primary}
            location={SectionLocation.RIGHT_ALIGNED}
          />
          <div className={styles.sponsorButton}>
            <TextSection
              imagePath='/SponsorImage.jpg'
              title='Why Become a Sponsor?'
              altText='Why To Become a Sponsor?'
              text="By sponsoring our computer science club, you'll gain valuable exposure to a  talented pool of future tech leaders. Your support will help us provide  cutting-edge resources and opportunities for our members, strengthening  the local tech community."
              buttonText='Become a Sponsor'
              link=''
            />
          </div>
        </main>
        <Footer />
      </section>
    </>
  );
}
