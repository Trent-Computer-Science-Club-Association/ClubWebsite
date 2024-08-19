import React, { useState } from 'react';
import styles from '../styles/layouts/EventSection.module.scss';
import { SectionStyle, EventGridStyle, type EventSection } from '../config';
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

const getSectionLayout = (events: JSX.Element[], gridStyle: EventGridStyle) => {
  // Determine the layout
  switch (gridStyle) {
    case EventGridStyle.Grid:
      return {
        event_list: [events],
      };
    case EventGridStyle.List: {
      // Chunk Array
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < events.length; i += chunkSize) {
        chunks.push(events.slice(i, i + chunkSize));
      }
      // Return Style
      return {
        event_list: chunks,
      };
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
  const events = section.events.map((event, i) => (
    <Event key={i} eventItem={event} />
  ));
  // Determine style
  const sectionStyle = getStyle(style);
  const { event_list } = getSectionLayout(events, section.grid_style);
  // Map events
  const event_view =
    event_list[currentView].length == 0 ? (
      <p>This section is currently empty.</p>
    ) : (
      event_list[currentView]
    );
  // Build ui
  return (
    <div className={[styles.container, sectionStyle].join(' ')}>
      {/* Event Container */}
      <div>{event_view}</div>
      {/* Possible Buttons */}
      <ul>
        {event_list.length > 1 &&
          event_list.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => setCurrentView(i)}
                className={currentView == i ? styles.active : ''}
              ></button>
            </li>
          ))}
      </ul>
    </div>
  );
}
