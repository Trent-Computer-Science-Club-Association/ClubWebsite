// CSS
import styles from '../styles/components/EventBanner.module.scss';
// Config
import { bannerInfo } from '../config.yaml';
import ReactMarkdown from 'react-markdown';

interface Props {
  color?: string;
}

export default function EventBanner({ color }: Props) {
  const eventMarkdown = bannerInfo[0].text;

  // set the color to be the color if it is provided, otherwise default to the tailwind color for event-banner
  const bannerColor = color ? color : 'event-banner';

  return (
    <div
      className={styles.EventBanner}
      style={{ backgroundColor: bannerColor }}
    >
      {/* Event Content */}
      <div className={styles.EventContent}>
        <ReactMarkdown children={eventMarkdown} className={styles.Markdown} />
      </div>
    </div>
  );
}
