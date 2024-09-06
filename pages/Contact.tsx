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
import { type SubmissionResponse } from '../components/ContactForm';
import ContactSection from '../layouts/ContactSection';
import { processFormData } from '../pages/api/submitForm';

export default function Home() {
  const [dropDownValue, setDropDownValue] = useState<
    ContactSubject | undefined
  >(undefined);

  const handleSubmit = async (
    formData: Record<string, string>
  ): Promise<SubmissionResponse> => {
    const validFormData = processFormData(formData);
    if (validFormData == undefined) {
      // Invalid Form Submission
      return {
        success: false,
        status: 500, // Unknown Response
        message: `Impossible Invalid Payload Provided, Please Contact ${website_config.email}.`,
      };
    } else {
      // Submit Our Form
      try {
        const response = await fetch('/api/submitForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validFormData),
        });
        // Build A Blanket Response
        const submissionResponse: SubmissionResponse = {
          success: false,
          status: response.status,
          message: 'An unknown error occurred. Please try again.',
        };
        // Process the response
        if (response.status == 200 && response.ok) {
          const data = await response.json();
          if ('message' in data && typeof data.message === 'string') {
            submissionResponse.success = true;
            submissionResponse.message = data.message;
          }
        }
        return submissionResponse;
      } catch (e) {
        console.error('Failed to submit form, unhandled error', e);
        return {
          success: false,
          status: 500, // Unknown Response
          message: 'An unknown error occurred. Please try again.',
        };
      }
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
