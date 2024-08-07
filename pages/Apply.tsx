import styles from '../styles/Home.module.scss';
import config from '../config.yaml';
// Internal Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';

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
        </main>
        <Footer />
      </section>
    </>
  );
}
