// What is this?
// This modal is a temporary modal for the Trent Hacks 2024 Hackathon.

// CSS
import styles from '../styles/components/HackathonModal.module.scss';
// Config
import { website_config } from '../config';
// Components
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from '../components/Image';
import moment from 'moment';
import Button from '../components/Button';
// Images
import LittleGuy from '../public/Hackathon/little-guy.png';
import TopLeft from '../public/Hackathon/top-left.svg';
import TopRight from '../public/Hackathon/top-right.svg';
import BottomLeft from '../public/Hackathon/bottom-left.svg';
// Fonts - A collection of fonts used throughout the website from Utils
import { Fonts } from '../utils';

// We only want to show the modal to the user if it has been `2` days since they last saw it.
const MODAL_DISPLAY_INTERVAL = moment.duration(2, 'days').asMilliseconds(); // 2 days in milliseconds

const HackathonModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const rawLastViewed = localStorage.getItem('TrentHacksModalLastViewed');

    if (rawLastViewed == null) {
      setIsOpen(true);
    } else {
      const lastViewed = parseInt(rawLastViewed);
      if (isNaN(lastViewed)) setIsOpen(true);
      const timeDiff = moment().valueOf() - parseInt(rawLastViewed);
      setIsOpen(timeDiff > MODAL_DISPLAY_INTERVAL);
    }

    if (isOpen)
      localStorage.setItem(
        'TrentHacksModalLastViewed',
        moment().valueOf().toString()
      );
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel='Welcome Modal'
      className={styles.Modal}
      overlayClassName={styles.ModalOverlay}
    >
      <div className={styles.modalImageContainer}>
        <Image
          src={LittleGuy}
          alt='Modal Background'
          layout='fill'
          objectFit='fit'
        />
      </div>
      <div className={styles.modalContent}>
        <span className={styles.imageContainer}>
          <span>
            <Image src={TopLeft} alt='Hackathon Top Left' fill={true} />
          </span>
          <span>
            <Image src={TopRight} alt='Hackathon Top Right' fill={true} />
          </span>
          <span>
            <Image src={BottomLeft} alt='Hackathon Bottom Left' fill={true} />
          </span>
        </span>
        <h3 className={Fonts.Orbitron}>Join Us For</h3>
        <h2>
          <span>Hack</span>
          <span>Trent</span>
        </h2>
        <span>On November 8th-10th, 2024</span>
        <p className={Fonts.Poppins}>
          Electric City Hacks Returns as HackTrent for its 5th Edition in 2024!
        </p>
        <div className={styles.buttonContainer}>
          <Button label='Learn More' href={website_config.hackathon_url} />
          <Button label='Close' onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </Modal>
  );
};

export default HackathonModal;
