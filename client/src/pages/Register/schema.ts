export const registerSchema = {
  username: {
    type: "string",
    required: true,
    minLength: 3,
    errorMessage: "Username should be at least 3 characters.",
  },
  password: {
    type: "string",
    required: true,
    minLength: 5,
    errorMessage: "Password should be at least 5 characters.",
  },
  repass: {
    type: "string",
    required: true,
    errorMessage: "Repeat password is required.",
  },
};
