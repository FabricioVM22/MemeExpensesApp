
// theme.ts

/**
 * Centralizes the color palette for the SimpliFi app.
 * This file defines the core color palette and semantic theme objects for light and dark modes.
 * HSL values are used to allow for easy color manipulation with CSS variables.
 */

// Core color palette defined as HSL strings (Hue Saturation Lightness).
export const PALETTE = {
  nyanza: '135 58% 91%',
  celadon: '141 44% 81%',
  celadon2: '145 49% 71%',
  mint: '148 40% 62%',
  mint2: '150 41% 52%',
  seaGreen: '155 39% 41%',
  dartmouthGreen: '157 41% 30%',
  brunswickGreen: '158 44% 18%',
  darkGreen: '161 62% 7%',
  danger: '0 84% 60%',
  white: '0 0% 100%',
  slate100: '210 40% 96%',
};

// Maps the palette to semantic roles for the light theme.
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

// Maps the palette to semantic roles for the dark theme.
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

export type Theme = typeof lightTheme;
