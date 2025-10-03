/**
 * @file English translation file for the Meme Budget application.
 */

export const en = {
  // Common
  currencySymbol: '₡',
  save: 'Save',
  cancel: 'Cancel',
  
  // Navigation
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  history: 'History',
  settings: 'Settings',
  events: 'Events',

  // Actions
  addTransaction: 'Add Transaction',
  setBudget: 'Set Budget',
  saveBudget: 'Save Budgets',
  addCategory: 'Add Category',
  editCategory: 'Edit Category',
  deleteCategory: 'Delete Category',
  addEvent: 'New Event',
  editEvent: 'Edit Event',
  deleteEvent: 'Delete Event',
  exportData: 'Export Data',
  importData: 'Import Data',
  expense: 'Expense',
  
  // Dashboard
  currentBalance: 'Current Balance',
  income: 'Income',
  expenses: 'Expenses',
  planYourMonth: 'Plan your month!',
  budgetNotSet: 'You haven\'t set a budget yet. Setting one helps you track your spending.',
  recentTransactions: 'Recent Transactions',
  noTransactions: 'No transactions this month.',

  // Analytics
  spendingAnalytics: 'Spending Analytics',
  spendingVsBudget: 'Spending vs. Budget',
  noSpendingData: 'No spending or budget data to analyze for this month. Add some expenses and set budgets to get started!',
  overBudgetWarning: 'Over budget by ${amount}',

  // History
  totalBalance: 'Total Balance',
  noHistory: 'No transaction history from previous months found.',
  historyPlaceholderTitle: "This is what your history will look like!",
  historyPlaceholderDesc: "Once you have transactions from previous months, they'll show up here, neatly organized.",
  lastMonthExample: "Last Month Example",
  placeholder_rent: "Rent Payment",
  placeholder_salary: "Monthly Salary",
  placeholder_coffee: "Daily Coffee",
  sortByDate: 'Sort by date',
  sortNewestFirst: 'Newest first',
  sortOldestFirst: 'Oldest first',

  // Settings
  budgetSettings: 'Monthly Budget Settings',
  budgetSettingsDesc: 'Set your spending limits for each category for the current month.',
  totalIncome: 'Total Income',
  totalBudgeted: 'Total Budgeted',
  manageCategories: 'Manage Categories',
  manageCategoriesDesc: 'Add, edit, or delete your spending categories.',
  dataManagement: 'Data Management',
  dataManagementDesc: 'Backup your data to a file or import it from a previous backup.',
  notifications: 'Notifications',
  notificationsDesc: 'Set your preferences for reminders and alerts.',
  notificationFrequency: 'Notification Frequency',
  freq_monthly: 'Monthly',
  freq_weekly: 'Weekly',
  freq_daily: 'Daily',
  freq_never: 'Never',
  language: 'Language',
  languageDesc: 'Choose your preferred language for the application.',
  selectLanguage: 'Select Language',
  loveMessage: 'Made with ❤️ for better budgeting',

  // Events
  eventName: 'Event Name',
  eventBudget: 'Event Budget',
  addEventSuccess: 'Event added successfully!',
  editEventSuccess: 'Event updated successfully!',
  deleteEventSuccess: 'Event and its transactions have been deleted.',
  confirmDeleteEventDesc: 'Are you sure you want to delete this event? All associated transactions will also be deleted. This action cannot be undone.',
  noEvents: 'No special events planned?',
  createFirstEvent: 'Create one for a vacation, party, or any savings goal!',
  backToEvents: 'Back to Events',
  eventBudgetDetails: 'Event Budget Details',
  totalSpent: 'Total Spent',
  spent: 'spent',
  budget: 'Budget',
  remaining: 'Remaining',
  eventTransactions: 'Event Transactions',
  noEventTransactions: 'No expenses have been added to this event yet.',
  editEventTitle: 'Edit Event',

  // Modals (General)
  errorCategoryName: 'Please enter a category name.',
  errorEventName: 'Please enter an event name.',
  errorEventBudget: 'Please enter a valid, positive budget amount.',
  
  // Modals (Category)
  categoryName: 'Category Name',
  categoryColor: 'Category Color',
  categoryIcon: 'Category Icon',
  addCategorySuccess: 'Category added successfully!',
  editCategorySuccess: 'Category updated successfully!',
  deleteCategorySuccess: 'Category deleted successfully!',
  errorDeleteOtherCategory: 'The "Other" category cannot be deleted.',
  confirmDeleteDesc: 'Are you sure you want to delete this category? All associated transactions will be moved to "Other".',

  // Modals (Transaction)
  newTransaction: 'New Transaction',
  type: 'Type',
  amount: 'Amount',
  description: 'Description',
  date: 'Date',
  category: 'Category',
  selectCategory: 'Select a category',
  errorAmount: 'Please enter a valid, positive amount.',
  errorDescription: 'Please enter a description.',
  errorCategory: 'Please select a category for the expense.',

  // Data Management
  importConfirm: 'This will overwrite all your current data. Are you sure you want to proceed?',
  importSuccess: 'Data imported successfully!',
  importErrorInvalidFile: 'Import failed. The file is invalid or corrupted.',
  budgetSavedSuccess: 'Budgets saved successfully!',

  // Default Categories
  category_groceries: 'Groceries',
  category_transport: 'Transport',
  category_housing: 'Housing',
  category_entertainment: 'Entertainment',
  category_health: 'Health',
  category_shopping: 'Shopping',
  category_food: 'Food & Dining',
  category_utilities: 'Utilities',
  category_other: 'Other',
};

export type TranslationKey = keyof typeof en;