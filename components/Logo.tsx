import Link from 'next/link';
import Image from './Image';
import styles from '../styles/components/Logo.module.scss';

interface LogoProps {
  href?: string;
}

export default function Logo({ href = '/' }: LogoProps) {
  return (
    <Link href={href} className={styles.container} prefetch={true}>
      <div>
        <Image
          src='/logo.svg'
          alt='TCSCA Logo'
          fill={true}
        />
      </div>
    </Link>
  );
}
