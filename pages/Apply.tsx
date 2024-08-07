import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}></main>
        <Footer />
      </section>
    </>
  );
}
