/**
 * @file Main entry point for the Meme Budget React application.
 * This file handles the initial rendering of the App component into the DOM.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocalizationProvider } from './context/LocalizationContext';

// Find the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root and render the main App component.
const root = ReactDOM.createRoot(rootElement);
root.render(
  // StrictMode is a tool for highlighting potential problems in an application.
  <React.StrictMode>
    {/* LocalizationProvider wraps the app to provide translation capabilities. */}
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);