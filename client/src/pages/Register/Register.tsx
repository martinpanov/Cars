import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../api/users";
import { Button } from "../../components/Button/Button";
import { Flex } from "../../components/Flex/Flex";
import { Form } from "../../components/Form/Form";
import { FormField } from "../../components/Form/FormField";
import { PageSpinner } from "../../components/Spinner/PageSpinner";
import { Text } from "../../components/Text/Text";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Register.module.css";
import { registerSchema } from "./schema";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { isLoading, register } = useRegisterMutation();

  const registerFormHandler = async (formData: FormData) => {
    const values = Object.fromEntries(formData.entries());
    const username = (values.username as string).trim();
    const password = (values.password as string).trim();
    const repass = (values.repass as string).trim();

    const result = await register({ username, password, repass });
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
    <Flex className={styles["register-page"]}>
      <Flex
        justify="center"
        align="center"
        className={styles["register-page__image-section"]}
      >
        <img
          src="/assets/bmw-register.webp"
          alt="BMW car - Register background"
          className={styles["register-page__background-image"]}
        />
        <Flex
          direction="column"
          align="center"
          gap="lg"
          className={styles["register-page__cta"]}
        >
          <Text
            tag="h1"
            size="2xl"
            color="secondary"
            className={styles["register-page__cta-heading"]}
          >
            You already have an account?
          </Text>
          <Button variant="primary" size="lg" to="/login">
            Login
          </Button>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align="center"
        className={styles["register-page__content-section"]}
      >
        <Link to="/">
          <img
            src="/assets/logo-3.webp"
            alt="logo"
            className={styles["register-page__logo"]}
          />
        </Link>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="lg"
          className={styles["register-page__form-wrapper"]}
        >
          <Form
            onSubmit={registerFormHandler}
            schema={registerSchema}
            className={styles["register-page__form"]}
          >
            <FormField
              label={
                <Text size="md" color="black">
                  Username:
                </Text>
              }
              name="username"
              type="text"
              className={styles["register-page__input"]}
            />

            <FormField
              label={
                <Text size="md" color="black">
                  Password:
                </Text>
              }
              name="password"
              type="password"
              className={styles["register-page__input"]}
            />

            <FormField
              label={
                <Text size="md" color="black">
                  Repeat Password:
                </Text>
              }
              name="repass"
              type="password"
              className={styles["register-page__input"]}
            />

            <Button variant="secondary" size="lg">
              Register
            </Button>
          </Form>

          <Text className={styles["register-page__mobile-link"]}>
            You already have an account? <Link to="/login">Login</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
