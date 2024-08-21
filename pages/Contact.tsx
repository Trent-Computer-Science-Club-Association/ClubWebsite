import React, { useState } from 'react';
import styles from '../styles/About.module.scss';
import { contact_page, website_config } from '../config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import TextSection, { TextSectionStyle } from '../layouts/TextSection';
import SectionHeader, {
  SectionHeaderStyle,
  SectionLocation,
} from '../layouts/SectionHeader';
import ContactSection from '../layouts/ContactSection';

export default function Home() {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (label: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <>
      <NavBar currentPage='Apply' />
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
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
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
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </main>
        <Footer />
      </section>
    </>
  );
}
