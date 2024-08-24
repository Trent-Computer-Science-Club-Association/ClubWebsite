import React, { useState } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/layouts/Listing.module.scss';
import modalStyles from '../styles/components/Modal.module.scss';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import { Listing, website_config } from '../config';
import Link from 'next/link';
import ListingCard from '../components/ListingCard';

interface ListingsSectionProps {
  positions?: Listing[];
  formData: Record<string, string>;
  onInputChange: (label: string, value: string) => void;
  onSubmit: (formData: Record<string, string>) => Promise<void | Response>;
}

// Set the app element for accessibility
Modal.setAppElement('#__next');

const ListingsSection: React.FC<ListingsSectionProps> = ({
  positions = [],
  onInputChange,
}) => {
  // State for expanded view and modal
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    listing: Listing | null;
  }>({
    isOpen: false,
    listing: null,
  });

  // Number of cards to display per row
  const cardsPerRow = 3;

  // Function to open/close the modal and set the current listing
  const setModal = (isOpen: boolean, listing: Listing | null = null) => {
    setModalState({ isOpen, listing: isOpen ? listing : modalState.listing });
  };

  // Handle the apply action
  const handleApply = () => {
    onInputChange('Subject', modalState.listing?.title ?? '');
    setModal(false);
    // Scroll to the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render content when there are no open positions
  const getNoPositionsContent = () => (
    <div className={styles.noPositions}>
      <p>
        There are no positions open at the moment. Please follow our&nbsp;
        <Link href={website_config.linkedin} target='_blank'>
          LinkedIn
        </Link>
        &nbsp; for updates.
      </p>
    </div>
  );

  // Render the list of visible listings
  const getListingsContent = (visibleListings: Listing[]) => (
    <div className={styles.listingsSection}>
      {visibleListings.map((position, index) => (
        <ListingCard
          key={index}
          position={position}
          onLearnMore={(position) => setModal(true, position)}
        />
      ))}
    </div>
  );

  // Render the expand/collapse button
  const getExpandButton = () => (
    <button
      className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles.expandButtonContent}>
        <div
          className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ''}`}
        >
          <FaChevronDown />
        </div>
        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
      </div>
    </button>
  );

  // Main function to get the content based on the current state
  const getContent = () => {
    if (positions.length === 0) {
      return getNoPositionsContent();
    }

    // Sort listings by priority (lower number = higher priority)
    const sortedListings = [...positions].sort(
      (a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity)
    );

    // Determine visible listings based on expanded state
    const visibleListings = isExpanded
      ? sortedListings
      : sortedListings.slice(0, cardsPerRow);

    return (
      <>
        {getListingsContent(visibleListings)}
        {positions.length > cardsPerRow && getExpandButton()}
      </>
    );
  };

  return (
    <div className={styles.listingsSectionWrapper}>
      {getContent()}
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={() => setModal(false)}
        contentLabel={modalState.listing?.title || ''}
        className={modalStyles.modal}
        overlayClassName={modalStyles.modalOverlay}
      >
        {modalState.listing && (
          <div className={modalStyles.modalContent}>
            <h2>{modalState.listing.title}</h2>
            <ReactMarkdown>
              {modalState.listing.modal ?? modalState.listing.description}
            </ReactMarkdown>
            <ul>
              {modalState.listing.requirements.map((requirement, reqIndex) => (
                <li key={reqIndex}>
                  <div className={modalStyles.requirementIcon}>
                    {requirement.icon ? <requirement.icon /> : <FaCheck />}
                  </div>
                  <p>{requirement.description}</p>
                </li>
              ))}
            </ul>
            <div className={modalStyles.buttonContainer}>
              <Button
                type={ButtonType.LIGHT}
                onClick={() => setModal(false)}
                label='Close'
              />
              <Button
                type={ButtonType.LIGHT}
                onClick={handleApply}
                label='Apply'
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListingsSection;
