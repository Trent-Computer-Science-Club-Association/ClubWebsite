// CSS
import styles from "../styles/components/EventBanner.module.scss";
// Config
import * as config from "../config.yaml";
import ReactMarkdown from "react-markdown";

interface Props {
  color?: string;
  contextKey?: string;
}

export default function EventBanner({ color, contextKey }: Props) {
  if (contextKey == null) {
    contextKey = "bannerInfo";
  }

  const bannerInfo = config[contextKey];
  const eventMarkdown = bannerInfo[0].text;
  const hideBanner = bannerInfo[0]?.hidden || false;
  const bannerColor = color ? color : "event-banner";

  if (hideBanner) {
    return null;
  }

  if (eventMarkdown == null) {
    return null;
  }

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
