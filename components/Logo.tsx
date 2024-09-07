import Link from 'next/link';
import Image from './Image';
import styles from '../styles/components/Logo.module.scss';

interface LogoProps {
  href?: string;
  priority?: boolean;
}

export default function Logo({ href = '/', priority = false }: LogoProps) {
  return (
    <Link href={href} className={styles.container}>
      <div>
        <Image
          src='/logo.svg'
          alt='TCSCA Logo'
          fill={true}
          priority={priority}
        />
      </div>
    </Link>
  );
}
