import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [savedQuery, setSavedQuery] = useState('');

  useEffect(() => {
    const query = localStorage.getItem(key);
    if (query) {
      setSavedQuery(query);
    }
  }, [key]);

  const setQueryToLocalStorage = (query: string) => {
    localStorage.setItem(key, query);
    setSavedQuery(query);
  };

  return { savedQuery, setQueryToLocalStorage };
};
