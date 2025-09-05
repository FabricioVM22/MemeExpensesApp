
/**
 * @file Renders the main dashboard view of the application.
 * This component displays the current balance, income/expense summary,
 * budget setup prompts, and a list of recent transactions.
 */

import React, { useMemo } from 'react';
import { Transaction, Budget, Category, View } from '../types';
import { ChartIcon, CogIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { PALETTE } from '../theme';

/**
 * Props for the Dashboard component.
 */
interface DashboardProps {
  /** The list of transactions for the current month. */
  transactions: Transaction[];
  /** The budget settings for the current month. */
  budget: Budget[];
  /** The list of all available categories. */
  categories: Category[];
  /** Function to change the active view. */
  setActiveView: (view: View) => void;
}

/**
 * A circular icon representing a transaction category.
 * @param {object} props - The component props.
 * @param {string} props.color - The background color of the icon.
 * @param {string} props.categoryName - The name of the category to display the first letter of.
 * @returns A category icon component.
 */
const CategoryIcon = ({ color, categoryName }: { color: string; categoryName: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
        {categoryName.charAt(0)}
    </div>
);

/**
 * The main dashboard component.
 * @param {DashboardProps} props - The props for the component.
 * @returns The rendered dashboard UI.
 */
export default function Dashboard({ transactions, budget, categories, setActiveView }: DashboardProps): React.ReactNode {
  const { t } = useLocalization();

  /**
   * Memoized calculation of total income, expenses, and current balance for the month.
   */
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);

  /**
   * Memoized calculation to get the 5 most recent transactions.
   */
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
    
  /**
   * Helper function to find a category by its ID.
   * @param {string | undefined} id - The ID of the category to find.
   * @returns The category object or undefined if not found.
   */
  const getCategory = (id: string | undefined) => categories.find(c => c.id === id);

  return (
    <div className="space-y-6">
      {/* Balance and Summary Section */}
      <section>
        <div className="bg-surface/50 backdrop-blur-lg border border-border rounded-2xl shadow-lg p-4 space-y-4">
          <div className="text-center">
            <p className="text-sm text-text-secondary">{t('currentBalance')}</p>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
              {t('currencySymbol')}{balance.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-center">
            <div>
              <p className="text-sm text-text-secondary">{t('income')}</p>
              <p className="text-lg font-semibold text-success">{t('currencySymbol')}{totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">{t('expenses')}</p>
              <p className="text-lg font-semibold text-danger">{t('currencySymbol')}{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt to set a budget if none exists */}
      {budget.length === 0 && (
        <section>
            <div className="bg-primary/10 backdrop-blur-lg border-l-4 border-primary text-text-primary p-4 rounded-2xl" role="alert">
                <div className="flex items-center">
                    <CogIcon className="w-6 h-6 mr-3"/>
                    <div>
                        <p className="font-bold">{t('planYourMonth')}</p>
                        <p className="text-sm">{t('budgetNotSet')}</p>
                    </div>
                </div>
                <button onClick={() => setActiveView(View.Settings)} className="mt-3 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
                    {t('setBudget')}
                </button>
            </div>
        </section>
      )}

      {/* Recent Transactions Section */}
      <section>
        <h2 className="text-lg font-semibold mb-2 text-text-primary">{t('recentTransactions')}</h2>
        <div className="bg-surface/50 backdrop-blur-lg border border-border rounded-2xl shadow-lg p-4 space-y-3">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => {
              const category = transaction.categoryId ? getCategory(transaction.categoryId) : undefined;
              let displayName: string;
              let displayColor: string;

              if (transaction.type === 'income') {
                  displayName = t('income');
                  displayColor = PALETTE.green; 
              } else {
                  displayName = category ? (category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name) : t('category_other');
                  displayColor = category ? category.color : '#a8a29e'; // Stone from constants
              }

              return (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CategoryIcon color={displayColor} categoryName={displayName}/>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <p className="text-sm text-text-secondary">{displayName}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{t('currencySymbol')}{transaction.amount.toFixed(2)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-text-secondary py-4">{t('noTransactions')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
