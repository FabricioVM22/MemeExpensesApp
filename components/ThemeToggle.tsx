/**
 * @file Renders a button to toggle between the application's available themes
 * (light, dark, and rose).
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
 * A button component that cycles through the application's themes.
 * The icon displayed represents the theme that will be activated on click.
 * @param {ThemeToggleProps} props - The props for the component.
 * @returns {React.ReactNode} The rendered theme toggle button.
 */
export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps): React.ReactNode {
  /**
   * Toggles the theme in a specific cycle: light -> dark -> rose -> light.
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

  /**
   * Determines which icon to display based on the current theme.
   * The icon always represents the *next* theme in the cycle.
   * @returns {React.ReactNode} The icon component to render.
   */
  const renderIcon = () => {
    // From 'light', the next theme is 'dark' (MoonIcon)
    if (theme === 'light') return <MoonIcon className="w-6 h-6" />;
    // From 'dark', the next theme is 'rose' (HeartIcon)
    if (theme === 'dark') return <HeartIcon className="w-6 h-6" />;
    // From 'rose', the next theme is 'light' (SunIcon)
    return <SunIcon className="w-6 h-6" />;
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
