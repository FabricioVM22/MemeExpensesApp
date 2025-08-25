// theme.ts

/**
 * Centralizes the color palette for the SimpliFi app.
 * This new theme is based on a nature-inspired palette.
 */

export const PALETTE = {
  asparagus: '#6da34d',
  englishViolet: '#56445d',
  darkCyan: '#548687',
  cambridgeBlue: '#8fbc94',
  teaGreen: '#c5e99b',
  danger: '#ef4444', // A consistent red for expenses/warnings
};

export const theme = {
  colors: {
    // Primary accent color used for buttons, highlights, and important elements.
    primary: PALETTE.darkCyan,
    primaryHover: '#4a7879', // A manually darkened version of primary

    // Gradient colors for the main heading.
    gradient: {
      from: PALETTE.darkCyan,
      to: PALETTE.asparagus,
    },

    // Color for indicating success or positive actions (e.g., income).
    success: PALETTE.asparagus,

    // Color for indicating errors, warnings, or negative actions (e.g., expenses).
    danger: PALETTE.danger,
    
    // Specific color schemes for light and dark UI modes.
    light: {
      background: '#f8fafc',     // A clean, almost-white background
      surface: '#ffffff',        // Card and modal backgrounds
      textPrimary: '#3a2e40',    // A darker shade of English Violet for readability
      textSecondary: PALETTE.englishViolet, // Subdued text for descriptions
      border: '#e4eade',         // A very light, muted green for borders
      input: '#f1f5f9',          // A standard light grey for inputs
    },
    dark: {
      background: '#3a2e40',     // A darker English Violet for the main background
      surface: PALETTE.englishViolet, // Card and modal backgrounds
      textPrimary: '#f0fdf4',    // A very light, soft green for primary text
      textSecondary: PALETTE.cambridgeBlue, // Subdued text for descriptions
      border: '#6b5873',         // A lighter shade of the surface for borders
      input: '#493a50',          // A distinct dark shade for inputs
    },
  },
};
