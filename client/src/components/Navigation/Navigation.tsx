import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { Flex } from "../Flex/Flex";
import { MobileNavigation } from "./MobileNavigation";
import styles from "./Navigation.module.css";

export const Navigation: React.FC = () => {
  const { user } = useContext(UserContext);

  const userBasedLinks = {
    login: {
      href: user ? "/logout" : "/login",
      text: user ? "Logout" : "Login",
    },
    register: {
      href: user ? "/myprofile" : "/register",
      text: user ? user.username : "Register",
    },
    sell: { href: user ? "/sell" : "/login", text: "Sell My Car" },
  };

  return (
    <header className={styles["navigation__header"]}>
      <Flex
        tag="nav"
        align="center"
        justify="between"
        padding="3xl"
        className={styles["navigation"]}
      >
        <MobileNavigation userBasedLinks={userBasedLinks} />

        <Flex
          tag="ul"
          gap="xl"
          className={styles["navigation__list"]}
          role="list"
        >
          <li>
            <Link className={styles["navigation__link"]} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles["navigation__link"]} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles["navigation__link"]} to="/catalog">
              Catalog
            </Link>
          </li>
          <li>
            <Link className={styles["navigation__link"]} to="/rentcar">
              Rent Car
            </Link>
          </li>
          <li>
            <Link
              className={styles["navigation__link"]}
              to={userBasedLinks.sell.href}
            >
              {userBasedLinks.sell.text}
            </Link>
          </li>
        </Flex>

        <Flex
          align="center"
          gap="lg"
          className={styles["navigation__login-register"]}
        >
          <Link
            className={styles["navigation__link"]}
            to={userBasedLinks.login.href}
          >
            {userBasedLinks.login.text}
          </Link>
          <Link
            className={styles["navigation__register"]}
            to={userBasedLinks.register.href}
          >
            {userBasedLinks.register.text}
          </Link>
        </Flex>
      </Flex>
    </header>
  );
};
