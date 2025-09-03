/**
 * @file Renders the settings view for the application.
 * This component allows users to manage their monthly budgets,
 * add/edit/delete categories, and set notification preferences.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Budget, Category, Transaction } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CategoryModal from './CategoryModal';
import { EditIcon, TrashIcon } from './icons';

/**
 * Props for the Settings component.
 */
interface SettingsProps {
  /** The list of all available categories. */
  categories: Category[];
  /** Function to update the list of categories. */
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  /** The budget settings for the current month. */
  budget: Budget[];
  /** Function to update the budget for the current month. */
  setMonthBudget: (newBudgets: Budget[]) => void;
  /** The list of all main transactions (excluding event transactions). */
  transactions: Transaction[];
  /** Function to update the global list of transactions. */
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

/**
 * The settings component.
 * @param {SettingsProps} props - The props for the component.
 * @returns The rendered settings UI.
 */
export default function Settings({ categories, setCategories, budget, setMonthBudget, transactions, setTransactions }: SettingsProps): React.ReactNode {
  const { t } = useLocalization();
  // Local state to manage budget input fields before saving
  const [localBudgets, setLocalBudgets] = useState<Record<string, number>>({});
  const [notificationFrequency, setNotificationFrequency] = useLocalStorage('notificationFrequency', 'monthly');

  // State for category management modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  /**
   * Effect to synchronize the local budget state with the global budget prop
   * when the component mounts or the global budget changes.
   */
  useEffect(() => {
    const budgetMap = budget.reduce((acc, b) => {
      acc[b.categoryId] = b.amount;
      return acc;
    }, {} as Record<string, number>);
    setLocalBudgets(budgetMap);
  }, [budget]);

  /**
   * Handles changes to a budget input field.
   * @param {string} categoryId - The ID of the category being updated.
   * @param {string} amount - The new budget amount from the input field.
   */
  const handleBudgetChange = (categoryId: string, amount: string) => {
    const newAmount = parseFloat(amount) || 0;
    setLocalBudgets(prev => ({ ...prev, [categoryId]: newAmount }));
  };

  /**
   * Saves the locally edited budgets to the global state.
   */
  const handleSaveBudgets = () => {
    const newBudgets: Budget[] = Object.entries(localBudgets)
        .map(([categoryId, amount]) => ({ categoryId, amount }))
        .filter(b => b.amount > 0);
    setMonthBudget(newBudgets);
    alert(t('budgetSavedSuccess'));
  };
  
  /**
   * Memoized calculation for total income in the current month.
   */
  const totalIncome = useMemo(() => {
      return transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  /**
   * Memoized calculation for the total amount budgeted across all categories.
   */
  const totalBudgeted = useMemo(() => {
    return Object.values(localBudgets).reduce((sum, amount) => sum + amount, 0);
  }, [localBudgets]);

  /**
   * Opens the category modal in 'edit' mode.
   * @param {Category} category - The category to be edited.
   */
  const handleOpenEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  }

  /**
   * Opens the category modal in 'add' mode.
   */
  const handleOpenAddModal = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  }

  /**
   * Saves a new or edited category to the global state.
   * @param category - The category data to save.
   */
  const handleSaveCategory = (category: Omit<Category, 'id'> & { id?: string }) => {
    if (category.id) { // Editing existing
      setCategories(prev => prev.map(c => c.id === category.id ? { ...c, ...category} : c));
      alert(t('editCategorySuccess'));
    } else { // Adding new
      setCategories(prev => [...prev, { ...category, id: category.name.toLowerCase().replace(/\s+/g, '_') + Date.now() }]);
      alert(t('addCategorySuccess'));
    }
  };

  /**
   * Deletes a category and reassigns its transactions to 'Other'.
   * @param {string} categoryId - The ID of the category to delete.
   */
  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === 'other') {
      alert(t('errorDeleteOtherCategory'));
      return;
    }
    if (window.confirm(t('confirmDeleteDesc'))) {
      setTransactions(prev => prev.map(t => t.categoryId === categoryId ? { ...t, categoryId: 'other' } : t));
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      alert(t('deleteCategorySuccess'));
    }
  }


  return (
    <div className="space-y-8">
      {/* Budget Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('budgetSettings')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('budgetSettingsDesc')}</p>
        <div className="bg-surface rounded-lg shadow p-4 space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-text-secondary">{t('totalIncome')}</p>
                    <p className="font-bold text-success text-lg">{t('currencySymbol')}{totalIncome.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-text-secondary">{t('totalBudgeted')}</p>
                    <p className={`font-bold text-lg ${totalBudgeted > totalIncome ? 'text-danger' : 'text-primary'}`}>
                        {t('currencySymbol')}{totalBudgeted.toFixed(2)}
                    </p>
                </div>
            </div>
          {categories.filter(c => c.id !== 'other').map(category => (
            <div key={category.id} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
              <label htmlFor={`budget-${category.id}`} className="flex-1 font-medium">{category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name}</label>
              <div className="flex items-center">
                <span className="text-text-secondary mr-2">{t('currencySymbol')}</span>
                <input id={`budget-${category.id}`} type="number" placeholder="0.00" value={localBudgets[category.id] || ''} onChange={(e) => handleBudgetChange(category.id, e.target.value)} className="w-28 bg-input rounded-md p-2 text-right focus:ring-2 focus:ring-primary focus:outline-none"/>
              </div>
            </div>
          ))}
          <button onClick={handleSaveBudgets} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">{t('saveBudget')}</button>
        </div>
      </section>

      {/* Category Management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('manageCategories')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('manageCategoriesDesc')}</p>
        <div className="bg-surface rounded-lg shadow p-4 space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-background">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="font-medium">{category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleOpenEditModal(category)} aria-label={t('editCategory')} className="text-text-secondary hover:text-primary"><EditIcon className="w-5 h-5"/></button>
                <button onClick={() => handleDeleteCategory(category.id)} disabled={category.id === 'other'} aria-label={t('deleteCategory')} className="text-text-secondary hover:text-danger disabled:opacity-30 disabled:hover:text-text-secondary"><TrashIcon className="w-5 h-5"/></button>
              </div>
            </div>
          ))}
           <button onClick={handleOpenAddModal} className="w-full border-2 border-dashed border-border text-text-secondary font-semibold py-2 px-4 rounded-lg hover:bg-background hover:border-primary/50 hover:text-primary transition-colors">
            {t('addCategory')}
          </button>
        </div>
      </section>

       {/* Notifications */}
       <section>
        <h2 className="text-xl font-semibold mb-2">{t('notifications')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('notificationsDesc')}</p>
        <div className="bg-surface rounded-lg shadow p-4">
            <label htmlFor="notif-frequency" className="block font-medium mb-2">{t('notificationFrequency')}</label>
            <select
                id="notif-frequency"
                value={notificationFrequency}
                onChange={e => setNotificationFrequency(e.target.value)}
                className="w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="monthly">{t('freq_monthly')}</option>
                <option value="weekly">{t('freq_weekly')}</option>
                <option value="daily">{t('freq_daily')}</option>
                <option value="never">{t('freq_never')}</option>
            </select>
        </div>
      </section>

      {/* Category Modal */}
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
}