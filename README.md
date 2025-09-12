# Meme Budget - Expense Tracker

Meme Budget is a simple, beautiful, and intuitive expense tracker designed to help you manage your finances with ease. Track your income and expenses, set monthly budgets by category, create special event budgets, and visualize your spending habits with clear graphics. All your data is stored locally on your device, ensuring complete privacy.

## ✨ Key Features

- **Intuitive Dashboard:** Get an at-a-glance overview of your current balance, monthly income, and total expenses.
- **Transaction Tracking:** Quickly add income or expense transactions with descriptions, dates, and categories.
- **Monthly Budgeting:** Set spending limits for each category to stay on top of your finances.
- **Event Budgets:** Create separate budgets for special events like vacations or parties, keeping them isolated from your regular monthly finances.
- **Spending Analytics:** Visualize your spending per category against your set budget with clear progress bars.
- **Transaction History:** Review your financial activity for previous months in an organized, collapsible view.
- **Customizable Categories:** Add, edit, or delete spending categories, each with a unique name, color, and icon.
- **Data Backup & Restore:** Easily export all your application data (transactions, budgets, events) to a JSON file for backup, and import it on any device.
- **Local Data Storage:** All your financial data is stored securely in your browser's `localStorage`. No cloud accounts, no data sharing.
- **Multiple Themes:** Choose from a clean Light theme, a sleek Dark theme, or a romantic Rose theme.
- **Responsive Design:** A mobile-first design that works beautifully on all screen sizes, from phones to desktops.
- **Localization:** Supports multiple languages (English and Spanish) and automatically detects the user's browser preference.

## 🚀 Tech Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling approach.
- **Icons:** Custom SVG components.
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`) and a custom `useLocalStorage` hook for data persistence.
- **Build:** No build step required. The app uses ES Modules directly in the browser via an import map in `index.html`.

## 📁 File Structure

The project is organized into a clear and modular structure:

```
.
├── components/         # Reusable React components (Dashboard, Modals, Nav, etc.)
├── context/            # React Context for global state (LocalizationContext)
├── hooks/              # Custom React hooks (useLocalStorage, useClickOutside)
├── locales/            # Translation files for internationalization (i18n)
├── utils/              # Utility functions (theme generation)
├── App.tsx             # Main application component, orchestrates state and views
├── index.tsx           # Entry point for the React application
├── index.html          # The single HTML page that loads the app
├── constants.ts        # Default application constants (e.g., default categories)
├── theme.ts            # Color palette and theme definitions for all themes
└── types.ts            # Centralized TypeScript type definitions
```

## 🛠️ How It Works

### State Management

The application's state is managed within the `App.tsx` component using React's built-in hooks. To ensure data persistence across browser sessions, a custom hook `useLocalStorage` is employed. This hook syncs state variables (like transactions, categories, and budgets) with the browser's `localStorage`, automatically saving changes and rehydrating the state on page load. It includes robust error handling for cases where storage is unavailable or corrupted.

### Theming

The app supports light, dark, and rose themes, defined in `theme.ts`. The `generateThemeCss` utility converts these theme objects into CSS custom properties (variables) which are injected into a `<style>` tag in the document head. Tailwind CSS is configured to use these CSS variables for semantic coloring (e.g., `bg-background`, `text-primary`), allowing the entire UI to adapt instantly when the theme is toggled.

### Navigation

The application is a Single Page Application (SPA). View navigation is handled by a state variable (`activeView`) in `App.tsx`.
- On mobile devices, a `BottomNav` component is rendered for primary navigation.
- On larger screens, a `SideNav` component is displayed, providing a more traditional desktop experience.

### Data Management

Users can back up their data via the "Export Data" button in the settings. This feature bundles all transactions, categories, budgets, and events into a single timestamped JSON file that is downloaded to the user's device. The "Import Data" feature allows users to select a valid backup file, which then overwrites the current application state, providing a seamless way to restore data or transfer it between browsers.

### Localization

Internationalization is managed through `LocalizationContext`. It detects the user's browser language and loads the appropriate translation file from the `locales/` directory. The `useLocalization` hook provides a `t` function that components can use to retrieve translated strings, ensuring the entire UI can be displayed in the user's preferred language.
