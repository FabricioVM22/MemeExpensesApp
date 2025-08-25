
import React, { useMemo, useState } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { ChevronDownIcon, ChevronUpIcon } from './icons';
import { PALETTE } from '../theme';

interface HistoryProps {
  transactions: Transaction[];
  categories: Category[];
}

const CategoryIcon = ({ color, categoryName }: { color: string; categoryName: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
        {categoryName.charAt(0)}
    </div>
);

export default function History({ transactions, categories }: HistoryProps): React.ReactNode {
    const { t, locale } = useLocalization();
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    const getCategory = (id: string | undefined) => categories.find(c => c.id === id);

    const historicalData = useMemo(() => {
        const currentMonthKey = new Date().toISOString().slice(0, 7);
        const dataByMonth: Record<string, { income: number, expenses: number, transactions: Transaction[] }> = {};

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
        
        for (const key in dataByMonth) {
            dataByMonth[key].transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        
        return Object.entries(dataByMonth)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([key, value]) => ({ month: key, ...value }));

    }, [transactions]);

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
                    <div key={data.month} className="bg-surface rounded-lg shadow">
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
                                <h4 className="font-semibold pt-2 border-t border-border">{t('recentTransactions')}</h4>
                                {data.transactions.map(transaction => {
                                    const category = transaction.categoryId ? getCategory(transaction.categoryId) : undefined;
                                    let displayName: string;
                                    let displayColor: string;

                                    if (transaction.type === 'income') {
                                        displayName = t('income');
                                        displayColor = PALETTE.mint; 
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