
/**
 * @file Renders the analytics view.
 * This component visualizes spending for each category against its budget
 * using progress bars, helping users understand their spending habits.
 */

import React, { useMemo } from 'react';
import { Transaction, Budget, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
// FIX: Corrected import path for locales/en.ts
import { TranslationKey } from '../locales/en';

/**
 * Props for the Analytics component.
 */
interface AnalyticsProps {
  /** The list of transactions for the current month. */
  transactions: Transaction[];
  /** The budget settings for the current month. */
  budget: Budget[];
  /** The list of all available categories. */
  categories: Category[];
}

/**
 * The analytics component, displaying spending vs. budget data.
 * @param {AnalyticsProps} props - The props for the component.
 * @returns The rendered analytics UI.
 */
export default function Analytics({ transactions, budget, categories }: AnalyticsProps): React.ReactNode {
  const { t } = useLocalization();

  /**
   * Memoized calculation to filter only expense transactions.
   */
  const expenses = useMemo(() => transactions.filter(t => t.type === 'expense'), [transactions]);

  /**
   * Memoized calculation to process and aggregate spending data per category.
   * It combines data from categories, budgets, and expenses, sorts them by
   * spending percentage (over-budget items first), and prepares it for rendering.
   */
  const spendingData = useMemo(() => {
    return categories.map(category => {
      const categoryBudget = budget.find(b => b.categoryId === category.id)?.amount || 0;
      const categorySpent = expenses
        .filter(e => e.categoryId === category.id)
        .reduce((sum, e) => sum + e.amount, 0);

      return {
        name: category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name,
        spent: categorySpent,
        budget: categoryBudget,
        color: category.color,
      };
    }).filter(d => d.budget > 0 || d.spent > 0) // Only show categories with activity
    .sort((a, b) => { // Sort by percentage of budget spent
        const percentA = a.budget > 0 ? a.spent / a.budget : (a.spent > 0 ? Infinity : 0);
        const percentB = b.budget > 0 ? b.spent / b.budget : (b.spent > 0 ? Infinity : 0);
        return percentB - percentA;
    });
  }, [categories, budget, expenses, t]);

  // Render a message if there's no data to display.
  if (spendingData.length === 0) {
    return (
        <div className="text-center py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">{t('spendingAnalytics')}</h2>
            <p className="text-text-secondary">
                {t('noSpendingData')}
            </p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">{t('spendingVsBudget')}</h2>
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 sm:p-6 space-y-6">
          {spendingData.map((data) => {
            const isOverBudget = data.budget > 0 && data.spent > data.budget;
            const percentage = data.budget > 0 ? Math.min((data.spent / data.budget) * 100, 100) : (data.spent > 0 ? 100 : 0);
            
            return (
              <div key={data.name}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-text-primary">{data.name}</span>
                  <span className="text-sm text-text-secondary whitespace-nowrap">
                    {t('currencySymbol')}{data.spent.toFixed(2)} / {t('currencySymbol')}{data.budget.toFixed(2)}
                  </span>
                </div>
                {/* Progress bar for visual representation */}
                <div
                  className="w-full bg-input rounded-full h-4 relative overflow-hidden"
                  role="progressbar"
                  aria-valuenow={data.spent}
                  aria-valuemin={0}
                  aria-valuemax={data.budget > 0 ? data.budget : data.spent}
                  aria-label={`${data.name} spending`}
                  aria-valuetext={`${t('currencySymbol')}${data.spent.toFixed(2)} / ${t('currencySymbol')}${data.budget.toFixed(2)}`}
                >
                  <div 
                    className="h-4 rounded-full transition-all duration-500" 
                    style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: isOverBudget ? 'hsl(var(--danger))' : data.color
                    }}
                  ></div>
                </div>
                {/* Warning message if over budget */}
                {isOverBudget && (
                  <p className="text-right text-xs text-danger mt-1">
                    {t('overBudgetWarning', {amount: `${t('currencySymbol')}${(data.spent - data.budget).toFixed(2)}`})}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}