import { useContext } from "react";

import { FormContext } from "../../contexts/FormContext";
import { Flex } from "../Flex/Flex";
import { Text } from "../Text/Text";
import styles from "./FormField.module.css";

type Props = {
  name: string;
  type?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  className?: string;
  defaultValue?: any;
  [key: string]: any;
};

export const FormField: React.FC<Props> = ({
  name,
  type = "text",
  label,
  placeholder,
  options = [],
  className = "",
  defaultValue = "",
  ...props
}) => {
  const errors = useContext(FormContext);

  const error = errors[name];
  const hasError = Boolean(error);
  const inputClassName = [
    styles["form-field"],
    hasError && styles["error"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            className={inputClassName}
            rows={4}
            defaultValue={defaultValue}
            {...props}
          />
        );

      case "select":
        return (
          <select
            name={name}
            id={name}
            className={inputClassName}
            defaultValue={defaultValue}
            {...props}
          >
            <option value="">{placeholder || "Select an option"}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <Flex align="center">
            <input
              type="checkbox"
              name={name}
              id={name}
              className={styles["form-field__checkbox"]}
              defaultValue={defaultValue}
              {...props}
            />
            {label && (
              <label
                htmlFor={name}
                className="ml-2 block text-sm text-gray-900"
              >
                {label}
              </label>
            )}
          </Flex>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {options.map(option => (
              <Flex key={option.value} align="center">
                <input
                  type="radio"
                  name={name}
                  id={`${name}-${option.value}`}
                  value={option.value}
                  defaultChecked={defaultValue === option.value}
                  className={styles["form-field__checkbox"]}
                  defaultValue={defaultValue}
                  {...props}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {option.label}
                </label>
              </Flex>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className={inputClassName}
            defaultValue={defaultValue}
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-field">
      {label && type !== "checkbox" && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {renderInput()}

      {hasError && <Text color="error">{error}</Text>}
    </div>
  );
};
