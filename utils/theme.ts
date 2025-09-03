/**
 * @file Utility functions related to theming.
 */

import { Theme } from '../theme';

/**
 * Generates a CSS string of custom properties from a theme object.
 * This function takes a theme object, converts its camelCase keys to kebab-case
 * CSS variable names (e.g., `textPrimary` becomes `--text-primary`), and
 * creates a CSS rule string that can be injected into a `<style>` tag.
 *
 * @param {Theme} theme - A theme object where keys are semantic names and values are HSL color strings.
 * @returns {string} A string of CSS variables wrapped in a `:root` selector.
 * @example
 * const theme = { background: '0 0% 100%', textPrimary: '0 0% 0%' };
 * generateThemeCss(theme);
 * // Returns ":root { --background: 0 0% 100%; --text-primary: 0 0% 0%; }"
 */
export function generateThemeCss(theme: Theme): string {
  const cssVars = Object.entries(theme).map(([key, value]) => {
    // Converts camelCase key to kebab-case for CSS custom property naming
    const cssKey = `--${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
    return `${cssKey}: ${value};`;
  });

  return `:root { ${cssVars.join(' ')} }`;
}