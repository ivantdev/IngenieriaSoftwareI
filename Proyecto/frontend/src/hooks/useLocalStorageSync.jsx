import { useState, useEffect } from "react";

function useLocalStorageSync(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== JSON.stringify(state)) {
        try {
          setState(JSON.parse(event.newValue || "null"));
        } catch {
          setState(initialValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageSync;
