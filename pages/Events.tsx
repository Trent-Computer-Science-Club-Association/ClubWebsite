// Style
import styles from '../styles/Events.module.scss';
// Internal Components
import NavBar from '../components/NavBar';
import Section from '../layouts/Section';
import EventBanner from '../components/EventBanner';
import Event from '../components/Event';
import {
  events,
  SectionType,
  EventGridStyle,
  type EventItem,
  type EventSection,
} from '../config';

const processEvents = (events: EventItem[]) => {
  let mainEvent: EventItem | undefined = undefined;
  const futureEvents: EventItem[] = [];
  const currentEvents: EventItem[] = [];
  const pastEvents: EventItem[] = [];
  // Sort Events
  events.sort((a, b) => a.date.getTime() - b.date.getTime());
  // Process Events
  for (const event of events) {
    // Sanity TypeChecking
    if (event.date < event.open_date)
      throw new Error('ConfigError: Event opens after event date');
    // handle main event
    if (event.main_event) {
      if (mainEvent == null) mainEvent = event;
      else throw new Error('ConfigError: Multiple events marked as main');
    }
    // Determine if it is future, current or past
    const now = new Date();
    if (event.open_date > now) {
      futureEvents.push(event);
    } else if (event.date > now) {
      currentEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  }
  // If no main event we will pick a featured event
  if (mainEvent == null)
    mainEvent = currentEvents[0] ?? futureEvents[0] ?? pastEvents[-1];
  // Build Section Configs
  const futureEventsSection: EventSection = {
    section_type: SectionType.EventSection,
    section_header: 'Upcoming Events',
    grid_style: EventGridStyle.List,
    events: futureEvents,
  };
  const currentEventsSection: EventSection = {
    section_type: SectionType.EventSection,
    section_header: 'Current Events',
    grid_style: EventGridStyle.List,
    events: currentEvents,
  };
  const pastEventsSection: EventSection = {
    section_type: SectionType.EventSection,
    section_header: 'Past Events',
    grid_style: EventGridStyle.Grid,
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
  // Generate fake events
  // TODO: Remove debug
  const fake_events = [
    ...events,
    ...Array(100).fill(events[3]),
    ...Array(25).fill(events[2]),
  ];
  // Build events
  const { main_event, future_events, current_events, past_events } =
    processEvents(fake_events);
  // Make Main Event
  const mainEvent = <Event eventItem={main_event} />;
  // merge sections
  const sections = [];
  if (current_events.events.length > 0) sections.push(current_events);
  sections.push(future_events);
  sections.push(past_events);
  // Build ui
  return (
    <>
      <EventBanner />
      <NavBar currentPage='Events' />
      <section className={styles.container}>
        <header>{mainEvent}</header>
        <main>
          {sections.map((section, i) => (
            <Section sectionConfig={section} index={i} />
          ))}
        </main>
      </section>
    </>
  );
}
