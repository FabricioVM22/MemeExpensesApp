/**
 * @file This file contains centralized TypeScript type definitions for the entire
 * Meme Budget application, ensuring a consistent and predictable data structure.
 */

/**
 * Represents a special event budget, like a vacation or party.
 * Transactions linked to an event are tracked separately from the main monthly budget.
 */
export interface Event {
  /** A unique identifier for the event, generated using `crypto.randomUUID()`. */
  id: string;
  /** The user-defined name of the event (e.g., "Summer Vacation"). */
  name: string;
  /** The total budget allocated for this event. */
  budget: number;
}

/**
 * Represents a single financial transaction, which can be either income or an expense.
 */
export interface Transaction {
  /** A unique identifier for the transaction, generated using `crypto.randomUUID()`. */
  id: string;
  /** The type of transaction. */
  type: 'income' | 'expense';
  /** The monetary value of the transaction, always a positive number. */
  amount: number;
  /** A user-provided description of the transaction (e.g., "Monthly Salary", "Coffee"). */
  description: string;
  /** The date of the transaction in ISO format (YYYY-MM-DD). */
  date: string;
  /** The ID of the category this transaction belongs to. Required for expenses, undefined for income. */
  categoryId?: string;
  /** If this transaction is part of an event, this holds the event's ID. */
  eventId?: string;
}

/**
 * Represents a spending category that users can assign to their expenses.
 */
export interface Category {
  /** A unique identifier for the category (e.g., 'groceries', 'transport'). */
  id:string;
  /** The display name of the category. Can be a translation key for default categories. */
  name: string;
  /** A hex color code associated with the category for UI elements like charts and icons. */
  color: string;
  /** The string identifier for the icon associated with the category (e.g., 'shopping-cart'). */
  icon: string;
}

/**
 * Represents the budget amount set for a specific category within a single month.
 * These are stored in a record where the key is the month (e.g., "2023-10").
 */
export interface Budget {
  /** The ID of the category this budget applies to. */
  categoryId: string;
  /** The budgeted amount for this category for the month. */
  amount: number;
}

/**
 * Defines the possible primary views/screens in the application's navigation.
 */
export enum View {
  Dashboard = 'dashboard',
  Analytics = 'analytics',
  Settings = 'settings',
  History = 'history',
  Events = 'events',
}
