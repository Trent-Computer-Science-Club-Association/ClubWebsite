import Image from './Image';
import styles from '../styles/components/BlurBanner.module.scss';

interface BaseProps {
  imagePath: string;
  altText: string;
  title: string;
}

const BlurBanner: React.FC<BaseProps> = (props) => {
  const { imagePath, altText, title } = props;

  return (
    <div className={styles.Container}>
      <Image src={imagePath} alt={altText} fill />
      <div className={styles.BlurBanner}>
        <div className={styles.imageContainer}>
          <Image src={imagePath} alt={altText} fill />
        </div>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BlurBanner;
