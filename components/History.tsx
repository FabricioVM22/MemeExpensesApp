/**
 * @file Renders the history view.
 * This component displays past months' financial summaries in an accordion layout.
 * Users can expand each month to see detailed transactions.
 */

import React, { useMemo, useState } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { ChevronDownIcon, ChevronUpIcon, ArrowUpDownIcon, DynamicCategoryIcon } from './icons';
// FIX: Corrected import path for TransactionItem.tsx
import TransactionItem from './TransactionItem';

/**
 * Props for the History component.
 */
interface HistoryProps {
  /** The list of all main transactions (excluding event transactions). */
  transactions: Transaction[];
  /** The list of all available categories. */
  categories: Category[];
  /** Function to delete a transaction. */
  deleteTransaction: (id: string) => void;
}

/**
 * The history component, displaying transaction history grouped by month.
 * @param {HistoryProps} props - The props for the component.
 * @returns The rendered history UI.
 */
export default function History({ transactions, categories, deleteTransaction }: HistoryProps): React.ReactNode {
    const { t, locale } = useLocalization();
    // State to manage which month's details are currently expanded
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
    // State to manage the sort order of transactions within an expanded month
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    // State to manage the currently swiped item in the list
    const [activeSwipedItemId, setActiveSwipedItemId] = useState<string | null>(null);


    /**
     * Helper function to find a category by its ID.
     * @param {string | undefined} id - The ID of the category.
     * @returns The category object or undefined.
     */
    const getCategory = (id: string | undefined) => categories.find(c => c.id === id);

    /**
     * Memoized calculation to group and summarize transactions by month.
     * It excludes the current month and sorts the past months chronologically.
     */
    const historicalData = useMemo(() => {
        const currentMonthKey = new Date().toISOString().slice(0, 7);
        const dataByMonth: Record<string, { income: number, expenses: number, transactions: Transaction[] }> = {};

        // Group transactions by month (YYYY-MM)
        transactions.forEach(t => {
            const monthKey = t.date.slice(0, 7);
            if (monthKey === currentMonthKey) return; // Skip current month

            if (!dataByMonth[monthKey]) {
                dataByMonth[monthKey] = { income: 0, expenses: 0, transactions: [] };
            }

            if (t.type === 'income') {
                dataByMonth[monthKey].income += t.amount;
            } else {
                dataByMonth[monthKey].expenses += t.amount;
            }
            dataByMonth[monthKey].transactions.push(t);
        });
        
        // Sort transactions within each month
        for (const key in dataByMonth) {
            dataByMonth[key].transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        
        // Convert the grouped data object into a sorted array
        return Object.entries(dataByMonth)
            .sort((a, b) => b[0].localeCompare(a[0])) // Sort months, newest first
            .map(([key, value]) => ({ month: key, ...value }));

    }, [transactions]);

    /**
     * Formats a month key (e.g., "2023-07") into a localized, readable string (e.g., "July 2023").
     * @param {string} monthKey - The month key to format.
     * @returns The formatted month string.
     */
    const formatMonth = (monthKey: string) => {
        const [year, month] = monthKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleString(locale, { month: 'long', year: 'numeric' });
    };
    
    /**
     * Toggles the expanded month, and resets the swiped item state to ensure
     * a clean view when opening or closing an accordion item.
     * @param {string | null} monthKey - The month to expand, or null to close.
     */
    const toggleMonth = (monthKey: string | null) => {
      setExpandedMonth(monthKey);
      setActiveSwipedItemId(null); // Reset swipe state when opening/closing
    }

    if (historicalData.length === 0) {
        return (
            <>
                <div className="text-center py-6 px-4">
                    <h2 className="text-xl font-semibold mb-2">{t('historyPlaceholderTitle')}</h2>
                    <p className="text-text-secondary mb-6 max-w-md mx-auto">{t('historyPlaceholderDesc')}</p>

                    <div className="space-y-4 text-left animate-pulse-slow">
                        {/* The placeholder accordion item */}
                        <div className="bg-surface border border-border rounded-2xl shadow-lg">
                            {/* Header */}
                            <div className="w-full p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{t('lastMonthExample')}</h3>
                                    <p className="text-sm text-success">
                                        {t('totalBalance')}: {t('currencySymbol')}850.50
                                    </p>
                                </div>
                                <ChevronUpIcon className="w-6 h-6"/>
                            </div>
                            {/* Content */}
                            <div className="px-4 pb-4 space-y-3 border-t border-border">
                                <div className="flex items-center p-2 rounded-lg">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))' }}>
                                        <DynamicCategoryIcon name="trending-up" className="w-5 h-5" />
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="font-medium truncate">{t('placeholder_salary')}</p>
                                        <p className="text-sm text-text-secondary">May 1</p>
                                    </div>
                                    <div className="ml-3 font-semibold text-success">
                                        +{t('currencySymbol')}2200.00
                                    </div>
                                </div>
                                <div className="flex items-center p-2 rounded-lg">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6b728020', color: '#6b7280' }}>
                                        <DynamicCategoryIcon name="home-modern" className="w-5 h-5" />
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="font-medium truncate">{t('placeholder_rent')}</p>
                                        <p className="text-sm text-text-secondary">May 1</p>
                                    </div>
                                    <div className="ml-3 font-semibold text-danger">
                                        -{t('currencySymbol')}1345.00
                                    </div>
                                </div>
                                 <div className="flex items-center p-2 rounded-lg">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
                                        <DynamicCategoryIcon name="restaurant" className="w-5 h-5" />
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="font-medium truncate">{t('placeholder_coffee')}</p>
                                        <p className="text-sm text-text-secondary">May 3</p>
                                    </div>
                                    <div className="ml-3 font-semibold text-danger">
                                        -{t('currencySymbol')}4.50
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <style>{`
                    @keyframes pulse-slow {
                      50% {
                        opacity: .85;
                      }
                    }
                    .animate-pulse-slow {
                      animation: pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                `}</style>
            </>
        );
    }

    return (
        <div className="space-y-4">
             <h2 className="text-xl font-semibold text-center">{t('history')}</h2>
            {historicalData.map(data => {
                const balance = data.income - data.expenses;
                const isExpanded = expandedMonth === data.month;
                return (
                    <div key={data.month} className="bg-surface border border-border rounded-2xl shadow-lg">
                        {/* Accordion Header */}
                        <button 
                            className="w-full p-4 text-left flex justify-between items-center"
                            onClick={() => toggleMonth(isExpanded ? null : data.month)}
                            aria-expanded={isExpanded}
                        >
                            <div>
                                <h3 className="font-bold text-lg">{formatMonth(data.month)}</h3>
                                <p className={`text-sm ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {t('totalBalance')}: {t('currencySymbol')}{balance.toFixed(2)}
                                </p>
                            </div>
                            {isExpanded ? <ChevronUpIcon className="w-6 h-6"/> : <ChevronDownIcon className="w-6 h-6"/>}
                        </button>
                        {/* Accordion Content (Expanded View) */}
                        {isExpanded && (
                            <div className="px-4 pb-4 space-y-3 border-t border-border">
                                <div className="flex justify-between text-center pt-3">
                                    <div>
                                      <p className="text-sm text-text-secondary">{t('income')}</p>
                                      <p className="text-md font-semibold text-success">{t('currencySymbol')}{data.income.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-text-secondary">{t('expenses')}</p>
                                      <p className="text-md font-semibold text-danger">{t('currencySymbol')}{data.expenses.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-border">
                                    <h4 className="font-semibold">{t('recentTransactions')}</h4>
                                    <button
                                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                                        className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label={t('sortByDate')}
                                    >
                                        <ArrowUpDownIcon className="w-4 h-4" />
                                        <span>{sortOrder === 'desc' ? t('sortNewestFirst') : t('sortOldestFirst')}</span>
                                    </button>
                                </div>
                                {/* List of transactions for the month */}
                                <div className="space-y-3">
                                {[...data.transactions]
                                    .sort((a, b) => {
                                        const dateA = new Date(a.date).getTime();
                                        const dateB = new Date(b.date).getTime();
                                        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
                                    })
                                    .map(transaction => (
                                        <TransactionItem
                                          key={transaction.id}
                                          transaction={transaction}
                                          getCategory={getCategory}
                                          onDelete={deleteTransaction}
                                          activeSwipedItemId={activeSwipedItemId}
                                          setActiveSwipedItemId={setActiveSwipedItemId}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}