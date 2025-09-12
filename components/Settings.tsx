/**
 * @file Renders the settings view for the application. This component is a central hub
 * for managing monthly budgets, categories, data backup (import/export), and application
 * preferences like language and notifications.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Budget, Category, Transaction, Event } from '../types';
import { useLocalization } from '../context/LocalizationContext';
// FIX: Corrected import path for locales/en.ts
import { TranslationKey } from '../locales/en';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CategoryModal from './CategoryModal';
import Dropdown from './Dropdown';
import { EditIcon, TrashIcon, DownloadIcon, UploadIcon, DynamicCategoryIcon } from './icons';
import { ICON_LIST } from './icons';

/**
 * Props for the Settings component.
 */
interface SettingsProps {
  /** The current list of all user-defined and default categories. */
  categories: Category[];
  /** Function to update the global list of categories. */
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  /** The budget settings for the currently active month. */
  budget: Budget[];
  /** Function to update the budget for the current month. */
  setMonthBudget: (newBudgets: Budget[]) => void;
  /** The list of all transactions (excluding event-specific ones). */
  transactions: Transaction[];
  /** Function to update the global list of transactions. */
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  /** The list of all created events. */
  events: Event[];
  /** Function to update the global list of events. */
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  /** A record of all historical and current monthly budgets. */
  budgets: Record<string, Budget[]>;
  /** Function to update the global budget record. */
  setBudgets: React.Dispatch<React.SetStateAction<Record<string, Budget[]>>>;
}

/**
 * The settings component, allowing users to configure various aspects of the application.
 * @param {SettingsProps} props - The props for the component.
 * @returns {React.ReactNode} The rendered settings UI.
 */
export default function Settings({ 
  categories, setCategories, budget, setMonthBudget, transactions, setTransactions, 
  events, setEvents, budgets, setBudgets 
}: SettingsProps): React.ReactNode {
  const { t, locale, setLocale } = useLocalization();
  // Local state to manage budget input fields before saving to global state
  const [localBudgets, setLocalBudgets] = useState<Record<string, number>>({});
  const [notificationFrequency, setNotificationFrequency] = useLocalStorage('notificationFrequency', 'monthly');

  // State for the category management modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  
  // Ref for the hidden file input used for data import
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Effect to synchronize the local budget state with the global budget prop.
   * This runs when the component mounts or when the global budget for the
   * current month changes, ensuring the form is always up-to-date.
   */
  useEffect(() => {
    const budgetMap = budget.reduce((acc, b) => {
      acc[b.categoryId] = b.amount;
      return acc;
    }, {} as Record<string, number>);
    setLocalBudgets(budgetMap);
  }, [budget]);

  /**
   * Handles changes to a single budget input field, updating the local state.
   * @param {string} categoryId - The ID of the category being updated.
   * @param {string} amount - The new budget amount from the input field as a string.
   */
  const handleBudgetChange = (categoryId: string, amount: string) => {
    const newAmount = parseFloat(amount) || 0;
    setLocalBudgets(prev => ({ ...prev, [categoryId]: newAmount }));
  };

  /**
   * Saves the locally edited budgets to the global state for the current month.
   */
  const handleSaveBudgets = () => {
    const newBudgets: Budget[] = Object.entries(localBudgets)
        .map(([categoryId, amount]) => ({ categoryId, amount }))
        .filter(b => b.amount > 0); // Only save budgets with a positive amount
    setMonthBudget(newBudgets);
    alert(t('budgetSavedSuccess'));
  };
  
  /**
   * Memoized calculation for the total income for the current month's transactions.
   */
  const totalIncome = useMemo(() => {
      const currentMonthKey = new Date().toISOString().slice(0, 7);
      return transactions
          .filter(t => t.type === 'income' && t.date.startsWith(currentMonthKey))
          .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  /**
   * Memoized calculation for the total amount budgeted across all categories in local state.
   */
  const totalBudgeted = useMemo(() => {
    return Object.values(localBudgets).reduce((sum, amount) => sum + amount, 0);
  }, [localBudgets]);

  /**
   * Opens the category modal in 'edit' mode, populating it with the selected category's data.
   * @param {Category} category - The category to be edited.
   */
  const handleOpenEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  }

  /**
   * Opens the category modal in 'add' mode with a clean slate.
   */
  const handleOpenAddModal = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  }

  /**
   * Saves a new or edited category to the global state.
   * Handles both creation and update logic.
   * @param {Omit<Category, 'id'> & { id?: string }} category - The category data from the modal.
   */
  const handleSaveCategory = (category: Omit<Category, 'id'> & { id?: string }) => {
    if (category.id) { // Editing an existing category
      setCategories(prev => prev.map(c => c.id === category.id ? { ...c, ...category} : c));
      alert(t('editCategorySuccess'));
    } else { // Adding a new category
      const usedIcons = new Set(categories.map(c => c.icon));
      const availableIcons = ICON_LIST.filter(icon => !usedIcons.has(icon) && !['trending-up', 'plus', 'gift'].includes(icon));
      const newIcon = availableIcons.length > 0 ? availableIcons[0] : 'tag'; // Default to 'tag' if all are used

      const newCategory: Category = {
          id: category.name.toLowerCase().replace(/\s+/g, '_') + Date.now(),
          name: category.name,
          color: category.color,
          icon: newIcon,
      };
      setCategories(prev => [...prev, newCategory]);
      alert(t('addCategorySuccess'));
    }
  };

  /**
   * Deletes a category after user confirmation.
   * All associated transactions are reassigned to the 'Other' category to prevent data loss.
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

  /**
   * Gathers all user data (transactions, categories, budgets, events) into a single
   * object, stringifies it, and triggers a download of the resulting JSON file as a backup.
   */
  const handleExportData = () => {
    const backupData = {
      transactions: transactions,
      categories: categories,
      budgets: budgets,
      events: events,
    };
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.download = `meme-budget-backup-${date}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Handles the file selection for data import. It reads the selected JSON file,
   * validates its structure, confirms with the user, and then updates the entire
   * application state with the imported data.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File could not be read");
        
        const data = JSON.parse(text);

        // Basic validation to ensure the file is a valid backup
        if (!data.transactions || !data.categories || !data.budgets || !data.events) {
          throw new Error("Invalid file structure");
        }
        
        if (window.confirm(t('importConfirm'))) {
          setTransactions(data.transactions);
          setCategories(data.categories);
          setBudgets(data.budgets);
          setEvents(data.events);
          alert(t('importSuccess'));
        }
      } catch (error) {
        console.error("Import failed:", error);
        alert(t('importErrorInvalidFile'));
      } finally {
        // Reset file input to allow importing the same file again if needed
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  // Options for the notification frequency dropdown
  const notificationOptions = [
    { value: 'monthly', label: t('freq_monthly') },
    { value: 'weekly', label: t('freq_weekly') },
    { value: 'daily', label: t('freq_daily') },
    { value: 'never', label: t('freq_never') },
  ];

  // Options for the language selection dropdown
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
  ];

  return (
    <div className="space-y-8">
      {/* Monthly Budget Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('budgetSettings')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('budgetSettingsDesc')}</p>
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-4">
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                  <DynamicCategoryIcon name={category.icon} className="w-5 h-5" />
              </div>
              <label htmlFor={`budget-${category.id}`} className="flex-1 font-medium truncate">{category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name}</label>
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
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-input">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    <DynamicCategoryIcon name={category.icon} className="w-5 h-5" />
                </div>
                <span className="font-medium">{category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleOpenEditModal(category)} aria-label={t('editCategory')} className="text-text-secondary hover:text-primary"><EditIcon className="w-5 h-5"/></button>
                <button onClick={() => handleDeleteCategory(category.id)} disabled={category.id === 'other'} aria-label={t('deleteCategory')} className="text-text-secondary hover:text-danger disabled:opacity-30 disabled:hover:text-text-secondary"><TrashIcon className="w-5 h-5"/></button>
              </div>
            </div>
          ))}
           <button onClick={handleOpenAddModal} className="w-full border-2 border-dashed border-border text-text-secondary font-semibold py-2 px-4 rounded-lg hover:bg-input hover:border-primary/50 hover:text-primary transition-colors">
            {t('addCategory')}
          </button>
        </div>
      </section>

       {/* Data Management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('dataManagement')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('dataManagementDesc')}</p>
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-3">
          <button onClick={handleExportData} className="w-full flex items-center justify-center space-x-2 bg-input text-text-primary font-semibold py-3 px-4 rounded-lg hover:bg-border transition-colors">
            <DownloadIcon className="w-5 h-5"/>
            <span>{t('exportData')}</span>
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center space-x-2 bg-input text-text-primary font-semibold py-3 px-4 rounded-lg hover:bg-border transition-colors">
            <UploadIcon className="w-5 h-5"/>
            <span>{t('importData')}</span>
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/json" className="hidden"/>
        </div>
      </section>

       {/* Notifications */}
       <section>
        <h2 className="text-xl font-semibold mb-2">{t('notifications')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('notificationsDesc')}</p>
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4">
            <label id="notif-frequency-label" className="block font-medium mb-2">{t('notificationFrequency')}</label>
            <Dropdown
              labelId="notif-frequency-label"
              options={notificationOptions}
              selectedValue={notificationFrequency}
              onSelect={setNotificationFrequency}
            />
        </div>
      </section>

      {/* Language */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('language')}</h2>
        <p className="text-sm text-text-secondary mb-4">{t('languageDesc')}</p>
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4">
            <label id="language-label" className="block font-medium mb-2">{t('selectLanguage')}</label>
            <Dropdown
              labelId="language-label"
              options={languageOptions}
              selectedValue={locale}
              onSelect={(value) => setLocale(value as 'en' | 'es')}
            />
        </div>
      </section>

      {/* Category Modal */}
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        categoryToEdit={categoryToEdit}
      />

      {/* Love message */}
      <div className="text-center text-text-secondary text-sm pt-4 animate-pulse">
        {t('loveMessage')}
      </div>
    </div>
  );
}