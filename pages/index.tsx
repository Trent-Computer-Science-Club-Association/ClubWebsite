import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { home_page } from '../config';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import Section from '../layouts/Section';
import HackathonModal from '../components/HackathonModal';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function Home() {
  const { sections } = home_page;

  const renderSections = sections.map((section, i) => (
    <section key={i}>
      <Section sectionConfig={section} index={i} />
    </section>
  ));

  return (
    <>
      <Head>
        <title key='title'>{`Home | ${website_config.meta.title}`}</title>
      </Head>
      <EventBanner />
      <NavBar currentPage='Home' />
      <section className={styles.container}>
        <main className={styles.MainArea}>
          <HeroBanner />
          {/* In the config we have a list of sections, this is how we iterate through them */}
          {sections.map((section, i) => (
            <Section sectionConfig={section} index={i} key={i} />
          ))}
        </main>
        <Footer />
      </section>
      <HackathonModal onRequestClose={() => {}} />
    </>
  );
}
