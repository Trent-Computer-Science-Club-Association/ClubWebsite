import React, { useState } from 'react';
import styles from '../styles/layouts/EventSection.module.scss';
import {
  SectionStyle,
  EventGridStyle,
  type EventSection,
  type EventItem,
} from '../config';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Event from '../components/Event';

const getStyle = (style: SectionStyle) => {
  switch (style) {
    case SectionStyle.Primary:
      return styles.primaryStyle;
    case SectionStyle.Secondary:
      return styles.secondaryStyle;
    default:
      throw new Error('Unknown Style In EventSection');
  }
};

const getSectionLayout = (
  events: [EventItem, JSX.Element][],
  gridStyle: EventGridStyle
): JSX.Element[][] => {
  // Determine the layout
  switch (gridStyle) {
    case EventGridStyle.Grid:
      return [events.map((e) => e[1])];
    case EventGridStyle.List: {
      // Chunk Array
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < events.length; i += chunkSize) {
        chunks.push(events.slice(i, i + chunkSize).map((e) => e[1]));
      }
      // Return Style
      return chunks;
    }
    case EventGridStyle.HomeList: {
      // Filter
      const now = new Date();
      const filteredEvents = events
        .filter(([event, _]) => event.date > now)
        .sort((a, b) => a[0].date.getTime() - b[0].date.getTime());
      // Return Style
      return [filteredEvents.slice(0, 3).map((e) => e[1])];
    }
    default:
      throw new Error('Unknown GridStyle In EventSection');
  }
};

interface Props {
  section: EventSection;
  style: SectionStyle;
}

export default function EventSection({
  section,
  style = SectionStyle.Primary,
}: Props) {
  const [currentView, setCurrentView] = useState(0);
  // Map the events
  const events = section.events.map((event, i): [EventItem, JSX.Element] => [
    event,
    <Event key={i} eventItem={event} />,
  ]);
  // Determine style
  const sectionStyle = getStyle(style);
  const event_list = getSectionLayout(events, section.grid_style);
  // Map events
  const event_view =
    event_list.length == 0 || event_list[currentView].length == 0 ? (
      <p>There are currently no events present.</p>
    ) : (
      event_list[currentView]
    );
  // Build ui
  return (
    <div className={[styles.container, sectionStyle].join(' ')}>
      {/* Event Container */}
      <div>{event_view}</div>
      {/* Possible Buttons */}
      {event_list.length > 1 && (
        <ul>
          <li>
            <FaChevronLeft
              className={styles.icon}
              onClick={() => setCurrentView((view) => Math.max(view - 1, 0))}
            />
          </li>
          {event_list.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => setCurrentView(i)}
                className={currentView == i ? styles.active : ''}
              ></button>
            </li>
          ))}
          <li>
            <FaChevronRight
              className={styles.icon}
              onClick={() =>
                setCurrentView((view) =>
                  Math.min(view + 1, event_list.length - 1)
                )
              }
            />
          </li>
        </ul>
      )}
    </div>
  );
}
