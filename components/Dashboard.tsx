/**
 * @file Renders the main dashboard view of the application.
 * This component displays the current balance, income/expense summary,
 * budget setup prompts, and a list of recent transactions.
 */

import React, { useMemo, useState } from 'react';
import { Transaction, Budget, Category, View } from '../types';
import { ChartIcon, CogIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';
// FIX: Corrected import path for TransactionItem.tsx
import TransactionItem from './TransactionItem';

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
  /** Function to delete a transaction. */
  deleteTransaction: (id: string) => void;
}

/**
 * The main dashboard component.
 * @param {DashboardProps} props - The props for the component.
 * @returns The rendered dashboard UI.
 */
export default function Dashboard({ transactions, budget, categories, setActiveView, deleteTransaction }: DashboardProps): React.ReactNode {
  const { t } = useLocalization();
  const [activeSwipedItemId, setActiveSwipedItemId] = useState<string | null>(null);

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
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-4">
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
            <div className="bg-surface border-l-4 border-primary text-text-primary p-4 rounded-2xl" role="alert">
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
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-3">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                getCategory={getCategory}
                onDelete={deleteTransaction}
                activeSwipedItemId={activeSwipedItemId}
                setActiveSwipedItemId={setActiveSwipedItemId}
              />
            ))
          ) : (
            <p className="text-center text-text-secondary py-4">{t('noTransactions')}</p>
          )}
        </div>
      </section>
    </div>
  );
}