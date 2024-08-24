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

Modal.setAppElement('#__next');

const ListingsSection: React.FC<ListingsSectionProps> = ({
  positions = [],
  onInputChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // number of cards per row
  const cardsPerRow = 3;

  const handleModalOpen = (position: Listing) => {
    setSelectedListing(position);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedListing(null);
    setIsModalOpen(false);
  };

  const handleApply = () => {
    onInputChange('Subject', selectedListing?.title ?? '');
    setIsModalOpen(false);
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderListings = () => {
    if (positions.length === 0) {
      return (
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
    }

    // this is sorting by priority from lowest to highest
    const sortedListings = [...positions].sort(
      (a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity)
    );
    const visibleListings = isExpanded
      ? sortedListings
      : sortedListings.slice(0, cardsPerRow);

    return (
      <>
        <div className={styles.listingsSection}>
          {visibleListings.map((position, index) => (
            <ListingCard
              key={index}
              position={position}
              onLearnMore={handleModalOpen}
            />
          ))}
        </div>
        {positions.length > cardsPerRow && (
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
        )}
      </>
    );
  };

  return (
    <div className={styles.listingsSectionWrapper}>
      {renderListings()}
      {selectedListing && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel={selectedListing.title}
          className={modalStyles.modal}
          overlayClassName={modalStyles.modalOverlay}
        >
          <div className={modalStyles.modalContent}>
            <h2>{selectedListing.title}</h2>
            <ReactMarkdown>
              {selectedListing.modal ?? selectedListing.description}
            </ReactMarkdown>
            <ul>
              {selectedListing.requirements.map((requirement, reqIndex) => (
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
                onClick={handleModalClose}
                label='Close'
              />
              <Button
                type={ButtonType.LIGHT}
                onClick={handleApply}
                label='Apply'
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ListingsSection;
