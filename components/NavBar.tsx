// CSS
import styles from '../styles/components/NavBar.module.scss';
// Config
import { page_list } from '../config';
// Components
import Button, { ButtonType } from '../components/Button';

// Component
interface Props {
  currentPage: string;
}
export default function NavBar(props: Props) {
  // Build The Nav
  const navContent: JSX.Element[] = [];
  page_list.forEach((page, index) => {
    if (!page.display_in_navbar) return;
    navContent.push(
      <li
        key={index}
        className={props.currentPage == page.page_name ? styles.currentPage : ''}
      >
        <Button
          type={ButtonType.NAVBAR}
          href={page.page_link}
          className={
            props.currentPage == page.page_name
              ? ButtonType.NAVBAR_ACTIVE
              : ButtonType.NAVBAR
          }
          label={page.page_name}
        />
      </li>
    );
  });
  // Return Our Layout
  return (
    <nav className={styles.NavBar}>
      {/* TODO: LOGO */}
      <div className={styles.Icon}></div>
      {/* Navigation */}
      <ul className={styles.LinkArea}>{navContent}</ul>
    </nav>
  );
}
