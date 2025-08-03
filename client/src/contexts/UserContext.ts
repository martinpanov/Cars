import { createContext } from "react";

type User = {
  userId: string;
  username: string;
  accessToken: string;
};

type UserContextType = {
  user: User,
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: {
    userId: '',
    username: '',
    accessToken: ''
  },
  setUser: () => { }
});

export {
  UserContext
};