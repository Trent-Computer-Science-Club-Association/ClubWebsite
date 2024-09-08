import React, { useState } from 'react';
import styles from '../styles/Contact.module.scss';
import { contact_page, website_config, ContactSubject } from '../config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import ContactSection from '../layouts/ContactSection';
import EventBanner from '../components/EventBanner';
import { type SubmissionResponse } from '../components/ContactForm';
import SectionHeader from '../layouts/SectionHeader';
import Section, { Style, Alignment, getHeaderStyle } from '../layouts/Section';
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

  // HACK: This module requires some state extension which would not normally be possible we do this with dependency injection
  const buttonConfig = contact_page.sponsor_section;
  if (buttonConfig.button != undefined) {
    buttonConfig.button.onClick = () => {
      setDropDownValue(ContactSubject.Sponsor);
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

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
          <ListingsSection
            positions={contact_page.listings}
            setDropDownValue={setDropDownValue}
          />
          <Section sectionConfig={buttonConfig} index={i++} />
          <SectionHeader
            title='Contact Us'
            className={getHeaderStyle(Style.Secondary)}
            alignment={Alignment.Right}
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
