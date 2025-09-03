/**
 * @file Defines the useLocalStorage custom hook for persistent state management.
 */

import { useState, useEffect } from 'react';

/**
 * A custom React hook that syncs a state variable with the browser's localStorage.
 * It behaves like `useState`, but automatically persists the value to localStorage
 * on any change and hydrates the initial state from localStorage on mount.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which the value will be stored in localStorage.
 * @param {T} initialValue The initial value to use if no value is found in localStorage.
 * @returns A stateful value, and a function to update it.
 */
export function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  /**
   * Initializes the state. It attempts to retrieve and parse the value
   * from localStorage. If it fails or the key doesn't exist, it falls back
   * to the provided `initialValue`.
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  /**
   * An effect that triggers whenever the `storedValue` or `key` changes.
   * It serializes the current state to a JSON string and saves it
   * to localStorage.
   */
  useEffect(() => {
    try {
      const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}