import { useState } from "react";

import { FormContext } from "../../contexts/FormContext";
import { formValidation } from "../../utils/formValidation";

type Props = {
  action?: string;
  method?: string;
  onSubmit: (formData: FormData) => void;
  children?: React.ReactNode;
  className?: string;
  schema?: any;
  [key: string]: any;
};

export const Form: React.FC<Props> = ({
  action,
  method,
  schema,
  onSubmit,
  className,
  children,
  ...props
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!schema) {
      onSubmit(formData);
      return;
    }

    const { isValid, errors } = formValidation({ formData, schema });
    setErrors(errors);

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <FormContext.Provider value={errors}>
      <form
        action={action}
        method={method}
        onSubmit={submitHandler}
        className={className}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};
