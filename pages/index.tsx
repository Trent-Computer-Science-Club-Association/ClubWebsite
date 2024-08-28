import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { home_page, website_config } from '../config';
// Internal Components
import Image from '../components/Image';
import NavBar from '../components/NavBar';
import EventBanner from '../components/EventBanner';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import Section from '../layouts/Section';
import Link from 'next/link';

Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function Home() {
  const { sections } = home_page;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Check the referrer when the component mounts
    const referrer = document.referrer;
    if (!referrer.includes('tcsca.ca')) {
      setModalIsOpen(true);
    }
  }, []);

  const toggleModal = useCallback(() => {
    setModalIsOpen((prevState) => !prevState);
  }, []);

  const renderSections = useMemo(() => {
    return sections.map((section, i) => (
      <section key={i}>
        <Section sectionConfig={section} index={i} />
      </section>
    ));
  }, [sections]);

  const modalContent = useMemo(
    () => (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel='Welcome Modal'
        className={styles.Modal}
        overlayClassName={styles.ModalOverlay}
      >
        <Link href={website_config.hackathon}>
          <div className={styles.modalImageContainer}>
            <Image
              src='/Hackathon/little-guy.png'
              alt='Modal Background'
              layout='fill'
              objectFit='fit'
            />
          </div>
          <div className={styles.modalContent}>
            <div className={styles.imageContainer}>
              <div className={styles.topLeft}>
                <Image
                  src='/Hackathon/top-left.svg'
                  alt='Hackathon Top Left'
                  fill={true}
                />
              </div>
              <div className={styles.topRight}>
                <Image
                  src='/Hackathon/top-right.svg'
                  alt='Hackathon Top Right'
                  fill={true}
                />
              </div>
              <div className={styles.bottomLeft}>
                <Image
                  src='/Hackathon/bottom-left.svg'
                  alt='Hackathon Bottom Left'
                  fill={true}
                />
              </div>
            </div>
            <h3>Join Us For</h3>
            <h2>
              <span>Hack</span>
              <span>Trent</span>
            </h2>
            <span>On November 8th-10th, 2024</span>
            <p>
              Electric City Hacks Returns as HackTrent for its 5th Edition in
              2024!
            </p>
          </div>
        </Link>
      </Modal>
    ),
    [modalIsOpen, toggleModal]
  );

  // UI
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
          {/* In the config we have a list of sections, this is how we iterate through them */}
          {sections.map((section, i) => (
            <Section sectionConfig={section} index={i} key={i} />
          ))}
        </main>
        <Footer />
      </section>
      {modalContent}
    </>
  );
}
