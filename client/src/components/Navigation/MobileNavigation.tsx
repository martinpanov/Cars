import React, { useState } from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { RenderIf } from "../RenderIf";

type Props = {
  userBasedLinks: {
    login: { href: string; text: string; };
    register: { href: string; text: string; };
    sell: { href: string; text: string; };
  };
};

export const MobileNavigation: React.FC<Props> = ({ userBasedLinks }) => {
  const [isActive, setIsActive] = useState(false);
  const links = {
    home: { href: "/", text: "Home" },
    about: { href: "/about", text: "About" },
    catalog: { href: "/catalog", text: "Catalog" },
    rent: { href: "/rentcar", text: "Rent Car" },
    ...userBasedLinks
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <React.Fragment>
      <RenderIf condition={isActive}>
        <div className={styles["mobile-menu-wrapper"]}>
          <div className={styles["x-button-wrapper"]}>
            <i onClick={toggleMenu} className={`fa-solid fa-xmark ${styles['x-button']}`}></i>
          </div>
          <ul className={styles['mobile-nav-links']} role='list'>
            {Object.entries(links).map(([key, link]) => (
              <li key={key}>
                <Link onClick={toggleMenu} to={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </RenderIf>

      <RenderIf condition={!isActive}>
        <Link className={styles['logo']} to="/"><img src='/assets/logo-no-background.webp' width="200" height="30" alt="logo" /></Link>
        <i onClick={toggleMenu} className={`fa-solid fa-bars ${styles["bars"]}`}></i>
      </RenderIf>
    </React.Fragment>
  );
};