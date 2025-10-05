import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import { Text } from "../../../components/Text/Text";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonTo: string;
  variant?: "default" | "primary";
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonTo,
  variant = "default",
}) => {
  const containerClass =
    variant === "primary"
      ? styles["empty-state--primary"]
      : styles["empty-state--default"];

  const textColor = variant === "primary" ? "secondary" : "black";
  const buttonVariant = variant === "primary" ? "tertiary" : "primary";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="2xl"
      padding="4xl"
      className={containerClass}
    >
      <Flex direction="column" align="center" gap="xl">
        <Text size="4xl" color={textColor} textAlign="center">
          <i className={icon}></i>
        </Text>
        <Flex direction="column" align="center" gap="md">
          <Text size="2xl" textAlign="center" color={textColor} weight="bold">
            {title}
          </Text>
          <Text size="lg" textAlign="center" color={textColor}>
            {description}
          </Text>
        </Flex>
      </Flex>
      <Button to={buttonTo} variant={buttonVariant} size="lg">
        {buttonText}
      </Button>
    </Flex>
  );
};
