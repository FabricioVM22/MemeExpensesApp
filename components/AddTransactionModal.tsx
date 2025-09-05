
/**
 * @file Renders a modal for adding a new transaction (income or expense).
 * Can also be used to add an expense specifically to an event.
 */

import React, { useState, useEffect } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

/**
 * Props for the AddTransactionModal component.
 */
interface AddTransactionModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Function to call when the modal should be closed. */
  onClose: () => void;
  /** Callback function to add the new transaction to the global state. */
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  /** The list of available categories for expenses. */
  categories: Category[];
  /** Optional ID of an event to associate this transaction with. */
  eventId?: string;
}

/**
 * A modal component for adding new transactions.
 * @param {AddTransactionModalProps} props - The props for the component.
 * @returns The rendered modal component or null if not open.
 */
export default function AddTransactionModal({ isOpen, onClose, onAddTransaction, categories, eventId }: AddTransactionModalProps): React.ReactNode {
  const { t } = useLocalization();
  const isEventExpense = !!eventId;
  
  // Form state
  const [type, setType] = useState<'income' | 'expense'>(isEventExpense ? 'expense' : 'expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id || '');

  /**
   * Effect to reset the form state whenever the modal is opened.
   * If it's an event expense, it defaults the type to 'expense'.
   */
  useEffect(() => {
    if (isOpen) {
      setType(isEventExpense ? 'expense' : 'expense');
      setAmount('');
      setDescription('');
      // Set a default category that is not 'Other' if possible
      setCategoryId(categories.find(c => c.id !== 'other')?.id || categories[0]?.id || '');
    }
  }, [isOpen, categories, isEventExpense]);
  
  /**
   * Handles the form submission.
   * Validates the input and calls the onAddTransaction callback.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) {
      alert(t('errorAllFields'));
      return;
    }
    onAddTransaction({
      type,
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      categoryId: type === 'expense' ? categoryId : undefined,
      eventId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* Modal content */}
      <div className="bg-surface/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">{isEventExpense ? t('addExpenseToEvent') : t('addTransactionTitle')}</h2>
          
          {/* Type selector (Income/Expense), hidden for event-specific expenses */}
          {!isEventExpense && (
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-black/10 p-1">
              <button type="button" onClick={() => setType('expense')} className={`py-2 rounded-md transition-colors ${type === 'expense' ? 'bg-surface shadow-md text-danger font-bold' : 'text-text-secondary'}`}>{t('expense')}</button>
              <button type="button" onClick={() => setType('income')} className={`py-2 rounded-md transition-colors ${type === 'income' ? 'bg-surface shadow-md text-success font-bold' : 'text-text-secondary'}`}>{t('income')}</button>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">{t('amount')}</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-text-secondary sm:text-sm">{t('currencySymbol')}</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-7 pr-2 py-2 bg-input border-transparent rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary">{t('description')}</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={type === 'expense' ? t('placeholderExpense') : t('placeholderIncome')}
            />
          </div>

          {/* Category Selector (for expenses only) */}
          {type === 'expense' && (
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary">{t('category')}</label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name.startsWith('category_') ? t(c.name as TranslationKey) : c.name}</option>)}
              </select>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-black/10 hover:bg-black/20 transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors">{t('add')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
