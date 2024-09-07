// Style
import styles from '../styles/components/Event.module.scss';
// Components
import moment from 'moment';
import Link from 'next/link';
// Internal Components
import Image from './Image';
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
const getDate = (start_date: Date, end_date: Date) => {
  // TODO(#40): use Utils.formatDate
  const formatDate = (date: Date) => moment(date).format('ddd MMM Do, yyyy');
  const start = formatDate(start_date);
  if (start_date == end_date) return start;
  const end = formatDate(end_date);
  return `${start} - ${end}`;
};
export default function Event({ eventItem }: Props) {
  const { title, href, start_date, end_date, image, location } = eventItem;
  const closed = isClosed(eventItem);
  const styleList = [styles.container];
  if (closed) styleList.push(styles.closed);
  const userFriendlyDate = getDate(start_date, end_date);
  // Build ui
  const content = (
    <>
      {/* Background Image */}
      <Image src={image.src} alt={image.alt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        {/* TODO(#40): set datetime with Utils.formatDate */}
        <time>{userFriendlyDate}</time>
        <span>{location}</span>
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
