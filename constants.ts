/**
 * @file Defines constant values used throughout the application.
 */

import { Category } from './types';

/**
 * A list of default categories provided to the user on first use.
 * Category names starting with 'category_' are treated as translation keys.
 */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'groceries', name: 'category_groceries', color: '#10b981', icon: 'shopping-cart' },
  { id: 'transport', name: 'category_transport', color: '#3b82f6', icon: 'car' },
  { id: 'housing', name: 'category_housing', color: '#6b7280', icon: 'home-modern' },
  { id: 'entertainment', name: 'category_entertainment', color: '#8b5cf6', icon: 'ticket' },
  { id: 'health', name: 'category_health', color: '#ec4899', icon: 'heart-pulse' },
  { id: 'shopping', name: 'category_shopping', color: '#f97316', icon: 'shopping-bag' },
  { id: 'food', name: 'category_food', color: '#ef4444', icon: 'restaurant' },
  { id: 'utilities', name: 'category_utilities', color: '#eab308', icon: 'light-bulb' },
  { id: 'other', name: 'category_other', color: '#a8a29e', icon: 'tag' },
];