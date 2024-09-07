// CSS
import styles from '../styles/components/EventBanner.module.scss';
// Config
import { website_config } from '../config';
import ReactMarkdown from 'react-markdown';

interface Props {
  color?: string;
}

export default function EventBanner({ color = 'event-banner' }: Props) {
  const { banner_text } = website_config;
  if (banner_text == undefined) return null;
  if (banner_text.length == 0) return null;

  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      {/* Event Content */}
      <div>
        <ReactMarkdown className={styles.Markdown}>{banner_text}</ReactMarkdown>
      </div>
    </div>
  );
}
