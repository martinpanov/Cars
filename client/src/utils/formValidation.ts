type Params = {
  formData: FormData;
  schema: Record<string, any>;
};

export function formValidation({ formData, schema }: Params) {
  const errors = {};
  let isValid = true;
  const validationRules = {
    required: (value) => !value,
    minLength: (value, rule) => value?.length < rule,
    maxLength: (value, rule) => value?.length > rule,
    pattern: (value, rule) => !new RegExp(rule).test(value),
    min: (value, rule) => Number(value) < rule,
    max: (value, rule) => Number(value) > rule,
    enum: (value, rule) => !rule.includes(value),
    type: (value, rule) => {
      if (rule === 'number') return isNaN(Number(value));
      if (rule === 'string') return typeof value !== 'string';
      if (rule === 'array') return !Array.isArray(value);
      return false;
    },
    minItems: (value, rule) => Array.isArray(value) && value.length < rule,
    maxItems: (value, rule) => Array.isArray(value) && value.length > rule,
    contentMediaType: (value, allowedTypes) => {
      if (!value) return true;

      const files = Array.isArray(value) ? value : [value];

      return !files.every(file => file instanceof File && allowedTypes.includes(file.type));
    },

    maxSize: (value, maxBytes) => {
      if (!value) return true;

      const files = Array.isArray(value) ? value : [value];

      return !files.every(file => file instanceof File && file.size <= maxBytes);
    }
  };

  Object.entries(schema).forEach(([key, validation]) => {
    const value = formData.get(key);

    // Find the first validation that fails
    const failedRule = Object.entries(validation).find(([rule, ruleValue]) => {
      const validator = validationRules[rule];
      return validator && validator(value, ruleValue);
    });

    if (failedRule) {
      const [failedRuleName] = failedRule;

      // If errorMessage is an object, pick the message for the failed rule
      if (validation.errorMessage && typeof validation.errorMessage === 'object') {
        errors[key] = validation.errorMessage[failedRuleName] || `Invalid value for ${key}`;
      } else {
        // Otherwise fallback to generic message or default
        errors[key] = validation.errorMessage || `Invalid value for ${key}`;
      }

      isValid = false;
    }
  });

  return { isValid, errors };
}
