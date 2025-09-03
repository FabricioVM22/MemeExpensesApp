/**
 * @file English translation strings for the Meme Budget application.
 * This file contains a key-value map of all the English text used in the UI.
 * The keys are used by the localization context to retrieve the correct string.
 */

export const en = {
  // General
  currencySymbol: '₡',
  income: 'Income',
  expense: 'Expense',
  expenses: 'Expenses',
  budget: 'Budget',
  spent: 'Spent',
  cancel: 'Cancel',
  add: 'Add',
  settings: 'Settings',
  description: 'Description',
  amount: 'Amount',
  category: 'Category',
  save: 'Save',
  delete: 'Delete',
  
  // Categories
  category_groceries: 'Groceries',
  category_transport: 'Transport',
  category_housing: 'Housing',
  category_entertainment: 'Entertainment',
  category_health: 'Health',
  category_shopping: 'Shopping',
  category_food: 'Food & Dining',
  category_utilities: 'Utilities',
  category_other: 'Other',

  // App.tsx
  addTransaction: 'Add Transaction',

  // BottomNav.tsx
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  history: 'History',
  events: 'Events',
  
  // Dashboard.tsx
  currentBalance: 'Current Balance',
  planYourMonth: 'Plan Your Month!',
  budgetNotSet: "You haven't set a budget for this month. Go to settings to create one.",
  setBudget: 'Set Budget',
  recentTransactions: 'Recent Transactions',
  noTransactions: 'No transactions this month.',

  // Analytics.tsx
  spendingAnalytics: 'Spending Analytics',
  noSpendingData: 'No spending data available for this month. Add some expenses or set a budget to see your analytics.',
  spendingVsBudget: 'Spending vs Budget',
  overBudgetWarning: '${amount} over budget',

  // History.tsx
  noHistory: 'No past monthly records found.',
  totalBalance: 'Total Balance',
  sortByDate: 'Sort by date',
  sortNewestFirst: 'Newest first',
  sortOldestFirst: 'Oldest first',

  // Settings.tsx
  monthlyBudget: 'Monthly Budget', // Legacy, now budgetSettings
  setSpendingLimits: "Set your spending limits for each category for the current month.", // Legacy, now budgetSettingsDesc
  totalIncome: 'Total Income',
  totalBudgeted: 'Total Budgeted',
  saveBudget: 'Save Budgets',
  budgetSavedSuccess: 'Budgets saved successfully!',
  budgetSettings: 'Monthly Budgets',
  budgetSettingsDesc: 'Set your spending limits for each category for the current month.',
  manageCategories: 'Manage Categories',
  manageCategoriesDesc: 'Add, edit, or delete your spending categories.',
  addCategory: 'Add New Category',
  editCategory: 'Edit Category',
  deleteCategory: 'Delete Category',
  categoryName: 'Category Name',
  categoryColor: 'Category Color',
  confirmDeleteTitle: 'Delete Category',
  confirmDeleteDesc: 'Are you sure you want to delete this category? All associated transactions will be moved to "Other".',
  deleteCategorySuccess: 'Category deleted. Transactions moved to "Other".',
  addCategorySuccess: 'Category added successfully!',
  editCategorySuccess: 'Category updated successfully!',
  errorDeleteOtherCategory: 'The "Other" category cannot be deleted.',
  errorCategoryName: 'Please enter a category name.',
  notifications: 'Notifications',
  notificationsDesc: 'Set your preferences for reminders and updates.',
  notificationFrequency: 'Reminder Frequency',
  freq_daily: 'Daily',
  freq_weekly: 'Weekly',
  freq_monthly: 'Monthly',
  freq_never: 'Never',
  
  // AddTransactionModal.tsx
  addTransactionTitle: 'Add Transaction',
  errorAllFields: 'Please fill all fields',
  placeholderExpense: 'e.g., Coffee',
  placeholderIncome: 'e.g., Paycheck',
  addExpenseToEvent: 'Add Expense to Event',

  // Events Feature
  addEvent: 'Add Event',
  editEvent: 'Edit Event',
  eventName: 'Event Name',
  eventBudget: 'Event Budget',
  noEvents: 'No events created yet.',
  createFirstEvent: 'Create your first event budget!',
  totalSpent: 'Total Spent',
  remaining: 'Remaining',
  eventBudgetDetails: 'Event Budget Details',
  eventTransactions: 'Event Transactions',
  noEventTransactions: 'No expenses recorded for this event yet.',
  addEventSuccess: 'Event created successfully!',
  errorEventName: 'Please enter an event name.',
  errorEventBudget: 'Please enter a valid budget amount.',
  backToEvents: 'Back to Events',
  editEventTitle: 'Edit Event',
  deleteEvent: 'Delete Event',
  confirmDeleteEventTitle: 'Delete Event',
  confirmDeleteEventDesc: 'Are you sure? Deleting this event will also permanently remove all of its associated transactions.',
  deleteEventSuccess: 'Event deleted successfully!',
  editEventSuccess: 'Event updated successfully!',
};

/**
 * A type representing all possible translation keys.
 * This ensures type safety when using the `t` function.
 */
export type TranslationKey = keyof typeof en;