import { createCustomApi } from "../utils/api";

const usersApi = createCustomApi({
  endpoints: {
    register: { method: 'POST', endpoint: '/register' },
    login: { method: 'POST', endpoint: '/login' },
    logout: { method: 'GET', endpoint: '/logout' },
  }
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutQuery
} = usersApi;
