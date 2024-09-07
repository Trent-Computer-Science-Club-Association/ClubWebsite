import { useState } from 'react';
import styles from '../styles/components/NavBar.module.scss';
import { page_list } from '../config';
import Button, { ButtonStyle, ButtonModifier } from '../components/Button';
import Logo from '../components/Logo';

interface Props {
  currentPage: string;
}

export default function NavBar(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContent = page_list
    .filter((page) => page.display_in_navbar)
    .map((page, index) => (
      <li key={index}>
        <Button
          buttonStyle={ButtonStyle.NavButton}
          buttonModifiers={
            props.currentPage === page.page_name ? [ButtonModifier.Active] : []
          }
          href={page.page_link}
          label={page.page_name}
        />
      </li>
    ));

  return (
    <nav className={styles.container}>
      <span className={styles.logo}>
        <Logo priority={true} />
      </span>
      <Button
        className={styles.menuToggle}
        buttonStyle={ButtonStyle.NavToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        label={isMenuOpen ? 'Close' : 'Menu'}
      />
      <ul className={isMenuOpen ? styles.open : ''}>{navContent}</ul>
    </nav>
  );
}
