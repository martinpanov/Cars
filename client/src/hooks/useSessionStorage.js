import { useState } from "react";

export default function useSessionStorage(key, initialValue) {
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

    return [
        value,
        setSessionStorageState
    ];
}