import styles from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { login } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';


export default function Login() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (user) {
            return navigate('/');
        }
    }, [user, navigate]);

    const changeHandler = (e) => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    };
    
    const loginFormHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ username: values.username, password: values.password });
            setUser({
                accessToken: result.accessToken.accessToken,
                username: result.username,
                userId: result._id
            });
            navigate('/');
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <div id={styles["login-register-page"]}>
            <div className={styles["login-register-section"]}>
                <Link to="/">
                    <img src='/assets/logo-3-webp.webp' alt="logo" />
                </Link>
                <div className={styles["login-register-form-wrapper"]}>
                    <div className={styles["errors"]}>
                        {errors.length > 0 ? errors.map((error, index) => <p key={index}>{error}</p>) : <p>{errors}</p>}
                    </div>
                    <form action="/auth/login" method="post" onSubmit={loginFormHandler} >
                        <label><span>Username:</span></label>
                        <input type="text" name="username" onChange={changeHandler} />
                        <label><span>Password:</span></label>
                        <input type="password" name="password" onChange={changeHandler} />
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