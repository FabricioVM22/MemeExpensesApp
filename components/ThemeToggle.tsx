
/**
 * @file Renders a button to toggle between light and dark themes.
 */

import React from 'react';
import { SunIcon, MoonIcon, HeartIcon } from './icons';

/**
 * Props for the ThemeToggle component.
 */
interface ThemeToggleProps {
  /** The current active theme. */
  theme: 'light' | 'dark' | 'rose';
  /** Function to set the new theme. */
  setTheme: (theme: 'light' | 'dark' | 'rose') => void;
}

/**
 * A button component that switches the application's theme.
 * @param {ThemeToggleProps} props - The props for the component.
 * @returns The rendered theme toggle button.
 */
export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps): React.ReactNode {
  /**
   * Toggles the theme between 'light', 'dark', and 'rose'.
   */
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('rose');
    } else {
      setTheme('light');
    }
  };

  const renderIcon = () => {
    // Show the icon for the theme you're about to switch TO
    if (theme === 'light') return <MoonIcon className="w-6 h-6" />;
    if (theme === 'dark') return <HeartIcon className="w-6 h-6" />;
    return <SunIcon className="w-6 h-6" />; // From 'rose' back to 'light'
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-text-secondary hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ring-offset-background"
      aria-label="Toggle theme"
    >
      {renderIcon()}
    </button>
  );
}