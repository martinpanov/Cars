import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';

export default function Navigation() {
    const [user] = useContext(UserContext);
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <header>
            <nav className={styles['navigation']}>
                {isActive ?
                    <div className={styles["mobile-menu-wrapper"]}>
                        <div className={styles["x-button-wrapper"]}>
                            <i onClick={toggleMenu} className={`fa-solid fa-xmark ${styles['x-button']}`}></i>
                        </div>
                        <ul className={styles['mobile-nav-links']} role='list'>
                            <li><Link onClick={toggleMenu} to="/">Home</Link></li>
                            <li><Link onClick={toggleMenu} to="/about">About</Link></li>
                            <li><Link onClick={toggleMenu} to="/catalog">Catalog</Link></li>
                            <li><Link onClick={toggleMenu} to="/rentcar">Rent Car</Link></li>
                            {!user ? (
                                <>
                                    <li><Link to="/login">Sell My Car</Link></li>
                                    <li><Link onClick={toggleMenu} to="/login">Login</Link></li>
                                    <li><Link onClick={toggleMenu} to="/register">Register</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/sell">Sell My Car</Link></li>
                                    <li><Link onClick={toggleMenu} to="/logout">Logout</Link></li>
                                    <li><Link onClick={toggleMenu} to="/myprofile">{user.username}</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                    :
                    <>
                        <Link className={styles['logo']} to="/"><img src='/assets/logo-no-background-webp.webp' width="200" height="30" alt="logo" /></Link>
                        <i onClick={toggleMenu} className={`fa-solid fa-bars ${styles["bars"]}`}></i>
                    </>}

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