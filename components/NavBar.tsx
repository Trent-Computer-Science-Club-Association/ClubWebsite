// CSS
import styles from '../styles/components/NavBar.module.scss';
// Config
import { pageInfo } from '../config.yaml';
// Components
import Button, { ButtonType } from '../components/Button';

// Component
interface Props {
  currentPage: string;
}
export default function NavBar(props: Props) {
  // Build The Nav
  const navContent: JSX.Element[] = [];
  pageInfo.forEach((page, index) => {
    if (!page.displayInNav) return;
    navContent.push(
      <li
        key={index}
        className={props.currentPage == page.pageName ? styles.currentPage : ''}
      >
        <Button
          type={ButtonType.NAVBAR}
          href={page.pageLink}
          className={`${
            props.currentPage === page.pageName
              ? 'text-active-1'
              : 'text-color-3'
          } bg-transparent hover:text-hover-1`}
        >
          {page.pageName}
        </Button>
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
