import React from 'react';
import styles from '../styles/Contact.module.scss';
import { contact_page, website_config } from '../config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import ContactSection from '../layouts/ContactSection';
import EventBanner from '../components/EventBanner';
import SectionHeader from '../layouts/SectionHeader';
import Section, { Style, Alignment, getHeaderStyle } from '../layouts/Section';
export default function Home() {
  let i = 0; // Easy way to keep track of the section index
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

          <ListingsSection positions={contact_page.listings} />
          <Section sectionConfig={contact_page.sponsor_section} index={i++} />
          <SectionHeader
            title='Contact Us'
            className={getHeaderStyle(Style.Secondary)}
            alignment={Alignment.Right}
          />
          <ContactSection submissionURL={'/api/submitForm'} />
        </main>
        <Footer />
      </section>
    </>
  );
}
