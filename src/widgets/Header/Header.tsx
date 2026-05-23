import { Link } from 'react-router-dom'
import styles from './header.module.css';
import Navigation from './Navigation/Navigation';
import { navigationLinks } from '../../entities/navigationlinks/navigationlinksData';

const Header = () => {//First code
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        {}
        <h3>Popenko.ru</h3>
      </Link>
      <Navigation links={navigationLinks} />
    </header>
  );
};

export default Header;