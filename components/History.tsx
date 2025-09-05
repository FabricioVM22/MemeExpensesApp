
/**
 * @file Renders the history view.
 * This component displays past months' financial summaries in an accordion layout.
 * Users can expand each month to see detailed transactions.
 */

import React, { useMemo, useState } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { ChevronDownIcon, ChevronUpIcon, ArrowUpDownIcon } from './icons';
import { PALETTE } from '../theme';

/**
 * Props for the History component.
 */
interface HistoryProps {
  /** The list of all main transactions (excluding event transactions). */
  transactions: Transaction[];
  /** The list of all available categories. */
  categories: Category[];
}

/**
 * A circular icon representing a transaction category.
 * @param {object} props - The component props.
 * @param {string} props.color - The background color of the icon.
 * @param {string} props.categoryName - The name of the category.
 * @returns A category icon component.
 */
const CategoryIcon = ({ color, categoryName }: { color: string; categoryName: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
        {categoryName.charAt(0)}
    </div>
);

/**
 * The history component, displaying transaction history grouped by month.
 * @param {HistoryProps} props - The props for the component.
 * @returns The rendered history UI.
 */
export default function History({ transactions, categories }: HistoryProps): React.ReactNode {
    const { t, locale } = useLocalization();
    // State to manage which month's details are currently expanded
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
    // State to manage the sort order of transactions within an expanded month
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

    if (historicalData.length === 0) {
        return (
            <div className="text-center py-10 px-4">
                <h2 className="text-xl font-semibold mb-2">{t('history')}</h2>
                <p className="text-text-secondary">
                    {t('noHistory')}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
             <h2 className="text-xl font-semibold text-center">{t('history')}</h2>
            {historicalData.map(data => {
                const balance = data.income - data.expenses;
                const isExpanded = expandedMonth === data.month;
                return (
                    <div key={data.month} className="bg-surface/50 backdrop-blur-lg border border-border rounded-2xl shadow-lg">
                        {/* Accordion Header */}
                        <button 
                            className="w-full p-4 text-left flex justify-between items-center"
                            onClick={() => setExpandedMonth(isExpanded ? null : data.month)}
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
                                {[...data.transactions]
                                    .sort((a, b) => {
                                        const dateA = new Date(a.date).getTime();
                                        const dateB = new Date(b.date).getTime();
                                        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
                                    })
                                    .map(transaction => {
                                    const category = transaction.categoryId ? getCategory(transaction.categoryId) : undefined;
                                    let displayName: string;
                                    let displayColor: string;

                                    if (transaction.type === 'income') {
                                        displayName = t('income');
                                        displayColor = PALETTE.green; 
                                    } else {
                                        displayName = category ? (category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name) : t('category_other');
                                        displayColor = category ? category.color : '#a8a29e';
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
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
