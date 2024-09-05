import Image from './Image';
import styles from '../styles/components/BlurBanner.module.scss';

interface Props {
  imagePath: string;
  altText: string;
  title: string;
  sectionHeader?: string;
}

const BlurBanner: React.FC<Props> = ({
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
            <div>
              <h2>{sectionHeader}</h2>
              <hr />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlurBanner;
