import React from 'react';
import ReactMarkdown from 'react-markdown';
// CSS
import styles from '../styles/components/EventBanner.module.scss';
// Config
import { website_config } from '../config';

interface Props {
  color?: string;
}

export default function EventBanner({ color = 'event-banner' }: Props) {
  const { banner_text } = website_config;

  if (banner_text == undefined || banner_text.length === 0) return null;

  return (
    <div className={styles.EventBanner} style={{ backgroundColor: color }}>
      {/* Event Content */}
      <div className={styles.EventContent}>
        <ReactMarkdown className={styles.Markdown}>{banner_text}</ReactMarkdown>
      </div>
    </div>
  );
}
