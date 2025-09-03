/**
 * @file Centralizes the color palette and theme definitions for the Meme Budget app.
 * This file defines the core colors and maps them to semantic roles for both
 * light and dark modes, which are then used to generate CSS custom properties.
 */

/**
 * The core color palette defined as HSL strings (Hue, Saturation, Lightness).
 * Using HSL makes it easy to manipulate colors (e.g., adjust lightness for hover states).
 */
export const PALETTE = {
  nyanza: '46, 15%, 83%',
  celadon: '141 44% 81%',
  celadon2: '145 49% 71%',
  mint: '148 40% 62%',
  mint2: '150 41% 52%',
  seaGreen: '155 39% 41%',
  dartmouthGreen: '157 41% 30%',
  brunswickGreen: '158 44% 18%',
  darkGreen: '46, 15%, 30%',
  danger: '0 84% 60%',
  white: '0 0% 100%',
  slate100: '210 40% 96%',
};

/**
 * Maps the core palette to semantic color roles for the light theme.
 * These keys will be converted to CSS custom properties (e.g., `--background`).
 */
export const lightTheme = {
  background: PALETTE.nyanza,
  surface: PALETTE.white,
  primary: PALETTE.mint2,
  primaryHover: PALETTE.seaGreen,
  success: PALETTE.mint,
  danger: PALETTE.danger,
  textPrimary: PALETTE.brunswickGreen,
  textSecondary: PALETTE.seaGreen,
  border: PALETTE.celadon,
  input: PALETTE.slate100,
  gradientFrom: PALETTE.seaGreen,
  gradientTo: PALETTE.mint2,
};

/**
 * Maps the core palette to semantic color roles for the dark theme.
 */
export const darkTheme = {
  background: PALETTE.darkGreen,
  surface: PALETTE.brunswickGreen,
  primary: PALETTE.mint2,
  primaryHover: PALETTE.seaGreen,
  success: PALETTE.mint,
  danger: PALETTE.danger,
  textPrimary: PALETTE.nyanza,
  textSecondary: PALETTE.celadon2,
  border: PALETTE.dartmouthGreen,
  input: PALETTE.dartmouthGreen,
  gradientFrom: PALETTE.seaGreen,
  gradientTo: PALETTE.mint2,
};

/**
 * A type representing the structure of a theme object.
 */
export type Theme = typeof lightTheme;