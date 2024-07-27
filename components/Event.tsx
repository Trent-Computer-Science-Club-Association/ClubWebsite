// Style
import styles from '../styles/components/Event.module.scss';
// Internal Components
import Image from './Image';


interface EventProps {
  title: string;
  openDate: Date;
  date: Date;
  image: string;
  imageAlt: string;
}

export default function Event({ title, date, image, imageAlt }: EventProps) {
  // TODO: Add link
  // TODO: Logic to figure out if we are an open event
  // TODO: Format the date neatly
  const userFriendlyDate = date.toDateString();
  return (
    <div className={styles.container}>
      {/* Background Image */}
      <Image src={image} alt={imageAlt} fill />
      {/* Content */}
      <div>
        <h3>{title}</h3>
        {/* Date  */}
        <span>{userFriendlyDate}</span>
      </div>
    </div>
  );
}
