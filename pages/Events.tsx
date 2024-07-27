// Style
import styles from '../styles/Events.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import Event from '../components/Event';

export default function Events() {
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Events' />
      <section className={styles.container}>
        <header>
          <Event title={'Test Event'} openDate={new Date()} date={new Date()} image={'https://via.placeholder.com/150'} imageAlt={'Test Image'} />
        </header>
        <main>
          {/* Header - Current Event & Upcoming Events */}
          <div className={styles.upcomingGrid}>
            {...[1,1,1,1].map((_, i) => <Event title={'Test Event'} openDate={new Date()} date={new Date()} image={'https://via.placeholder.com/150'} imageAlt={'Test Image'} key={i}/>)}
          </div>
          {/* Current Events & Upcoming events*/}
          {/* Past Events */}
        </main>
      </section>
    </>
  );
}
