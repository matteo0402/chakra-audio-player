import { useState } from 'react'

export enum LocalStorage {
  AUDIO_PLAYER_VOLUME = 'audio_player_volume',
  AUDIO_PLAYER_IS_MUTED = 'audio_player_is_muted'
}


export const useLocalStorage = (key: LocalStorage, initialValue: string | number | object | null | Function) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return (item ? JSON.parse(item) : initialValue);
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const setValue = (value: any): void => {
    if (!value || value === '') {
      window.localStorage.removeItem(key);
    }

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error(e);
    }
  }

  return [storedValue, setValue];
}