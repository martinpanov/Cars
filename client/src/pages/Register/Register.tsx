import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { useRegisterMutation } from '../../api/users';
import styles from './Register.module.css';
import { PageSpinner } from '../../components/Spinner/PageSpinner';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { isLoading, register } = useRegisterMutation();
  const [errors, setErrors] = useState([]);

  const registerFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const username = (values.username as string).trim();
    const password = (values.password as string).trim();
    const repass = (values.repass as string).trim();

    try {
      const result = await register({ username, password, repass });
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
      <div className={styles["image-section"]}>
        <div className={styles["text-and-button"]}>
          <h1>You already have an account?</h1>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>

      <div className={styles["login-register-section"]}>
        <Link to="/">
          <img src='/assets/logo-3.webp' alt="logo" />
        </Link>
        <div className={styles["login-register-form-wrapper"]}>

          <div className={styles["errors"]}>
            {errors.length > 0 ? errors.map((error, index) => <p key={index}>{error}</p>) : <p>{errors}</p>}
          </div>

          <form action="/register" method="post" onSubmit={registerFormHandler}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" />
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" />
            <label htmlFor="repass">Repeat Password:</label>
            <input id="repass" type="password" name="repass" />
            <button>Register</button>
          </form>
          <p>You already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};