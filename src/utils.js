import { useState } from "react";
const item = localStorage.getItem('user');
const user = item ? JSON.parse(item) : '';
export const devUrl = "https://api.dpafx.com/api/"
export const token = user?.api_key




export const useLocalStorage = (key, initialValue = '') => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [storedValue, setValue];
}