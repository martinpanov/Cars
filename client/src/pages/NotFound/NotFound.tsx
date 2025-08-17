import { Flex } from "../../components/Flex/Flex";
import { Text } from "../../components/Text/Text";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  return (
    <Flex
      tag="section"
      direction="column"
      justify="center"
      align="center"
      className={styles["not-found-page"]}
    >
      <Text
        tag="h1"
        size="5xl"
        color="secondary"
        className={styles["not-found-page__error-code"]}
      >
        404
      </Text>
      <Text
        tag="h2"
        size="4xl"
        color="secondary"
        textAlign="center"
        className={styles["not-found-page__message"]}
      >
        Resource Not Found
      </Text>
    </Flex>
  );
};
