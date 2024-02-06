import { useState } from 'react';

const useLocalStorage = (key, initialValue = null) => {
    // Get stored value from localStorage
    const storedValue = localStorage.getItem(key);
    //Parse stored value or use the provided initial value
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    // State to hold the current value
    const [value, setValue] = useState(initial);

    //Function to update the localStorage and state with new value 
    const setStoredValue = (newValue) => {
        // update state
        setValue(newValue);
        // store new value in localStorage
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setStoredValue];
};

export default useLocalStorage;