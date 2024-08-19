// Style
import styles from '../styles/Events.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import Section, { SectionType } from '../layouts/Section';
import EventBanner from '../components/EventBanner';
import Event from '../components/Event';
import { events, type EventItem } from '../config.yaml';

const processEvents = (events: EventItem[]) => {
  let mainEvent = null;
  const futureEvents: JSX.Element[] = [];
  const currentEvents: JSX.Element[] = [];
  const pastEvents: JSX.Element[] = [];
  // Sort Events
  events.sort((a, b) => a.date.getTime() - b.date.getTime());
  // Process Events
  for (const event of events) {
    // Sanity TypeChecking
    if (event.date < event.openDate) throw new Error('ConfigError: Event opens after event date');
    // Build Event
    const eventElement = <Event
      title={event.title}
      href={event.href}
      openDate={event.openDate}
      date={event.date}
      image={event.image}
      imageAlt={event.imageAlt}
    />;
    // handle main event
    if (event.markMainEvent) {
      if (mainEvent == null) mainEvent = eventElement;
      else throw new Error('ConfigError: Multiple events marked as main');
    }
    // Determine if it is future, current or past
    const now = new Date();
    if (event.openDate > now) {
      futureEvents.push(eventElement);
    } else if (event.date > now) {
      currentEvents.push(eventElement);
    } else {
      pastEvents.push(eventElement);
    }
  }
  // TODO: Debug this line
  if (mainEvent == null) mainEvent = futureEvents[-1] ?? currentEvents[0] ?? pastEvents[-1];
  // Build Section Configs
  const futureEventsSection = {
    type: SectionType.EventSection,
    header: 'Upcoming Events',
    events: futureEvents,
  };
  const currentEventsSection = {
    type: SectionType.EventSection,
    header: 'Current Events',
    events: currentEvents,
  };
  const pastEventsSection = {
    type: SectionType.EventSection,
    header: 'Past Events',
    events: pastEvents,
  };
  // Return events
  return {
    main_event: mainEvent,
    future_events: futureEventsSection,
    current_events: currentEventsSection,
    past_events: pastEventsSection,
  };
};

export default function Events() {
  // Build events
  const { main_event, future_events, current_events, past_events} = processEvents(events);
  // merge sections
  const sections = [ future_events, current_events, past_events ];
  // Build ui
  return (
    <>
      <EventBanner contextKey='bannerInfo' />
      <NavBar currentPage='Events' />
      <section className={styles.container}>
        <header>
          {main_event}
        </header>
        <main>
          {sections.map((section, i) => <Section sectionConfig={section} index={i} />)}
          {/* Header - Current Event & Upcoming Events */}
          <div className={styles.upcomingGrid}> 
            {future_events}
          </div>
          {/* Past Events */}
          <div className={styles.upcomingGrid}> 
            {current_events}
          </div>
          {/* Past Events */}
          <div className={styles.upcomingGrid}> 
            {past_events}
          </div>
        </main>
      </section>
    </>
  );
}
