/**
 * @file Spanish translation file for the Meme Budget application.
 */

import { en } from './en';

export const es: typeof en = {
  // Common
  currencySymbol: '₡',
  save: 'Guardar',
  cancel: 'Cancelar',

  // Navigation
  dashboard: 'Panel',
  analytics: 'Análisis',
  history: 'Historial',
  settings: 'Ajustes',
  events: 'Eventos',

  // Actions
  addTransaction: 'Añadir Transacción',
  setBudget: 'Fijar Presupuesto',
  saveBudget: 'Guardar Presupuestos',
  addCategory: 'Añadir Categoría',
  editCategory: 'Editar Categoría',
  deleteCategory: 'Eliminar Categoría',
  addEvent: 'Nuevo Evento',
  editEvent: 'Editar Evento',
  deleteEvent: 'Eliminar Evento',
  exportData: 'Exportar Datos',
  importData: 'Importar Datos',
  expense: 'Gasto',

  // Dashboard
  currentBalance: 'Saldo Actual',
  income: 'Ingresos',
  expenses: 'Gastos',
  planYourMonth: '¡Planifica tu mes!',
  budgetNotSet: 'Aún no has fijado un presupuesto. Hacerlo te ayuda a seguir tus gastos.',
  recentTransactions: 'Transacciones Recientes',
  noTransactions: 'No hay transacciones este mes.',

  // Analytics
  spendingAnalytics: 'Análisis de Gastos',
  spendingVsBudget: 'Gastos vs. Presupuesto',
  noSpendingData: 'No hay datos de gastos o presupuesto para analizar este mes. ¡Añade gastos y fija presupuestos para empezar!',
  overBudgetWarning: 'Excedido por ${amount}',

  // History
  totalBalance: 'Saldo Total',
  noHistory: 'No se encontró historial de transacciones de meses anteriores.',
  historyPlaceholderTitle: "¡Así se verá tu historial!",
  historyPlaceholderDesc: "Cuando tengas transacciones de meses anteriores, aparecerán aquí, organizadas y listas para consultar.",
  lastMonthExample: "Ejemplo del Mes Pasado",
  placeholder_rent: "Pago de Alquiler",
  placeholder_salary: "Salario Mensual",
  placeholder_coffee: "Café Diario",
  sortByDate: 'Ordenar por fecha',
  sortNewestFirst: 'Más recientes',
  sortOldestFirst: 'Más antiguos',

  // Settings
  budgetSettings: 'Ajustes del Presupuesto Mensual',
  budgetSettingsDesc: 'Establece tus límites de gasto para cada categoría en el mes actual.',
  totalIncome: 'Ingresos Totales',
  totalBudgeted: 'Total Presupuestado',
  manageCategories: 'Gestionar Categorías',
  manageCategoriesDesc: 'Añade, edita o elimina tus categorías de gastos.',
  dataManagement: 'Gestión de Datos',
  dataManagementDesc: 'Haz una copia de seguridad de tus datos en un archivo o impórtalos desde una copia anterior.',
  notifications: 'Notificaciones',
  notificationsDesc: 'Configura tus preferencias para recordatorios y alertas.',
  notificationFrequency: 'Frecuencia de Notificación',
  freq_monthly: 'Mensual',
  freq_weekly: 'Semanal',
  freq_daily: 'Diaria',
  freq_never: 'Nunca',
  language: 'Idioma',
  languageDesc: 'Elige tu idioma preferido para la aplicación.',
  selectLanguage: 'Seleccionar Idioma',
  loveMessage: 'Hecho con ❤️ para un mejor presupuesto',

  // Events
  eventName: 'Nombre del Evento',
  eventBudget: 'Presupuesto del Evento',
  addEventSuccess: '¡Evento añadido con éxito!',
  editEventSuccess: '¡Evento actualizado con éxito!',
  deleteEventSuccess: 'El evento y sus transacciones han sido eliminados.',
  confirmDeleteEventDesc: '¿Estás seguro de que quieres eliminar este evento? Todas las transacciones asociadas también se eliminarán. Esta acción no se puede deshacer.',
  noEvents: '¿No hay eventos especiales planeados?',
  createFirstEvent: '¡Crea uno para unas vacaciones, una fiesta o cualquier meta de ahorro!',
  backToEvents: 'Volver a Eventos',
  eventBudgetDetails: 'Detalles del Presupuesto del Evento',
  totalSpent: 'Total Gastado',
  spent: 'gastado',
  budget: 'Presupuesto',
  remaining: 'Restante',
  eventTransactions: 'Transacciones del Evento',
  noEventTransactions: 'Aún no se han añadido gastos a este evento.',
  editEventTitle: 'Editar Evento',

  // Modals (General)
  errorCategoryName: 'Por favor, introduce un nombre para la categoría.',
  errorEventName: 'Por favor, introduce un nombre para el evento.',
  errorEventBudget: 'Por favor, introduce un monto de presupuesto válido y positivo.',
  
  // Modals (Category)
  categoryName: 'Nombre de Categoría',
  categoryColor: 'Color de Categoría',
  categoryIcon: 'Icono de Categoría',
  addCategorySuccess: '¡Categoría añadida con éxito!',
  editCategorySuccess: '¡Categoría actualizada con éxito!',
  deleteCategorySuccess: '¡Categoría eliminada con éxito!',
  errorDeleteOtherCategory: 'La categoría "Otros" no se puede eliminar.',
  confirmDeleteDesc: '¿Estás seguro de que quieres eliminar esta categoría? Todas las transacciones asociadas se moverán a "Otros".',

  // Modals (Transaction)
  newTransaction: 'Nueva Transacción',
  type: 'Tipo',
  amount: 'Monto',
  description: 'Descripción',
  date: 'Fecha',
  category: 'Categoría',
  selectCategory: 'Selecciona una categoría',
  errorAmount: 'Por favor, introduce un monto válido y positivo.',
  errorDescription: 'Por favor, introduce una descripción.',
  errorCategory: 'Por favor, selecciona una categoría para el gasto.',

  // Data Management
  importConfirm: 'Esto sobrescribirá todos tus datos actuales. ¿Estás seguro de que quieres continuar?',
  importSuccess: '¡Datos importados con éxito!',
  importErrorInvalidFile: 'Error al importar. El archivo es inválido o está corrupto.',
  budgetSavedSuccess: '¡Presupuestos guardados con éxito!',

  // Default Categories
  category_groceries: 'Supermercado',
  category_transport: 'Transporte',
  category_housing: 'Vivienda',
  category_entertainment: 'Ocio',
  category_health: 'Salud',
  category_shopping: 'Compras',
  category_food: 'Comida y Restaurantes',
  category_utilities: 'Servicios',
  category_other: 'Otros',
};