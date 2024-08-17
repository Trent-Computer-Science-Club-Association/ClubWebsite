import React, { useState } from 'react';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import styles from '../styles/layouts/Listing.module.scss';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
import { Listing } from '../config.yaml';
import Link from 'next/link';

interface ListingsSectionProps {
  positions: Listing[];
  formData: Record<string, string>;
  onInputChange: (label: string, value: string) => void;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

const ListingType = {
  Developer: 'Developer',
  Creative: 'Creative',
  Managerial: 'Managerial',
  Volunteer: 'Volunteer',
} as const;

Modal.setAppElement('#__next');

const ListingsSection: React.FC<ListingsSectionProps> = ({
  positions = [],
  onInputChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const positionCards = positions.map((position, index) => {
    const isHighestPriority = position.priority === 1;
    let borderClass;
    switch (position.type) {
      case ListingType.Developer:
        borderClass = styles.developerBorder;
        break;
      case ListingType.Creative:
        borderClass = styles.creativeBorder;
        break;
      case ListingType.Managerial:
        borderClass = styles.managerialBorder;
        break;
      case ListingType.Volunteer:
        borderClass = styles.volunteerBorder;
        break;
    }
    if (isHighestPriority) {
      borderClass = styles.gradientBorder;
    }
    const card = (
      <div key={index} className={`${styles.card}`}>
        <h2 className={styles.cardTitle}>{position.title}</h2>
        <hr className={styles.cardDivider} />
        <p className={styles.cardDescription}>{position.description}</p>
        <ul className={styles.requirementsList}>
          {position.requirements.map((requirement, reqIndex) => (
            <li key={reqIndex} className={styles.requirementItem}>
              <Image
                src={requirement.iconPath || '/checkmark.svg'}
                alt={requirement.description}
                width={20}
                height={20}
                className={styles.requirementIcon}
              />
              <p>{requirement.description}</p>
            </li>
          ))}
        </ul>
        <Button
          type={ButtonType.LIGHT}
          onClick={() => handleModalOpen(position)}
          className={styles.learnMoreButton}
          label='Learn More'
        />
      </div>
    );
    return {
      priority: position.priority || Infinity,
      borderClass,
      card: (
        <div
          key={`border-${index}`}
          className={`${styles.border} ${borderClass}`}
        >
          {card}
        </div>
      ),
    };
  });

  const sortedListings = positionCards.sort((a, b) => a.priority - b.priority);

  const cardsPerRow = 3;
  const visibleListings = isExpanded
    ? sortedListings
    : sortedListings.slice(0, cardsPerRow);

  const hasMoreListings = sortedListings.length > cardsPerRow;

  const handleModalOpen = (position: Listing) => {
    setSelectedListing(position);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedListing(null);
    setIsModalOpen(false);
  };

  const handleApply = () => {
    onInputChange('Subject', selectedListing?.title || '');
    setIsModalOpen(false);
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.listingsSectionWrapper}>
      {positions.length === 0 ? (
        <div className={styles.noPositions}>
          <p>
            There are no positions open at the moment. Please follow our{' '}
            <Link href='https://www.linkedin.com/company/trent-computer-science-society'>
              LinkedIn
            </Link>{' '}
            for updates.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.listingsSection}>
            {visibleListings.map((position) => position.card)}
          </div>
          {hasMoreListings && (
            <button
              className={styles.expandButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <Image
                    src='/ChevronUp.svg'
                    alt='Expand'
                    width={20}
                    height={20}
                  />
                  Show Less
                </>
              ) : (
                <>
                  <Image
                    src='/ChevronDown.svg'
                    alt='Expand'
                    width={20}
                    height={20}
                  />
                  Show More
                </>
              )}
            </button>
          )}
        </>
      )}

      {selectedListing && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel={selectedListing.title}
          className={styles.modal}
          overlayClassName={styles.modalOverlay}
        >
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{selectedListing.title}</h2>
            <ReactMarkdown className={styles.modalDescription}>
              {selectedListing.modal || selectedListing.description}
            </ReactMarkdown>
            <ul className={styles.modalRequirementsList}>
              {selectedListing.requirements.map((requirement, reqIndex) => (
                <li key={reqIndex} className={styles.modalRequirementItem}>
                  <Image
                    src={requirement.iconPath || '/checkmark.svg'}
                    alt={requirement.description}
                    width={20}
                    height={20}
                    className={styles.requirementIcon}
                  />
                  <p>{requirement.description}</p>
                </li>
              ))}
            </ul>
            <div className={styles.modalButtonsContainer}>
              <Button
                type={ButtonType.LIGHT}
                onClick={handleModalClose}
                className={styles.modalButton}
                label='Close'
              />
              <Button
                type={ButtonType.LIGHT}
                onClick={handleApply}
                className={styles.modalButton}
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
