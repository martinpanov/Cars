import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Flex } from "../Flex/Flex";
import { RenderIf } from "../RenderIf";
import styles from "./MobileNavigation.module.css";

type Props = {
  userBasedLinks: {
    login: { href: string; text: string };
    register: { href: string; text: string };
    sell: { href: string; text: string };
  };
};

export const MobileNavigation: React.FC<Props> = ({ userBasedLinks }) => {
  const [isActive, setIsActive] = useState(false);
  const links = {
    home: { href: "/", text: "Home" },
    about: { href: "/about", text: "About" },
    catalog: { href: "/catalog", text: "Catalog" },
    rent: { href: "/rentcar", text: "Rent Car" },
    ...userBasedLinks,
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <React.Fragment>
      <RenderIf condition={isActive}>
        <div className={styles["navigation__mobile-menu-wrapper"]}>
          <Flex
            justify="end"
            className={styles["navigation__x-button-wrapper"]}
          >
            <i
              onClick={toggleMenu}
              className={`fa-solid fa-xmark ${styles["navigation__x-button"]}`}
            ></i>
          </Flex>
          <Flex
            tag="ul"
            direction="column"
            justify="start"
            align="center"
            gap="xl"
            className={styles["navigation__mobile-list"]}
            role="list"
          >
            {Object.entries(links).map(([key, link]) => (
              <li key={key} className={styles["navigation__link"]}>
                <Link onClick={toggleMenu} to={link.href}>
                  {link.text}
                </Link>
              </li>
            ))}
          </Flex>
        </div>
      </RenderIf>

      <RenderIf condition={!isActive}>
        <Link className={styles["navigation__logo"]} to="/">
          <img src="/assets/logo-no-background.webp" alt="logo" />
        </Link>
        <i
          onClick={toggleMenu}
          className={`fa-solid fa-bars ${styles["navigation__bars"]}`}
        ></i>
      </RenderIf>
    </React.Fragment>
  );
};
