import React, { useState } from 'react';
import styles from '../styles/About.module.scss';
import { contact_page, website_config } from '../config';
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
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleInputChange = (label: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    setSubmitError(null);
    setSubmitSuccess(false);
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
        setSubmitSuccess(true);
        return response;
      } else {
        console.error('Error response:', data);
        setSubmitError(data.message || 'Error submitting form');
        throw new Error(data.message || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(
        (error as Error).message || 'An unexpected error occurred'
      );
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
          {submitError && (
            <div className={styles.errorMessage}>
              Error submitting form: {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className={styles.successMessage}>
              Form submitted successfully!
            </div>
          )}
        </main>
        <Footer />
      </section>
    </>
  );
}
