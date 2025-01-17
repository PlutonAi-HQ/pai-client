import { useCallback } from "react";

export default function useLocalStorage() {
  const getLocalValue = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  const setLocalValue = useCallback((key: string, value: string) => {
    return localStorage.setItem(key, value);
  }, []);

  const removeLocalValue = useCallback((key: string) => {
    return localStorage.removeItem(key);
  }, []);

  const clearLocalStorage = useCallback(() => {
    return localStorage.clear();
  }, []);

  return {
    getLocalValue,
    setLocalValue,
    removeLocalValue,
    clearLocalStorage,
  };
}
