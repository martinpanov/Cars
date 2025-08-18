import { Text } from "../Text/Text";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <Text textAlign="center" color="secondary">
        Martin Panov &copy; 2023
      </Text>
    </footer>
  );
};
