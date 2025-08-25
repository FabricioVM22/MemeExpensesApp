
import { Theme } from '../theme';

/**
 * Generates a CSS string of custom properties from a theme object.
 * @param theme - A theme object where keys are semantic names (e.g., 'background')
 * and values are HSL color strings.
 * @returns A string to be injected into a <style> tag.
 */
export function generateThemeCss(theme: Theme): string {
  const cssVars = Object.entries(theme).map(([key, value]) => {
    // Converts camelCase key to kebab-case for CSS custom property naming
    const cssKey = `--${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
    return `${cssKey}: ${value};`;
  });

  return `:root { ${cssVars.join(' ')} }`;
}
