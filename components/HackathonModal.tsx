// What is this?
// For our hackathon, we wanted to have a extra way to display and grab the user's attention

// CSS
import styles from '../styles/components/HackathonModal.module.scss';
// Config
import { website_config } from '../config';
// Components
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from '../components/Image';
import Link from 'next/link';
import moment from 'moment';
// Images
import LittleGuy from '../public/Hackathon/little-guy.png';
import TopLeft from '../public/Hackathon/top-left.svg';
import TopRight from '../public/Hackathon/top-right.svg';
import BottomLeft from '../public/Hackathon/bottom-left.svg';
// Fonts - A collection of fonts used throughout the website from Utils
import { Fonts } from '../utils';

const MODAL_DISPLAY_INTERVAL = moment.duration(2, 'days').asMilliseconds(); // 2 days in milliseconds

const HackathonModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const rawLastViewed = localStorage.getItem('lastViewed');
    if (rawLastViewed == null) setIsOpen(true);

    const lastViewed = parseInt(rawLastViewed as string);
    const currentTime = moment().valueOf();

    if (currentTime - lastViewed > MODAL_DISPLAY_INTERVAL) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (isOpen)
      localStorage.setItem('lastViewed', moment().valueOf().toString());
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel='Welcome Modal'
      className={styles.Modal}
      overlayClassName={styles.ModalOverlay}
    >
      <Link
        href={website_config.hackathon_url}
        target='_blank'
        rel='noreferrer'
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
            Electric City Hacks Returns as HackTrent for its 5th Edition in
            2024!
          </p>
        </div>
      </Link>
    </Modal>
  );
};

export default HackathonModal;
