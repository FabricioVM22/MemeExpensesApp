# Meme Budget - A Modern Expense Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwindcss)

Meme Budget is a simple, beautiful, and intuitive expense tracker designed to help you manage your finances with ease and clarity. Track your income and expenses, set monthly budgets by category, create special event budgets, and visualize your spending habits with clear graphics. All your data is stored locally on your device, ensuring complete privacy and offline functionality.

**[➡️ View Live Demo](https://example.com)** _(link not available)_

## 📸 Screenshots

*(Placeholder for screenshots of the Dashboard, Analytics, and Events pages on both mobile and desktop)*

---

## ✨ Key Features

- **Intuitive Dashboard:** Get an at-a-glance overview of your current balance, monthly income, and total expenses. Includes a quick view of recent transactions.
- **Effortless Transaction Tracking:** Quickly add income or expense transactions with descriptions, dates, and categories through a clean, user-friendly modal.
- **Dynamic Monthly Budgeting:** Set spending limits for each category to stay on top of your finances. The UI provides real-time feedback on your total budgeted amount versus your monthly income.
- **Dedicated Event Budgets:** Create separate budgets for special events like vacations, birthdays, or projects. This keeps one-off expenses isolated from your regular monthly finances for clearer tracking.
- **Insightful Spending Analytics:** Visualize your spending per category against your set budget with clear, color-coded progress bars. Instantly see where you're over budget.
- **Comprehensive Transaction History:** Review your financial activity for all previous months in an organized, collapsible accordion view. Sort transactions by date for easy analysis.
- **Fully Customizable Categories:** Add, edit, or delete spending categories. Personalize each with a unique name, color, and a wide selection of icons to make the app truly yours.
- **Secure Data Backup & Restore:** Easily export all your application data (transactions, budgets, events) to a single JSON file for backup. Import it on any device to restore your state, ensuring you never lose your data.
- **100% Local Data Storage:** All your financial data is stored securely in your browser's `localStorage`. There are no cloud accounts, no data sharing, and no internet connection required for core functionality.
- **Beautiful Theming:** Choose from a clean **Light** theme, a sleek **Dark** theme, or a romantic **Rose** theme to match your style.
- **Fully Responsive Design:** A mobile-first design that works beautifully on all screen sizes, from phones to desktops, with dedicated navigation for each.
- **Multi-Language Support:** The app supports multiple languages (English and Spanish) and automatically detects the user's browser preference on first load.

---

## 🚀 Tech Stack & Philosophy

This project is built with modern, minimalist web technologies, prioritizing performance, developer experience, and maintainability without a complex build setup.

- **[React 19](https://react.dev/):** The core of our UI, using the latest features for building a fast, component-based interface.
- **[TypeScript](https://www.typescriptlang.org/):** Ensures code quality, maintainability, and a robust development experience with static typing.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework that allows for rapid, custom UI development directly in the markup without writing custom CSS. It's configured to work with our dynamic theming engine.
- **Custom SVG Icons:** All icons are implemented as React components for consistency, performance, and easy styling.
- **Zero-Build with ES Modules:** The app uses native ES Modules directly in the browser via an `importmap` in `index.html`. This eliminates the need for a complex build pipeline (like Webpack or Vite) for development, simplifying the setup and speeding up load times.

---

## 🛠️ Getting Started

### Prerequisites

You only need a modern web browser and a local web server to run this project. A simple way to do this is with Python or a VS Code extension.

### Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/meme-budget.git
    cd meme-budget
    ```

2.  Start a local web server from the project root.

    **Using Python:**
    ```bash
    # For Python 3
    python -m http.server
    ```

    **Using VS Code:**
    Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click "Go Live" from the bottom-right status bar.

3.  Open your browser and navigate to the provided local address (e.g., `http://localhost:8000`).

---

## 📁 Project Structure

The project is organized into a clear and modular structure to promote separation of concerns.

```
.
├── components/         # Reusable React components (Dashboard, Modals, Nav, etc.)
├── context/            # React Context for global state (LocalizationContext)
├── hooks/              # Custom React hooks (useLocalStorage, useClickOutside)
├── locales/            # Translation files for internationalization (i18n)
├── utils/              # Standalone utility functions (e.g., theme generation)
├── App.tsx             # Main application component; acts as the single source of truth
├── index.tsx           # Entry point for the React application, renders App.tsx
├── index.html          # The single HTML page that loads the app, scripts, and styles
├── constants.ts        # Default application constants (e.g., default categories)
├── theme.ts            # Color palette and theme definitions for all themes
└── types.ts            # Centralized TypeScript type definitions for the entire app
```

---

## 🧠 Core Concepts Explained

### State Management & Data Persistence

The application's state is managed within the main `App.tsx` component using React's built-in hooks (`useState`, `useEffect`, `useMemo`), acting as a single source of truth.

To ensure data persistence and offline functionality, a custom hook `useLocalStorage` is employed. This hook syncs state variables (like transactions, categories, and budgets) with the browser's `localStorage`. It automatically saves any changes and rehydrates the state on page load. It also includes robust error handling for cases where storage is unavailable or corrupted, alerting the user gracefully.

### Theming Engine

The app supports multiple themes (light, dark, rose), defined as simple objects in `theme.ts`. The `generateThemeCss` utility converts these theme objects into CSS custom properties (variables) at runtime. These variables are then injected into a `<style>` tag in the document head.

Tailwind CSS is configured in `index.html` to use these CSS variables for semantic coloring (e.g., `bg-background`, `text-primary`). This allows the entire UI to adapt instantly when the theme is toggled without a page reload.

### Responsive Navigation

The application is a Single Page Application (SPA) where view navigation is handled by a state variable (`activeView`) in `App.tsx`. The navigation UI is responsive:
- **Mobile:** A `BottomNav` component is rendered, providing familiar, thumb-friendly navigation.
- **Desktop/Tablet:** On screens wider than the `md` breakpoint (768px), the bottom nav is hidden, and a persistent `SideNav` component is displayed for a traditional desktop experience.

### Privacy-First Data Handling

User privacy is paramount. All data is stored exclusively on the user's device in `localStorage`. There is no backend server, no user accounts, and no network requests for data.

The **Import/Export** feature empowers users to manage their own data. The export function uses the `Blob` and `URL.createObjectURL` APIs to create a downloadable JSON file. The import function uses the `FileReader` API to read a user-selected file and safely parse it before overwriting the application state, giving the user full control.

### Internationalization (i18n)

Localization is managed via `LocalizationContext`. It detects the user's browser language on first visit to set the default language. The `useLocalization` hook provides a `t` function to all components, which retrieves translated strings from the appropriate file in the `locales/` directory. This function also supports dynamic placeholder replacements for values like currency amounts.

### Accessibility (a11y)

We strive to make Meme Budget accessible to everyone. Key accessibility practices include:
- **Semantic HTML:** Using appropriate HTML5 tags (`<nav>`, `<header>`, `<main>`, `<section>`).
- **ARIA Roles:** Applying ARIA attributes (`aria-label`, `aria-expanded`, `role="progressbar"`) to enhance screen reader compatibility for custom components like dropdowns and progress bars.
- **Keyboard Navigation:** Ensuring all interactive elements are focusable and usable with a keyboard.
- **Color Contrast:** Themes are designed with color contrast in mind to ensure readability.

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue to discuss it.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details. _(Note: LICENSE.md file not included in this project)_
