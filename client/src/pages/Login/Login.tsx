import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../api/users';
import { UserContext } from '../../contexts/UserContext';
import styles from './Login.module.css';
import { PageSpinner } from '../../components/Spinner/PageSpinner';

export const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { isLoading, login } = useLoginMutation();

  const loginFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const username = (values.username as string).trim();
    const password = (values.password as string).trim();

    try {
      const result = await login({ username, password });
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

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <div id={styles["login-register-page"]}>
      <div className={styles["login-register-section"]}>
        <Link to="/">
          <img src='/assets/logo-3.webp' alt="logo" />
        </Link>
        <div className={styles["login-register-form-wrapper"]}>
          <div className={styles["errors"]}>
            {errors.length > 0 ? errors.map((error, index) => <p key={index}>{error}</p>) : <p>{errors}</p>}
          </div>
          <form action="/auth/login" method="post" onSubmit={loginFormHandler} >
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" />
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" />
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
  );
};