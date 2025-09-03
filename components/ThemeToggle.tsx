/**
 * @file Renders a button to toggle between light and dark themes.
 */

import React from 'react';
import { SunIcon, MoonIcon } from './icons';

/**
 * Props for the ThemeToggle component.
 */
interface ThemeToggleProps {
  /** The current active theme. */
  theme: 'light' | 'dark';
  /** Function to set the new theme. */
  setTheme: (theme: 'light' | 'dark') => void;
}

/**
 * A button component that switches the application's theme.
 * @param {ThemeToggleProps} props - The props for the component.
 * @returns The rendered theme toggle button.
 */
export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps): React.ReactNode {
  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-text-secondary hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ring-offset-background"
      aria-label="Toggle theme"
    >
      {/* Displays the appropriate icon for the opposite theme */}
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
}