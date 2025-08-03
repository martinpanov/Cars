import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { MobileNavigation } from './MobileNavigation';

export const Navigation: React.FC = () => {
  const { user } = useContext(UserContext);

  const userBasedLinks = {
    login: { href: user ? "/logout" : "/login", text: user ? "Logout" : "Login" },
    register: { href: user ? "/myprofile" : "/register", text: user ? user.username : "Register" },
    sell: { href: user ? "/sell" : "/login", text: "Sell My Car" }
  };

  return (
    <header>
      <nav className={styles['navigation']}>
        <MobileNavigation userBasedLinks={userBasedLinks} />

        <ul className={styles['nav-links']} role='list'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/rentcar">Rent Car</Link></li>
          <li><Link to={userBasedLinks.sell.href}>{userBasedLinks.sell.text}</Link></li>
        </ul>

        <div className={styles["login-register"]}>
          <Link className={styles["login"]} to={userBasedLinks.login.href}>{userBasedLinks.login.text}</Link>
          <Link className={styles["register"]} to={userBasedLinks.register.href}>{userBasedLinks.register.text}</Link>
        </div>
      </nav>
    </header>
  );
};