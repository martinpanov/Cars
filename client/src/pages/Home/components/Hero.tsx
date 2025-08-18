import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import styles from "./Hero.module.css";

export const Header: React.FC = () => {
  return (
    <section className={styles.hero}>
      <img
        src="/assets/wave-haikei.svg"
        alt="Wave background"
        className={styles["hero__background-image"]}
      />

      <Flex justify="center" className={styles["hero__wrapper"]}>
        <Flex
          align="center"
          justify="center"
          className={styles["hero__content"]}
        >
          <Flex direction="column" className={styles["hero__text"]}>
            <Text tag="h1" size="5xl" color="secondary" weight="bold">
              Buy Or Rent Your{" "}
              <Text
                tag="span"
                size="5xl"
                className={styles["hero__title-highlight"]}
              >
                Dream Car
              </Text>{" "}
              Today!
            </Text>

            <Text tag="h2" size="md" color="secondary">
              Looking to buy or rent a car? Check the available cars for sale
              and rent and find the car you've always wanted
            </Text>

            <Flex gap="2xl">
              <Button variant="primary" size="lg" to="/catalog">
                Buy Car
              </Button>
              <Button variant="secondary" size="lg" to="/rentcar">
                Rent Car
              </Button>
            </Flex>
          </Flex>

          <img
            src="/assets/bmw-no-background.webp"
            alt="BMW car"
            className={styles["hero__image"]}
          />
        </Flex>
      </Flex>
    </section>
  );
};
