import { useState } from "react";

export const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const persistedStateSerialized = sessionStorage.getItem(key);
    if (persistedStateSerialized) {
      const persistedState = JSON.parse(persistedStateSerialized);
      return persistedState;
    }
    return initialValue;
  });

  const setSessionStorageState = (value) => {
    setValue(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return {
    user: value,
    setUser: setSessionStorageState
  };
};