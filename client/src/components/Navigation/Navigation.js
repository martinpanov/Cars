import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Navigation() {
    const [user] = useContext(UserContext);
    return (
        <header>
            <nav className={styles['navigation']}>
                <Link className={styles['logo']} to="/"><img src='/assets/logo-no-background-webp.webp' width="200" height="30" alt="logo" /></Link>

                <i className={`fa-solid fa-bars ${styles["bars"]}`}></i>

                <ul className={styles['nav-links']} role='list'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {user ? <li><Link to="/sell">Sell My Car</Link></li> : <li><Link to="/login">Sell My Car</Link></li>}
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/rentcar">Rent Car</Link></li>
                </ul>
                {!user ? (
                    <div className={styles["login-register"]}>
                        <Link className={styles["login"]} to="/login">Login</Link>
                        <Link className={styles["register"]} to="/register">Register</Link>
                    </div>
                ) : (
                    <div className={styles["login-register"]}>
                        <Link className={styles["login"]} to="/logout">Logout</Link>
                        <Link className={styles["register"]} to="/myprofile">{user.username}</Link>
                    </div>
                )}


            </nav>
        </header>
    );
}