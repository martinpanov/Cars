import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import styles from "./WhyChooseUs.module.css";

export const WhyChooseUs: React.FC = () => {
  return (
    <Flex
      tag="section"
      direction="column"
      align="center"
      gap="2xl"
      className={styles["why-choose-us"]}
    >
      <Text tag="h2" size="3xl" color="black" textAlign="center">
        Why Choose Us?
      </Text>

      <Flex
        align="center"
        justify="center"
        className={styles["why-choose-us__reasons"]}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          className={styles["why-choose-us__reason"]}
        >
          <img
            src="/assets/car-vehicle-rent-icon.svg"
            alt="Car selection icon"
          />
          <Text tag="h3" color="black" size="2xl">
            Select Car
          </Text>
          <Text color="black">
            We offer a big range of vehicles for all your driving needs. We have
            the perfect car to meet your needs
          </Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          className={styles["why-choose-us__reason"]}
        >
          <img src="/assets/customer_care-icon.svg" alt="Customer care icon" />
          <Text tag="h3" color="black" size="2xl">
            Contact Operator
          </Text>
          <Text color="black">
            Our knowledgeable and friendly operators are always ready to help
            with any questions or concerns
          </Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          className={styles["why-choose-us__reason"]}
        >
          <img
            src="/assets/car_driving_on_the_road.svg"
            alt="Car driving icon"
          />
          <Text tag="h3" color="black" size="2xl">
            Let's Drive
          </Text>
          <Text color="black">
            Whether you're hitting the open road, we've got you covered with our
            wide range of cars
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
