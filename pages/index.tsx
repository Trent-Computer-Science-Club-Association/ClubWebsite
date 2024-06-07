// Style
import styles from '../styles/Home.module.scss';
// Internal Components
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar currentPage='Home'/>
      <section className={styles.container}>
        <aside className={styles.SideArea}></aside>
        <main className={styles.MainArea}>
          This is where the main page content goes here
        </main>
      </section>
    </>
  );
}
