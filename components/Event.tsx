// Style
import styles from '../styles/components/Event.module.scss';
// Components
import Link from 'next/link';
// Internal Components
import Image from './Image';
import { SlCalender, SlLocationPin } from 'react-icons/sl';
import { formatDate, DateFormat } from '../utils';
import { type EventItem } from '../config';

interface Props {
  eventItem: EventItem;
}

export const isFuture = (eventItem: EventItem) => {
  const now = new Date();
  const { start_date } = eventItem;
  const closed = start_date > now;
  return closed;
};
export const isClosed = (eventItem: EventItem) => {
  const { href } = eventItem;
  const closed = href == undefined || href == '';
  return closed;
};

interface EventDateTimeProps {
  start_date: Date;
  end_date: Date;
}
/**
 * Represents the events date
 */
const EventDateTime = ({ start_date, end_date }: EventDateTimeProps) => {
  const start = (
    <time dateTime={formatDate(start_date, DateFormat.HTMlDateTime)}>
      {formatDate(start_date)}
    </time>
  );
  if (start_date == end_date)
    return (
      <span>
        <SlCalender /> {start}
      </span>
    );
  const end = (
    <time dateTime={formatDate(end_date, DateFormat.HTMlDateTime)}>
      {formatDate(end_date)}
    </time>
  );
  return (
    <span>
      <SlCalender /> {start} - {end}
    </span>
  );
};
export default function Event({ eventItem }: Props) {
  const { title, href, start_date, end_date, image, location } = eventItem;
  const closed = isClosed(eventItem);
  const styleList = [styles.container];
  if (closed) styleList.push(styles.closed);
  // Build ui
  const content = (
    <>
      {/* Background Image */}
      <Image src={image.src} alt={image.alt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        <EventDateTime start_date={start_date} end_date={end_date} />
        <span>
          <SlLocationPin /> {location}
        </span>
      </div>
    </>
  );
  if (closed) {
    return <div className={styleList.join(' ')}>{content}</div>;
  } else {
    return (
      <Link href={href} className={styleList.join(' ')}>
        {content}
      </Link>
    );
  }
}
