/**
 * @file Centralized type definitions for the Meme Budget application.
 */

/**
 * Represents a special event budget, like a vacation or party.
 * Transactions linked to an event are tracked separately from the main monthly budget.
 */
export interface Event {
  /** A unique identifier for the event. */
  id: string;
  /** The user-defined name of the event (e.g., "Summer Vacation"). */
  name: string;
  /** The total budget allocated for this event. */
  budget: number;
}

/**
 * Represents a single financial transaction, either income or an expense.
 */
export interface Transaction {
  /** A unique identifier for the transaction. */
  id: string;
  /** The type of transaction. */
  type: 'income' | 'expense';
  /** The monetary value of the transaction. */
  amount: number;
  /** A user-provided description of the transaction. */
  description: string;
  /** The date of the transaction in ISO format (YYYY-MM-DD). */
  date: string;
  /** The ID of the category this transaction belongs to (only for expenses). */
  categoryId?: string;
  /** The ID of the event this transaction is associated with (optional). */
  eventId?: string;
}

/**
 * Represents a spending category.
 */
export interface Category {
  /** A unique identifier for the category. */
  id:string;
  /** The name of the category. Can be a translation key for default categories. */
  name: string;
  /** A hex color code associated with the category for UI elements. */
  color: string;
  /** The name of the icon associated with the category. */
  icon: string;
}

/**
 * Represents the budget amount set for a specific category within a month.
 */
export interface Budget {
  /** The ID of the category the budget is for. */
  categoryId: string;
  /** The budgeted amount for this category. */
  amount: number;
}

/**
 * Defines the possible views/screens in the application's navigation.
 */
export enum View {
  Dashboard = 'dashboard',
  Analytics = 'analytics',
  Settings = 'settings',
  History = 'history',
  Events = 'events',
}