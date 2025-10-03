/**
 * @file Defines the useLocalStorage custom hook for persistent state management.
 */

// FIX: Import Dispatch and SetStateAction to provide explicit types for useState's return tuple.
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// --- LocalStorage Availability Check ---

/**
 * A memoized flag to store the result of the availability check.
 * This prevents re-running the check on every hook usage.
 */
let isStorageAvailable: boolean | null = null;

/**
 * A flag to ensure the "storage unavailable" warning is only shown once per session.
 */
let hasShownStorageWarning = false;

/**
 * Checks if localStorage is available and writable.
 * @returns {boolean} True if localStorage is available, false otherwise.
 */
const checkLocalStorageAvailability = (): boolean => {
  if (isStorageAvailable !== null) {
    return isStorageAvailable;
  }

  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    isStorageAvailable = true;
  } catch (e) {
    isStorageAvailable = false;
  }
  return isStorageAvailable;
};


/**
 * A custom React hook that syncs a state variable with the browser's localStorage.
 * It behaves like `useState`, but automatically persists the value to localStorage
 * on any change and hydrates the initial state from localStorage on mount.
 * Includes robust error handling for unavailable storage or corrupted data.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which the value will be stored in localStorage.
 * @param {T} initialValue The initial value to use if no value is found in localStorage.
 * @returns A stateful value, and a function to update it.
 */
// FIX: Use the imported Dispatch and SetStateAction types instead of the React namespace.
export function useLocalStorage<T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  /**
   * Initializes the state. It attempts to retrieve and parse the value
   * from localStorage. If storage is unavailable, parsing fails, or the key
   * doesn't exist, it falls back to the provided `initialValue` and informs the user.
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    const storageAvailable = checkLocalStorageAvailability();
    
    if (!storageAvailable) {
        if (!hasShownStorageWarning) {
            alert("Warning: Your browser's local storage is unavailable or full. Your data will not be saved across sessions.");
            hasShownStorageWarning = true;
        }
        return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      alert(`There was an issue reading your saved data for "${key}". It might be corrupted. The application will use default values for this item.`);
      return initialValue;
    }
  });

  /**
   * An effect that triggers whenever the `storedValue` or `key` changes.
   * It serializes the current state to a JSON string and saves it
   * to localStorage, with error handling.
   */
  useEffect(() => {
    if (!checkLocalStorageAvailability()) {
        // If storage was available but now isn't, do nothing.
        // The initial warning should suffice.
        return;
    }

    try {
      const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      alert(`Error: Could not save your changes. Your browser's storage might be full. Please clear some space or check your browser settings.`);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}