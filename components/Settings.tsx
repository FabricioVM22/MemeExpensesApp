
import React, { useState, useEffect, useMemo } from 'react';
import { Budget, Category, Transaction } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CategoryModal from './CategoryModal';
import { EditIcon, TrashIcon } from './icons';

interface SettingsProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  budget: Budget[];
  setMonthBudget: (newBudgets: Budget[]) => void;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function Settings({ categories, setCategories, budget, setMonthBudget, transactions, setTransactions }: SettingsProps): React.ReactNode {
  const { t } = useLocalization();
  const [localBudgets, setLocalBudgets] = useState<Record<string, number>>({});
  const [notificationFrequency, setNotificationFrequency] = useLocalStorage('notificationFrequency', 'monthly');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  useEffect(() => {
    const budgetMap = budget.reduce((acc, b) => {
      acc[b.categoryId] = b.amount;
      return acc;
    }, {} as Record<string, number>);
    setLocalBudgets(budgetMap);
  }, [budget]);

  const handleBudgetChange = (categoryId: string, amount: string) => {
    const newAmount = parseFloat(amount) || 0;
    setLocalBudgets(prev => ({ ...prev, [categoryId]: newAmount }));
  };

  const handleSaveBudgets = () => {
    const newBudgets: Budget[] = Object.entries(localBudgets)
        .map(([categoryId, amount]) => ({ categoryId, amount }))
        .filter(b => b.amount > 0);
    setMonthBudget(newBudgets);
    alert(t('budgetSavedSuccess'));
  };
  
  const totalIncome = useMemo(() => {
      return transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalBudgeted = useMemo(() => {
    return Object.values(localBudgets).reduce((sum, amount) => sum + amount, 0);
  }, [localBudgets]);

  const handleOpenEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  }

  const handleOpenAddModal = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  }

  const handleSaveCategory = (category: Omit<Category, 'id'> & { id?: string }) => {
    if (category.id) { // Editing existing
      setCategories(prev => prev.map(c => c.id === category.id ? { ...c, ...category} : c));
      alert(t('editCategorySuccess'));
    } else { // Adding new
      setCategories(prev => [...prev, { ...category, id: category.name.toLowerCase().replace(/\s+/g, '_') + Date.now() }]);
      alert(t('addCategorySuccess'));
    }
  };

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
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('budgetSettingsDesc')}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 space-y-4">
            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('totalIncome')}</p>
                    <p className="font-bold text-teal-500 text-lg">${totalIncome.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('totalBudgeted')}</p>
                    <p className={`font-bold text-lg ${totalBudgeted > totalIncome ? 'text-rose-500' : 'text-fuchsia-500'}`}>
                        ${totalBudgeted.toFixed(2)}
                    </p>
                </div>
            </div>
          {categories.filter(c => c.id !== 'other').map(category => (
            <div key={category.id} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
              <label htmlFor={`budget-${category.id}`} className="flex-1 font-medium">{t(category.name as TranslationKey)}</label>
              <div className="flex items-center">
                <span className="text-slate-500 dark:text-slate-400 mr-2">$</span>
                <input id={`budget-${category.id}`} type="number" placeholder="0.00" value={localBudgets[category.id] || ''} onChange={(e) => handleBudgetChange(category.id, e.target.value)} className="w-28 bg-slate-100 dark:bg-slate-700 rounded-md p-2 text-right focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"/>
              </div>
            </div>
          ))}
          <button onClick={handleSaveBudgets} className="w-full bg-fuchsia-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-fuchsia-600 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">{t('saveBudget')}</button>
        </div>
      </section>

      {/* Category Management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">{t('manageCategories')}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('manageCategoriesDesc')}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="font-medium">{t(category.name as TranslationKey)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleOpenEditModal(category)} aria-label={t('editCategory')} className="text-slate-500 hover:text-fuchsia-500"><EditIcon className="w-5 h-5"/></button>
                <button onClick={() => handleDeleteCategory(category.id)} disabled={category.id === 'other'} aria-label={t('deleteCategory')} className="text-slate-500 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-500"><TrashIcon className="w-5 h-5"/></button>
              </div>
            </div>
          ))}
           <button onClick={handleOpenAddModal} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-fuchsia-400 dark:hover:border-fuchsia-600 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors">
            {t('addCategory')}
          </button>
        </div>
      </section>

       {/* Notifications */}
       <section>
        <h2 className="text-xl font-semibold mb-2">{t('notifications')}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('notificationsDesc')}</p>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <label htmlFor="notif-frequency" className="block font-medium mb-2">{t('notificationFrequency')}</label>
            <select
                id="notif-frequency"
                value={notificationFrequency}
                onChange={e => setNotificationFrequency(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-700 border-transparent rounded-md p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              >
                <option value="monthly">{t('freq_monthly')}</option>
                <option value="weekly">{t('freq_weekly')}</option>
                <option value="daily">{t('freq_daily')}</option>
                <option value="never">{t('freq_never')}</option>
            </select>
        </div>
      </section>

      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
}