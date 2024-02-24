import { useState } from 'react'

export enum LocalStorage {
  AUDIO_PLAYER_VOLUME = 'audio_player_volume',
  AUDIO_PLAYER_LOOP = 'audio_player_loop',
  AUDIO_PLAYER_IS_MUTED = 'audio_player_is_muted'
}


export const useLocalStorage = <T>(key: LocalStorage, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key) as T;
      return (typeof item === 'string' ? JSON.parse(item) : initialValue);
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    if (!value || value === '') {
      window.localStorage.removeItem(key);
    }

    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  return [storedValue, setValue];
}