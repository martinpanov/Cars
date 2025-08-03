import { useContext } from "react";
import { FormContext } from "./Form";
import { Text } from "../Text/Text";

type Props = {
  name: string;
  type?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  options?: { value: string | number; label: string; }[];
  className?: string;
  [key: string]: any;
};

export const FormField: React.FC<Props> = ({
  name,
  type = 'text',
  label,
  placeholder,
  options = [],
  className = '',
  defaultValue = '',
  ...props
}) => {
  const errors = useContext(FormContext);

  const error = errors[name];
  const hasError = Boolean(error);

  const inputClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
    } ${className}`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            className={`${inputClassName} resize-vertical`}
            rows={4}
            {...props}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            id={name}
            className={inputClassName}
            {...props}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={name}
              id={name}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...props}
            />
            {label && (
              <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
                {label}
              </label>
            )}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name={name}
                  id={`${name}-${option.value}`}
                  value={option.value}
                  defaultChecked={defaultValue === option.value}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  {...props}
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
                  {option.label}
                </label>
              </div>
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
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-field">
      {label && type !== 'checkbox' && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {renderInput()}

      {hasError && (
        <Text color="error">
          {error}
        </Text>
      )}
    </div>
  );
};