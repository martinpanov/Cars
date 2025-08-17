import { Flex } from "../../components/Flex/Flex";
import { Text } from "../../components/Text/Text";
import styles from "./About.module.css";

export const About: React.FC = () => {
  return (
    <Flex
      tag="section"
      justify="center"
      align="center"
      direction="column"
      gap="4xl"
      className={styles["about-us"]}
    >
      <img
        src="/assets/black-car.webp"
        alt="Black car background"
        className={styles["about-us__background"]}
      />
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap="4xl"
        className={styles["about-us__content"]}
      >
        <Text
          tag="h1"
          color="secondary"
          textAlign="center"
          size="5xl"
          className={styles["about-us__title"]}
        >
          About us
        </Text>
        <Flex
          justify="center"
          align="center"
          gap="xl"
          className={styles["about-us__cards"]}
        >
          <Flex
            direction="column"
            align="center"
            className={styles["about-us__card"]}
          >
            <img src="/assets/icons8-passion-68.png" alt="team-icon" />
            <Text tag="h2" color="secondary" size="3xl">
              Passion
            </Text>
            <Text
              color="secondary"
              textAlign="center"
              className={styles["about-us__card-text"]}
            >
              At Begachka, we share a collective passion for all things
              automotive, from classic cars to the latest models, from their
              inner workings to their historical significance.
            </Text>
          </Flex>
          <Flex
            direction="column"
            align="center"
            className={styles["about-us__card"]}
          >
            <img src="/assets/icons8-goal-100.png" alt="mission-icon" />
            <Text tag="h2" color="secondary" size="3xl">
              Mission
            </Text>
            <Text
              color="secondary"
              textAlign="center"
              className={styles["about-us__card-text"]}
            >
              Our mission was to create a platform for car enthusiasts by
              connecting them in the most efficient and effective way, providing
              the most up-to-date car listings, expert reviews, and tools to
              make informed decisions, making car buying and selling easier for
              everyone.
            </Text>
          </Flex>
          <Flex
            direction="column"
            align="center"
            className={styles["about-us__card"]}
          >
            <img
              src="/assets/icons8-people-working-together-100.png"
              alt="team-icon"
            />
            <Text tag="h2" color="secondary" size="3xl">
              Team
            </Text>
            <Text
              color="secondary"
              textAlign="center"
              className={styles["about-us__card-text"]}
            >
              Our team is made up of car enthusiasts and experts in the
              industry, who are dedicated to providing an unparalleled car
              buying and selling experience, with a commitment to honesty,
              transparency and customer satisfaction
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
