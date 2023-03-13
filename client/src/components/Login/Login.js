import styles from './Login.module.css'
import logo from '../../assets/logo-3-webp.webp'
import { Link } from "react-router-dom";


export default function Login() {
    return (
        <div id={styles["login-register-page"]}>
            <div className={styles["login-register-section"]}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className={styles["login-register-form-wrapper"]}>
                    {/* {{ #if error }}
                    <p>{{ error }}</p>
                    {{/if}} */}
                    <form action="/auth/login" method="post">
                        <label><span>Username:</span></label>
                        <input type="text" name="username" />
                            <label><span>Password:</span></label>
                            <input type="password" name="password" />
                            <button>Login</button>
                    </form>
                </div>
                </div>

                <div className={styles["image-section"]}>
                    <div className={styles["text-and-button"]}>
                        <span>Don't have an account yet?</span>
                        <Link to="/register"><button>Register</button></Link>
                    </div>
                </div>
            </div>
    );
};