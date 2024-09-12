import React, { useState } from 'react';
import styles from '../styles/layouts/ListingSection.module.scss';
import modalStyles from '../styles/components/Modal.module.scss';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import Button from '../components/Button';
import ListingCard, { getIcon } from '../components/ListingCard';
import { website_config, type ListingSection, type Listing } from '../config';

const CARD_COUNT = 3; // We render 3 cards per line

// Set the app element for accessibility
Modal.setAppElement('#__next');

interface Props {
  section: ListingSection;
  className?: string;
}
const ListingSection = ({ section, className }: Props) => {
  const [cardCount, setCardCount] = useState<number>(CARD_COUNT);
  const [modalState, setModalState] = useState<Listing | undefined>(undefined);

  const { listings } = section;
  // Return a default message if empty
  if (listings.length == 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>
          There are no positions open at the moment. Please follow our&nbsp;
          <Link href={website_config.linkedin} target='_blank'>
            LinkedIn
          </Link>
          &nbsp; for updates.
        </p>
      </div>
    );
  }
  // Get first three listings if able too
  const sortedListings = [...listings].sort((a, b) => a.priority - b.priority);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.cardGrid}>
        {sortedListings.slice(0, cardCount).map((listing, index) => (
          <ListingCard
            key={index}
            position={listing}
            onLearnMore={(position) => setModalState(position)}
          />
        ))}
      </div>
      <div>
        {sortedListings.length > CARD_COUNT && (
          <Button
            className={styles.loadMoreButton}
            label={cardCount == CARD_COUNT ? 'Show More' : 'Show Less'}
            onClick={() =>
              setCardCount((currentValue) =>
                currentValue == CARD_COUNT ? Infinity : CARD_COUNT
              )
            }
          />
        )}
      </div>
      <Modal
        isOpen={modalState != undefined}
        onRequestClose={() => setModalState(undefined)}
        contentLabel={modalState?.title ?? ''}
        className={modalStyles.modal}
        overlayClassName={modalStyles.modalOverlay}
      >
        {modalState && (
          <div className={modalStyles.modalContent}>
            <h2>{modalState.title}</h2>
            <ReactMarkdown>
              {modalState.modal ?? modalState.description}
            </ReactMarkdown>
            <ul>
              {modalState.requirements.map((requirement, reqIndex) => (
                <li key={reqIndex}>
                  <div className={modalStyles.requirementIcon}>
                    {getIcon(requirement.icon)}
                  </div>
                  <p>{requirement.description}</p>
                </li>
              ))}
            </ul>
            <div className={modalStyles.buttonContainer}>
              <Button onClick={() => setModalState(undefined)} label='Close' />
              <Button
                href={`?subject=${modalState.type}`}
                onClick={() => setModalState(undefined)}
                label='Apply'
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListingSection;
