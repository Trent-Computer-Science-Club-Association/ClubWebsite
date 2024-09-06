import Button, { ButtonType } from '../components/Button';
import styles from '../styles/components/ListingCard.module.scss';
import { Listing, ContactSubject } from '../config';
import DynamicIcon from '../components/DynamicIcon';

interface ListingCardProps {
  position: Listing;
  onLearnMore: (position: Listing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ position, onLearnMore }) => {
  const isHighestPriority = position.priority === 1;
  const borderClass = isHighestPriority ? styles.gradientBorder : '';

  const getUnderlineClass = (type: ContactSubject) => {
    const baseClass = styles.underline;
    switch (type) {
      case ContactSubject.Development:
        return `${baseClass} ${styles.developerUnderline}`;
      case ContactSubject.Creative:
        return `${baseClass} ${styles.creativeUnderline}`;
      case ContactSubject.Managerial:
        return `${baseClass} ${styles.managerialUnderline}`;
      case ContactSubject.Volunteering:
        return `${baseClass} ${styles.volunteerUnderline}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={`${styles.border} ${borderClass}`}>
      <div className={styles.card}>
        <h2>{position.title}</h2>
        <hr className={getUnderlineClass(position.type)} />
        <p>{position.description}</p>
        <ul>
          {position.requirements.map((requirement, reqIndex) => (
            <li key={reqIndex}>
              <div className={styles.requirementIcon}>
                <DynamicIcon iconName={requirement.icon} />
              </div>
              <p>{requirement.description}</p>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => onLearnMore(position)}
          className={styles.learnMoreButton}
          type={ButtonType.LIGHT}
          label='Learn More'
        />
      </div>
    </div>
  );
};

export default ListingCard;
