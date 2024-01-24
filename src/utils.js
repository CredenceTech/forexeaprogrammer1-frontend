import { useState } from "react";
const item = localStorage.getItem('user');
const user = item ? JSON.parse(item) : '';
export const devUrl = "https://0c84-2402-a00-172-bd1e-48a6-34d3-339-2c52.ngrok-free.app/api/"
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