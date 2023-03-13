import styles from './Register.module.css'
import logo from '../../assets/logo-3-webp.webp'
import { Link } from "react-router-dom";


export default function Register() {
    return (
        <div id={styles["login-register-page"]}>

            <div className={styles["image-section-register"]}>
                <div className={styles["text-and-button"]}>
                    <span>You already have an account?</span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            </div>

            <div className={styles["login-register-section"]}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className={styles["login-register-form-wrapper"]}>
                    {/* {{ #if error }}
                    <p>{{ error }}</p>
                    {{/if}} */}
                    <form action="/auth/register" method="post">
                        <label><span>Username:</span></label>
                        <input type="text" name="username" />
                        <label><span>Password:</span></label>
                        <input type="password" name="password" />
                        <label><span>Repeat Password:</span></label>
                        <input type="password" name="repass" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};