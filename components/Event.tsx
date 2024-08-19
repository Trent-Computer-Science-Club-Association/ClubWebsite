// Style
import styles from '../styles/components/Event.module.scss';
// Components
import Link from 'next/link';
// Internal Components
import Image from './Image';

interface EventProps {
  title: string;
  href: string;
  openDate: Date;
  date: Date;
  image: string;
  imageAlt: string;
}

export default function Event({ title, href, openDate, date, image, imageAlt }: EventProps) {
  // TODO: Logic to figure out if we are an open event
  // TODO: Format the date neatly
  const userFriendlyDate = date.toDateString();
  return (
    <Link href={href} className={styles.container}>
      {/* Background Image */}
      <Image src={image} alt={imageAlt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        {/* Date  */}
        <span>{userFriendlyDate}</span>
      </div>
    </Link>
  );
}
