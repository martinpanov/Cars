import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/users";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { Form } from "../../components/Form/Form";
import { FormField } from "../../components/Form/FormField";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Login.module.css";
import { loginSchema } from "./schema";

export const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { isLoading, login } = useLoginMutation();

  const loginFormHandler = async (formData: FormData) => {
    const values = Object.fromEntries(formData.entries());
    const username = (values.username as string).trim();
    const password = (values.password as string).trim();

    const result = await login({ username, password });
    setUser({
      tokens: result.tokens,
      username: result.username,
      userId: result._id,
    });
    navigate("/");
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Flex className={styles["login-page"]}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={styles["login-page__content-section"]}
      >
        <Link to="/">
          <img
            src="/assets/logo-3.webp"
            alt="logo"
            className={styles["login-page__logo"]}
          />
        </Link>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="lg"
          className={styles["login-page__form-wrapper"]}
        >
          <Form
            onSubmit={loginFormHandler}
            schema={loginSchema}
            className={styles["login-page__form"]}
          >
            <FormField
              label={
                <Text size="md" color="black">
                  Username:
                </Text>
              }
              name="username"
              type="text"
              className={styles["login-page__input"]}
            />

            <FormField
              label={
                <Text size="md" color="black">
                  Password:
                </Text>
              }
              name="password"
              type="password"
              className={styles["login-page__input"]}
            />

            <Button variant="secondary" size="lg">
              Login
            </Button>
          </Form>

          <Text className={styles["login-page__mobile-link"]}>
            Don't have an account yet? <Link to="/register">Register</Link>
          </Text>
        </Flex>
      </Flex>

      <Flex
        justify="center"
        align="center"
        className={styles["login-page__image-section"]}
      >
        <img
          src="/assets/audi-login.webp"
          alt="Audi car - Login background"
          className={styles["login-page__background-image"]}
        />
        <Flex
          direction="column"
          align="center"
          gap="lg"
          className={styles["login-page__cta"]}
        >
          <Text
            tag="h1"
            size="2xl"
            color="secondary"
            className={styles["login-page__cta-heading"]}
          >
            Don't have an account yet?
          </Text>
          <Button variant="primary" size="lg" to="/register">
            Register
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
