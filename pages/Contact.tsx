import React, { useState } from 'react';
import styles from '../styles/About.module.scss';
import { contact_page, website_config, type ContactSubject } from '../config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import TextSection, { TextSectionStyle } from '../layouts/TextSection';
import EventBanner from '../components/EventBanner';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from '../layouts/SectionHeader';
import ContactSection from '../layouts/ContactSection';

export default function Home() {
  const [dropDownValue, setDropDownValue] = useState<
    ContactSubject | undefined
  >(undefined);

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully');
        return response;
      } else {
        console.error('Error response:', data);
        throw new Error(data.message || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

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
          <ListingsSection
            positions={contact_page.listings}
            setDropDownValue={setDropDownValue}
          />
          <SectionHeader
            title='Become a Sponsor'
            style={SectionHeaderStyle.primary}
            location={SectionLocation.RIGHT_ALIGNED}
          />
          <div className={styles.sponsorButton}>
            <TextSection
              section={contact_page.sponsor_section}
              style={TextSectionStyle.primary}
            />
          </div>
          <SectionHeader
            title='Contact Us'
            style={SectionHeaderStyle.secondary}
            location={SectionLocation.LEFT_ALIGNED}
          />
          <ContactSection
            dropDownValue={dropDownValue}
            onSubmit={handleSubmit}
          />
        </main>
        <Footer />
      </section>
    </>
  );
}
