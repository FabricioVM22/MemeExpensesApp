
/**
 * @file Centralizes the color palette and theme definitions for the Meme Budget app.
 * This file defines the core colors and maps them to semantic roles for both
 * light and dark modes, which are then used to generate CSS custom properties.
 */

/**
 * The core color palette defined as HSL strings (Hue, Saturation, Lightness).
 * Using HSL makes it easy to manipulate colors (e.g., adjust lightness for hover states).
 * The format 'H S% L%' is used for CSS variables.
 */
export const PALETTE = {
  // Base Tones
  black: '220 20% 10%',
  white: '210 20% 98%',
  slate: '220 10% 40%',
  
  // Vibrant Accents
  greenPrimary: '140 60% 45%',         // Main green for light theme
  greenPrimaryHover: '140 60% 55%',    // Hover for light theme, main for dark theme
  greenPrimaryDarkHover: '140 60% 65%',// Hover for dark theme
  violet: '250 80% 70%',
  green: '140 70% 55%',                // Success color (brighter)
  red: '0 84% 60%',

  // Gradients
  gradientFrom: '140 60% 45%',
  gradientTo: '145 65% 55%',
};

/**
 * Maps the core palette to semantic color roles for the light theme.
 * These keys will be converted to CSS custom properties (e.g., `--background`).
 * Values with alpha are written like 'H S% L% / A'.
 */
export const lightTheme = {
  background: '210 30% 96%',
  surface: '210 20% 98%', 
  primary: PALETTE.greenPrimary,
  primaryHover: PALETTE.greenPrimaryHover,
  success: PALETTE.green,
  danger: PALETTE.red,
  textPrimary: '220 20% 15%',
  textSecondary: '220 15% 35%',
  border: '210 20% 85%',
  input: '210 30% 90%',
  gradientFrom: PALETTE.gradientFrom,
  gradientTo: PALETTE.gradientTo,
};

/**
 * Maps the core palette to semantic color roles for the dark theme.
 */
export const darkTheme = {
  background: '220 20% 12%',
  surface: '220 20% 15%', 
  primary: PALETTE.greenPrimaryHover,
  primaryHover: PALETTE.greenPrimaryDarkHover,
  success: PALETTE.green,
  danger: PALETTE.red,
  textPrimary: PALETTE.white,
  textSecondary: '210 20% 80%',
  border: '210 20% 30%',
  input: '220 20% 25%',
  gradientFrom: PALETTE.gradientFrom,
  gradientTo: PALETTE.gradientTo,
};

/**
 * A romantic theme with soft pinks and warm tones.
 */
export const roseTheme = {
  background: '345 60% 96%',
  surface: '345 50% 92%',
  primary: '330 80% 60%',
  primaryHover: '330 80% 65%',
  success: '140 60% 50%',
  danger: '0 80% 65%',
  textPrimary: '340 10% 25%',
  textSecondary: '340 5% 50%',
  border: '345 30% 85%',
  input: '345 40% 90%',
  gradientFrom: '330 80% 60%',
  gradientTo: '280 80% 70%',
};

/**
 * A type representing the structure of a theme object.
 */
export type Theme = typeof lightTheme;