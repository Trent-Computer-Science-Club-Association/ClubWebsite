import React, { useState } from 'react';
import styles from '../styles/About.module.scss';
import config from '../config.yaml';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlurBanner from '../components/BlurBanner';
import ListingsSection from '../layouts/ListingsSection';
import TextSection from '../layouts/TextSection';
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
            title='Trent Computer Science Club Association'
            sectionHeader='Positions'
          />
          <ListingsSection
            positions={config.listings}
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
              imagePath='/SponsorImage.jpg'
              title='Why Become a Sponsor?'
              altText='Why To Become a Sponsor?'
              text="By sponsoring our computer science club, you'll gain valuable exposure to a talented pool of future tech leaders. Your support will help us provide cutting-edge resources and opportunities for our members, strengthening the local tech community."
              buttonText='Become a Sponsor'
              link=''
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
