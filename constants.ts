/**
 * @file Defines constant values used throughout the application.
 */

import { Category } from './types';

/**
 * A list of default categories provided to the user on first use.
 * Category names starting with 'category_' are treated as translation keys.
 */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'groceries', name: 'category_groceries', color: '#10b981' }, // Teal
  { id: 'transport', name: 'category_transport', color: '#3b82f6' }, // Blue
  { id: 'housing', name: 'category_housing', color: '#6b7280' },    // Gray
  { id: 'entertainment', name: 'category_entertainment', color: '#8b5cf6' }, // Violet
  { id: 'health', name: 'category_health', color: '#ec4899' },    // Pink
  { id: 'shopping', name: 'category_shopping', color: '#f97316' }, // Orange
  { id: 'food', name: 'category_food', color: '#ef4444' },    // Red
  { id: 'utilities', name: 'category_utilities', color: '#eab308' }, // Yellow
  { id: 'other', name: 'category_other', color: '#a8a29e' },   // Stone
];