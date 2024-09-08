import React from 'react';
import styles from '../styles/Contact.module.scss';
import { contact_page, website_config } from '../config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import EventBanner from '../components/EventBanner';
import Section from '../layouts/Section';
export default function Home() {
  const { sections } = contact_page;
  return (
    <>
      <EventBanner />
      <NavBar currentPage='Contact Us' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <BlurBanner
            imagePath='/FaryonBridge.jpg'
            altText='About Us Image'
            title={website_config.title}
            sectionHeader='Positions'
          />
          {/* In the config we have a list of sections, this is how we iterate through them */}
          {sections.map((section, i) => (
            <Section sectionConfig={section} index={i + 1} key={i} />
          ))}
        </main>
        <Footer />
      </section>
    </>
  );
}
