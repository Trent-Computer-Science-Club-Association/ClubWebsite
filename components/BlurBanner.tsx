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
      <div>
        <div>
          <Image src={imagePath} alt={altText} fill={true} />
        </div>
        <div>
          <h1>{title}</h1>
        </div>
        {sectionHeader && (
          <div>
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
