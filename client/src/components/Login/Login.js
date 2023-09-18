import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

import { login } from '../../services/authService';

import styles from './Login.module.css';
import PageSpinner from '../Spinner/PageSpinner';

export default function Login() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const result = await login({ username: values.username, password: values.password });
            setUser({
                accessToken: result.accessToken.accessToken,
                username: result.username,
                userId: result._id
            });
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            setErrors(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? <PageSpinner /> :
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
                                <label htmlFor="username">Username:</label>
                                <input id="username" type="text" name="username" onChange={changeHandler} />
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" name="password" onChange={changeHandler} />
                                <button>Login</button>
                            </form>
                            <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                        </div>
                    </div>

                    <div className={styles["image-section"]}>
                        <div className={styles["text-and-button"]}>
                            <h1>Don't have an account yet?</h1>
                            <Link to="/register"><button>Register</button></Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};