// Style
import styles from '../styles/components/Event.module.scss';
// Components
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
  const styleList = [];
  if (closed) styleList.push(styles.closed);
  const userFriendlyDate = date.toDateString();
  // Build ui
  const content = (
    <>
      {/* Background Image */}
      <Image src={image.src} alt={image.alt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        {/* Date  */}
        <span>{userFriendlyDate}</span>
      </div>
    </>
  );
  const classList = [styles.container, ...styleList].join(' ');
  if (closed) {
    return (
      <Link href={href} className={classList}>
        {content}
      </Link>
    );
  } else {
    return <div className={classList}>{content}</div>;
  }
}
