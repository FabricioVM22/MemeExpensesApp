/**
 * @file Defines the useClickOutside custom hook for detecting clicks outside an element.
 */
import { useEffect, RefObject } from 'react';

/**
 * A custom hook that triggers a callback when a click occurs outside of the specified element.
 *
 * @param {RefObject<HTMLElement>} ref - The ref of the element to monitor for outside clicks.
 * @param {() => void} callback - The function to call when an outside click is detected.
 */
export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void {
  useEffect(() => {
    /**
     * Handles the mousedown event to check if the click was outside the element.
     * @param {MouseEvent} event - The mouse event.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}