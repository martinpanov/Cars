export const loginSchema = {
  username: {
    type: "string",
    required: true,
    errorMessage: "Username is required.",
  },
  password: {
    type: "string",
    required: true,
    errorMessage: "Password is required.",
  },
};
