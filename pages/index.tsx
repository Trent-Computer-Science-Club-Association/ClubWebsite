import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { website_config, home_page } from '../config';
// Internal Components
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import Section from '../layouts/Section';
import HackathonModal from '../components/HackathonModal';

export default function Home() {
  const { sections } = home_page;

  // In the config we have a list of sections, this is how we iterate through them
  const renderSections = sections.map((section, i) => (
    <Section sectionConfig={section} index={i} key={i} />
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
          {renderSections}
        </main>
        <Footer />
      </section>
      <HackathonModal />
    </>
  );
}
