import Image from './Image';
import styles from '../styles/components/BlurBanner.module.scss';

interface BaseProps {
  imagePath: string;
  altText: string;
  title: string;
  sectionHeader?: string;
}

const BlurBanner: React.FC<BaseProps> = ({
  imagePath,
  altText,
  title,
  sectionHeader,
}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.BlurBanner}>
        <div className={styles.imageContainer}>
          <Image src={imagePath} alt={altText} fill={true} />
        </div>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {sectionHeader && (
          <div className={styles.waveContainer}>
            <Image src={'wave.svg'} alt={'wave'} fill={true} />
            <div className={styles.sectionHeaderContainer}>
              <h2 className={styles.sectionHeader}>{sectionHeader}</h2>
              <hr className={styles.sectionHeaderUnderline} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlurBanner;
