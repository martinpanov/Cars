import { createContext } from "react";

type User = {
  userId: string;
  username: string;
  tokens: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: {
    userId: "",
    username: "",
    tokens: "",
  },
  setUser: () => {},
});

export { UserContext };
