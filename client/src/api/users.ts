import { createCustomApi } from "../utils/api";

const usersApi = createCustomApi({
  endpoints: {
    register: { method: "POST", endpoint: "/register" },
    login: { method: "POST", endpoint: "/login" },
    logout: { method: "POST", endpoint: "/logout" },
    refresh: { method: "POST", endpoint: "/refresh" },
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = usersApi;
