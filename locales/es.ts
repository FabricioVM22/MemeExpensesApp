/**
 * @file Spanish translation strings for the Meme Budget application.
 * This file contains a key-value map of all the Spanish text used in the UI,
 * mirroring the structure of the English translation file.
 */

import { TranslationKey } from "./en";

export const es: Record<TranslationKey, string> = {
  // General
  currencySymbol: '₡',
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
  history: 'Historial',
  events: 'Eventos',
  
  // Dashboard.tsx
  currentBalance: 'Balance Actual',
  planYourMonth: '¡Planifica Tu Mes!',
  budgetNotSet: "No has establecido un presupuesto para este mes. Ve a ajustes para crear uno.",
  setBudget: 'Establecer Presupuesto',
  recentTransactions: 'Transacciones Recientes',
  noTransactions: 'No hay transacciones este mes.',

  // Analytics.tsx
  spendingAnalytics: 'Análisis de Gastos',
  noSpendingData: 'No hay datos de gastos disponibles para este mes. Añade algunos gastos o establece un presupuesto para ver tus análisis.',
  spendingVsBudget: 'Gastos vs Presupuesto',
  overBudgetWarning: '${amount} sobre el presupuesto',

  // History.tsx
  noHistory: 'No se encontraron registros de meses pasados.',
  totalBalance: 'Balance Total',
  sortByDate: 'Ordenar por fecha',
  sortNewestFirst: 'Más recientes primero',
  sortOldestFirst: 'Más antiguos primero',

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
  categoryIcon: 'Ícono',
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
  language: 'Idioma',
  languageDesc: 'Elige el idioma de visualización para la aplicación.',
  selectLanguage: 'Seleccionar Idioma',
  dataManagement: 'Gestión de Datos',
  dataManagementDesc: 'Exporta tus datos para hacer una copia de seguridad o importarlos en otro dispositivo.',
  exportData: 'Exportar Datos',
  importData: 'Importar Datos',
  importConfirm: '¿Estás seguro de que quieres importar datos? Esta acción sobrescribirá todos los datos actuales de la aplicación.',
  importSuccess: '¡Datos importados con éxito!',
  importErrorInvalidFile: 'Error en la importación. El archivo seleccionado no es válido o está dañado. Por favor, utiliza un archivo de respaldo válido.',
  
  // AddTransactionModal.tsx
  addTransactionTitle: 'Añadir Transacción',
  errorAllFields: 'Por favor, rellena todos los campos',
  placeholderExpense: 'ej., Café',
  placeholderIncome: 'ej., Salario',
  addExpenseToEvent: 'Añadir Gasto al Evento',

  // Events Feature
  addEvent: 'Añadir Evento',
  editEvent: 'Editar Evento',
  eventName: 'Nombre del Evento',
  eventBudget: 'Presupuesto del Evento',
  noEvents: 'Aún no has creado eventos.',
  createFirstEvent: '¡Crea tu primer presupuesto para un evento!',
  totalSpent: 'Total Gastado',
  remaining: 'Restante',
  eventBudgetDetails: 'Detalles del Presupuesto del Evento',
  eventTransactions: 'Transacciones del Evento',
  noEventTransactions: 'Aún no se han registrado gastos para este evento.',
  addEventSuccess: '¡Evento creado con éxito!',
  errorEventName: 'Por favor, introduce un nombre para el evento.',
  errorEventBudget: 'Por favor, introduce un monto de presupuesto válido.',
  backToEvents: 'Volver a Eventos',
  editEventTitle: 'Editar Evento',
  deleteEvent: 'Eliminar Evento',
  confirmDeleteEventTitle: 'Eliminar Evento',
  confirmDeleteEventDesc: '¿Estás seguro? Eliminar este evento también eliminará permanentemente todas sus transacciones asociadas.',
  deleteEventSuccess: '¡Evento eliminado con éxito!',
  editEventSuccess: '¡Evento actualizado con éxito!',
  loveMessage: 'Hecho con ❤️ para alguien especial',
};