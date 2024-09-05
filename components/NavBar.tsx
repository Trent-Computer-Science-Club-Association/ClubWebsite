import { useState } from 'react';
import styles from '../styles/components/NavBar.module.scss';
import { page_list } from '../config';
import Button, { ButtonType } from '../components/Button';
import Logo from '../components/Logo';

interface Props {
  currentPage: string;
}

export default function NavBar(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContent = page_list
    .filter((page) => page.display_in_navbar)
    .map((page, index) => (
      <li
        key={index}
        className={`${props.currentPage === page.page_name ? styles.currentPage : ''} w-full md:w-auto`}
      >
        {props.currentPage === page.page_name ? (
          <Button
            type={ButtonType.NAVBAR_ACTIVE}
            href={page.page_link}
            className={styles.navBtn}
            label={page.page_name}
          />
        ) : (
          <Button
            type={ButtonType.NAVBAR}
            href={page.page_link}
            className={styles.navBtn}
            label={page.page_name}
          />
        )}
      </li>
    ));

  return (
    <nav className={styles.NavBar}>
      <div className={styles.LogoContainer}>
        <Logo />
      </div>
      <button
        className={styles.MenuToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>
      <ul className={`${styles.LinkArea} ${isMenuOpen ? styles.MenuOpen : ''}`}>
        {navContent}
      </ul>
    </nav>
  );
}
