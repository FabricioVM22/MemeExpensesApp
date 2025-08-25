
import { TranslationKey } from "./en";

export const es: Record<TranslationKey, string> = {
  // General
  income: 'Ingresos',
  expense: 'Gasto',
  expenses: 'Gastos',
  budget: 'Presupuesto',
  spent: 'Gastado',
  cancel: 'Cancelar',
  add: 'Añadir',
  settings: 'Ajustes',
  description: 'Descripción',
  amount: 'Monto',
  category: 'Categoría',
  save: 'Guardar',
  delete: 'Eliminar',

  // Categories
  category_groceries: 'Supermercado',
  category_transport: 'Transporte',
  category_housing: 'Vivienda',
  category_entertainment: 'Entretenimiento',
  category_health: 'Salud',
  category_shopping: 'Compras',
  category_food: 'Comida y Cena',
  category_utilities: 'Servicios',
  category_other: 'Otro',

  // App.tsx
  addTransaction: 'Añadir Transacción',

  // BottomNav.tsx
  dashboard: 'Panel',
  analytics: 'Análisis',
  
  // Dashboard.tsx
  currentBalance: 'Balance Actual',
  planYourMonth: '¡Planifica Tu Mes!',
  budgetNotSet: "No has establecido un presupuesto para este mes. Ve a ajustes para crear uno.",
  setBudget: 'Establecer Presupuesto',
  recentTransactions: 'Transacciones Recientes',
  noTransactions: 'No hay transacciones este mes.',

  // Analytics.tsx
  loadingCharts: 'Cargando Gráficos...',
  spendingAnalytics: 'Análisis de Gastos',
  noSpendingData: 'No hay datos de gastos disponibles para este mes. Añade algunos gastos o establece un presupuesto para ver tus análisis.',
  spendingVsBudget: 'Gastos vs Presupuesto',
  tooltipSpent: 'Gastado: ${amount}',
  tooltipBudget: 'Presupuesto: ${amount}',

  // Settings.tsx
  monthlyBudget: 'Presupuesto Mensual',
  setSpendingLimits: 'Establece tus límites de gasto para cada categoría para el mes actual.',
  totalIncome: 'Ingresos Totales',
  totalBudgeted: 'Total Presupuestado',
  saveBudget: 'Guardar Presupuestos',
  budgetSavedSuccess: '¡Presupuestos guardados con éxito!',
  budgetSettings: 'Presupuestos Mensuales',
  budgetSettingsDesc: 'Define tus límites de gasto para cada categoría en el mes actual.',
  manageCategories: 'Gestionar Categorías',
  manageCategoriesDesc: 'Añade, edita o elimina tus categorías de gastos.',
  addCategory: 'Añadir Nueva Categoría',
  editCategory: 'Editar Categoría',
  deleteCategory: 'Eliminar Categoría',
  categoryName: 'Nombre de la Categoría',
  categoryColor: 'Color de la Categoría',
  confirmDeleteTitle: 'Eliminar Categoría',
  confirmDeleteDesc: '¿Estás seguro de que quieres eliminar esta categoría? Todas las transacciones asociadas se moverán a "Otro".',
  deleteCategorySuccess: 'Categoría eliminada. Las transacciones se movieron a "Otro".',
  addCategorySuccess: '¡Categoría añadida con éxito!',
  editCategorySuccess: '¡Categoría actualizada con éxito!',
  errorDeleteOtherCategory: 'La categoría "Otro" no se puede eliminar.',
  errorCategoryName: 'Por favor, introduce un nombre para la categoría.',
  notifications: 'Notificaciones',
  notificationsDesc: 'Configura tus preferencias para recordatorios y actualizaciones.',
  notificationFrequency: 'Frecuencia de Recordatorios',
  freq_daily: 'Diaria',
  freq_weekly: 'Semanal',
  freq_monthly: 'Mensual',
  freq_never: 'Nunca',
  
  // AddTransactionModal.tsx
  addTransactionTitle: 'Añadir Transacción',
  errorAllFields: 'Por favor, rellena todos los campos',
  placeholderExpense: 'ej., Café',
  placeholderIncome: 'ej., Salario',
};