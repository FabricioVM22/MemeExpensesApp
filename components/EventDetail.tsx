
import React from 'react';
import { Event, Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { ArrowLeftIcon, PlusIcon, EditIcon, TrashIcon } from './icons';
import { PALETTE } from '../theme';

interface EventDetailProps {
  event: Event;
  transactions: Transaction[];
  categories: Category[];
  onBack: () => void;
  onAddExpense: () => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const CategoryIcon = ({ color, categoryName }: { color: string; categoryName: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
        {categoryName.charAt(0)}
    </div>
);

export default function EventDetail({ event, transactions, categories, onBack, onAddExpense, onEdit, onDelete }: EventDetailProps): React.ReactNode {
    const { t } = useLocalization();

    const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const remaining = event.budget - spent;
    const percentage = event.budget > 0 ? Math.min((spent / event.budget) * 100, 100) : 0;
    const isOverBudget = spent > event.budget;

    const getCategory = (id: string | undefined) => categories.find(c => c.id === id);

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 min-w-0">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-surface flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary" aria-label={t('backToEvents')}>
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gradient truncate">{event.name}</h1>
                </div>
                <button onClick={() => onEdit(event)} className="p-2 rounded-full hover:bg-surface flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary" aria-label={t('editEvent')}>
                    <EditIcon className="w-6 h-6"/>
                </button>
            </header>

            <section className="bg-surface rounded-lg shadow p-4 space-y-4">
                <h2 className="text-lg font-semibold text-center text-text-primary">{t('eventBudgetDetails')}</h2>
                <div
                  className="w-full bg-input rounded-full h-5 relative overflow-hidden"
                  role="progressbar"
                  aria-valuenow={spent}
                  aria-valuemin={0}
                  aria-valuemax={event.budget}
                >
                    <div 
                        className="h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" 
                        style={{ 
                            width: `${percentage}%`, 
                            backgroundColor: isOverBudget ? 'hsl(var(--danger))' : 'hsl(var(--primary))'
                        }}
                    >
                       {percentage.toFixed(0)}%
                    </div>
                </div>
                <div className="flex justify-between text-center">
                    <div>
                        <p className="text-sm text-text-secondary">{t('totalSpent')}</p>
                        <p className="text-lg font-semibold text-danger">{t('currencySymbol')}{spent.toFixed(2)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-text-secondary">{t('budget')}</p>
                        <p className="text-lg font-semibold text-text-primary">{t('currencySymbol')}{event.budget.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">{t('remaining')}</p>
                        <p className={`text-lg font-semibold ${remaining >= 0 ? 'text-success' : 'text-danger'}`}>{t('currencySymbol')}{remaining.toFixed(2)}</p>
                    </div>
                </div>
            </section>
            
            <section>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-text-primary">{t('eventTransactions')}</h2>
                    <button
                        onClick={onAddExpense}
                        className="flex items-center text-sm bg-primary hover:bg-primary-hover text-white font-bold py-2 px-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        {t('expense')}
                    </button>
                </div>
                 <div className="bg-surface rounded-lg shadow p-4 space-y-3">
                    {sortedTransactions.length > 0 ? (
                        sortedTransactions.map(transaction => {
                            const category = getCategory(transaction.categoryId);
                            const displayName = category ? (category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name) : t('category_other');
                            const displayColor = category ? category.color : '#a8a29e';

                            return (
                                <div key={transaction.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <CategoryIcon color={displayColor} categoryName={displayName}/>
                                        <div>
                                            <p className="font-semibold">{transaction.description}</p>
                                            <p className="text-sm text-text-secondary">{displayName}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-danger">
                                        -{t('currencySymbol')}{transaction.amount.toFixed(2)}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-text-secondary py-4">{t('noEventTransactions')}</p>
                    )}
                </div>
            </section>

            <section className="pt-4">
                 <button
                    onClick={() => onDelete(event.id)}
                    className="w-full flex items-center justify-center space-x-2 text-danger hover:bg-danger/10 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                    <TrashIcon className="w-5 h-5"/>
                    <span>{t('deleteEvent')}</span>
                </button>
            </section>
        </div>
    );
}