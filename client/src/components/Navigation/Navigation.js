import { Link } from "react-router-dom";
import styles from './Navigation.module.css';
import logo from '../../assets/logo-no-background-webp.webp'

export default function Navigation() {
    return (
        <nav>

            <div className={styles.logo}><Link to="/"><img src={logo} width="200" height="30" alt="logo" /></Link></div>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/sell">Sell My Car</Link></li>
                <li><Link to="/search">Buy A Car</Link></li>
                <li><Link to="/auth/logout">Logout</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}