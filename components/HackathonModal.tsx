import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Image from '../components/Image';
import Link from 'next/link';
import styles from '../styles/components/HackathonModal.module.scss';
import { website_config } from '../config';

const MODAL_DISPLAY_INTERVAL = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

interface HackathonModalProps {
  onRequestClose: () => void;
}

const HackathonModal: React.FC<HackathonModalProps> = ({ onRequestClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    const fontFamilies = ['Orbitron', 'Poppins', 'Motorblock'];

    const imageUrls = [
      '/Hackathon/little-guy.png',
      '/Hackathon/top-left.svg',
      '/Hackathon/top-right.svg',
      '/Hackathon/bottom-left.svg',
    ];

    const loadFonts = async () => {
      try {
        await Promise.all(
          fontFamilies.map((family) => document.fonts.load(`1em "${family}"`))
        );
      } catch (error) {
        console.error('Failed to load fonts:', error);
      }
    };

    const loadImages = async () => {
      try {
        await Promise.all(
          imageUrls.map((url) => {
            return new Promise<void>((resolve, reject) => {
              const img = new window.Image();
              img.onload = () => resolve();
              img.onerror = () =>
                reject(new Error(`Failed to load image: ${url}`));
              img.src = url;
            });
          })
        );
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    Promise.all([loadFonts(), loadImages()])
      .then(() => setAssetsLoaded(true))
      .catch((error) => console.error('Failed to load assets:', error));
  }, []);

  useLayoutEffect(() => {
    const checkAndSetModalDisplay = () => {
      if (hasChecked.current) return;
      hasChecked.current = true;
      const lastViewed = localStorage.getItem('lastViewed');
      const currentTime = Date.now();
      if (
        !lastViewed ||
        currentTime - Number(lastViewed) > MODAL_DISPLAY_INTERVAL
      ) {
        setIsOpen(true);
      }
    };

    if (assetsLoaded) {
      checkAndSetModalDisplay();
    }
  }, [assetsLoaded]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('lastViewed', Date.now().toString());
    onRequestClose();
  };

  if (!assetsLoaded) {
    return null; // Don't render anything until assets are loaded
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel='Welcome Modal'
      className={styles.Modal}
      overlayClassName={styles.ModalOverlay}
    >
      <Link href={website_config.hackathon_url}>
        <div className={styles.modalImageContainer}>
          <Image
            src='/Hackathon/little-guy.png'
            alt='Modal Background'
            layout='fill'
            objectFit='fit'
          />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <div className={styles.topLeft}>
              <Image
                src='/Hackathon/top-left.svg'
                alt='Hackathon Top Left'
                fill={true}
              />
            </div>
            <div className={styles.topRight}>
              <Image
                src='/Hackathon/top-right.svg'
                alt='Hackathon Top Right'
                fill={true}
              />
            </div>
            <div className={styles.bottomLeft}>
              <Image
                src='/Hackathon/bottom-left.svg'
                alt='Hackathon Bottom Left'
                fill={true}
              />
            </div>
          </div>
          <h3>Join Us For</h3>
          <h2>
            <span>Hack</span>
            <span>Trent</span>
          </h2>
          <span>On November 8th-10th, 2024</span>
          <p>
            Electric City Hacks Returns as HackTrent for its 5th Edition in
            2024!
          </p>
        </div>
      </Link>
    </Modal>
  );
};

export default HackathonModal;
