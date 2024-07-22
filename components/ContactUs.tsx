import { contactUs, heroIcons, email } from '../config.yaml';
import Image from '../components/Image';
import Button, { ButtonType } from '../components/Button';
import Link from '../components/Link';
import { Fragment } from 'react';
import styles from '../styles/components/ContactUs.module.scss';

export default function ContactUs() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Contact Us</h1>
        <div className={styles.socialMedia}>
          {heroIcons.map((icon) => (
            <Button key={icon.altText} type={ButtonType.SOCIAL}>
              <Image
                key={icon.altText}
                src={icon.path}
                alt={icon.altText}
                width={50}
                height={50}
                className={styles.icon}
              />
            </Button>
          ))}
        </div>
        <Button type={ButtonType.LIGHT} className={styles.applyButton}>
          Apply
        </Button>
      </div>
      <div className={styles.right}>
        <p className={styles.text}>
          {contactUs.text.split('*contactEmail').map((part, index, array) =>
            index < array.length - 1 ? (
              <Fragment key={index}>
                {part}
                <Link href={`${email}`} className={styles.link}>
                  {email}
                </Link>
              </Fragment>
            ) : (
              part
            )
          )}
        </p>
      </div>
    </div>
  );
}
