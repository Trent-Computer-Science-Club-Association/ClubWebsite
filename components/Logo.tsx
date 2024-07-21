import Link from 'next/link';
import Image from '@/components/Image';
import styles from '../styles/components/Logo.module.scss';

interface LogoProps {
  href?: string;
}

export default function Logo({ href = '/' }: LogoProps) {
  return (
    <Link href={href} className={styles.logo} prefetch={true}>
      <Image src='/logo.svg' alt='TCSCA Logo' fill={true} />
    </Link>
  );
}
