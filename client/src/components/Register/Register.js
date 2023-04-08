import styles from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { register } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';


export default function Register() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
        repass: ''
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

    const registerFormHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await register({ username: values.username, password: values.password, repass: values.repass });
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

            <div className={styles["image-section-register"]}>
                <div className={styles["text-and-button"]}>
                    <span>You already have an account?</span>
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
                        <label><span>Username:</span></label>
                        <input type="text" name="username" value={values.username} onChange={changeHandler} />
                        <label><span>Password:</span></label>
                        <input type="password" name="password" value={values.password} onChange={changeHandler} />
                        <label><span>Repeat Password:</span></label>
                        <input type="password" name="repass" value={values.repass} onChange={changeHandler} />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};