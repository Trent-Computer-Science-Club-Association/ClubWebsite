// CSS
import styles from '../styles/components/EventBanner.module.scss';
// Config
import config from '../config.yaml';
import ReactMarkdown from 'react-markdown';

interface Props {
  color?: string;
  contextKey?: keyof typeof config;
}

export default function EventBanner({
  color = 'event-banner',
  contextKey = 'bannerInfo',
}: Props) {
  const bannerInfo = config[contextKey];

  if (contextKey === 'bannerInfo') {
    const bannerInfoTyped = bannerInfo as typeof config.bannerInfo;
    if (!bannerInfoTyped || bannerInfoTyped.hidden) {
      return null;
    }

    const eventMarkdown = bannerInfoTyped.text;

    if (!eventMarkdown) {
      return null;
    }

    return (
      <div className={styles.EventBanner} style={{ backgroundColor: color }}>
        {/* Event Content */}
        <div className={styles.EventContent}>
          <ReactMarkdown className={styles.Markdown}>
            {eventMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return null;
}
