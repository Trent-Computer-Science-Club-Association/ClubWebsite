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

  const handleInputChange = (label: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    const { Email, Subject, Name, Message } = formData;
    const webhookUrl = 'DISCORD_WEBHOOK_URL_HERE';

    const webhookPayload = {
      content: `**Subject:** ${Subject}\n**Name:** ${Name}\n**Email:** ${Email}\n**Message:**\n${Message}`,
      username: 'TCSCA Contact Form',
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    }).catch((error) => {
      console.error('Error submitting to Discord webhook:', error);
    });

    if (response) {
      if (response.status === 204) {
        console.log('Form submitted successfully to Discord');
      } else if (response.status === 400) {
        console.error('Error: Bad request');
      } else if (response.status === 404) {
        console.error('Error: Webhook not found');
      } else if (response.status === 429) {
        console.error('Error: Rate limited');
      } else {
        console.error(`Error: Unknown (${response.status})`);
      }
    }

    return response;
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
        </main>
        <Footer />
      </section>
    </>
  );
}
