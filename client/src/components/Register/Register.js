import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

import { register } from '../../services/authService';

import styles from './Register.module.css';
import PageSpinner from '../Spinner/PageSpinner';

export default function Register() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
        repass: ''
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

    const registerFormHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const result = await register({ username: values.username, password: values.password, repass: values.repass });
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

                    <div className={styles["image-section"]}>
                        <div className={styles["text-and-button"]}>
                            <h1>You already have an account?</h1>
                            <Link to="/login"><button>Login</button></Link>
                        </div>
                    </div>

                    <div className={styles["login-register-section"]}>
                        <Link to="/">
                            <img src='/assets/logo-3-webp.webp' alt="logo" />
                        </Link>
                        <div className={styles["login-register-form-wrapper"]}>

                            <div className={styles["errors"]}>
                                {errors.length > 0 ? errors.map((error, index) => <p key={index}>{error}</p>) : <p>{errors}</p>}
                            </div>

                            <form action="/register" method="post" onSubmit={registerFormHandler}>
                                <label htmlFor="username">Username:</label>
                                <input id="username" type="text" name="username" value={values.username} onChange={changeHandler} />
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" name="password" value={values.password} onChange={changeHandler} />
                                <label htmlFor="repass">Repeat Password:</label>
                                <input id="repass" type="password" name="repass" value={values.repass} onChange={changeHandler} />
                                <button>Register</button>
                            </form>
                            <p>You already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};