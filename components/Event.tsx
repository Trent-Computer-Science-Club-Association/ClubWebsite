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
export default function Event({ eventItem }: Props) {
  const now = new Date();
  const { title, href, open_date, date, image } = eventItem;
  const closed = open_date > now || href == '';
  const styleList = [styles.container];
  if (closed) styleList.push(styles.closed);
  const userFriendlyDate = moment(date).format('ddd MMM Do, yyyy');
  // Build ui
  const content = (
    <>
      {/* Background Image */}
      <Image src={image.src} alt={image.alt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        <span>{userFriendlyDate}</span>
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
