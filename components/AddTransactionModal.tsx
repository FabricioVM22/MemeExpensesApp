/**
 * @file Renders a modal for adding a new transaction (income or expense).
 */

import React, { useState, useEffect } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  categories: Category[];
  eventId?: string;
}

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction, categories, eventId }: AddTransactionModalProps): React.ReactNode {
  const { t } = useLocalization();

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setType(eventId ? 'expense' : 'expense');
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().slice(0, 10));
      setCategoryId('');
    }
  }, [isOpen, eventId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert(t('errorAmount'));
      return;
    }
    if (!description.trim()) {
      alert(t('errorDescription'));
      return;
    }
    if (type === 'expense' && !categoryId) {
      alert(t('errorCategory'));
      return;
    }

    const newTransaction: Omit<Transaction, 'id'> = {
      type,
      amount: parsedAmount,
      description: description.trim(),
      date,
      categoryId: type === 'expense' ? categoryId : undefined,
      eventId: eventId,
    };

    onAddTransaction(newTransaction);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface border border-border rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">{t('newTransaction')}</h2>

          {/* Type Selector */}
          {!eventId && ( // Don't show type selector for events, they are always expenses
            <div>
              <label className="block text-sm font-medium text-text-secondary">{t('type')}</label>
              <div className="mt-1 grid grid-cols-2 gap-2 rounded-lg bg-input p-1">
                <button type="button" onClick={() => setType('expense')} className={`py-2 rounded-md text-sm font-semibold transition-colors ${type === 'expense' ? 'bg-primary text-white' : 'hover:bg-border/50'}`}>
                  {t('expense')}
                </button>
                <button type="button" onClick={() => setType('income')} className={`py-2 rounded-md text-sm font-semibold transition-colors ${type === 'income' ? 'bg-primary text-white' : 'hover:bg-border/50'}`}>
                  {t('income')}
                </button>
              </div>
            </div>
          )}

          {/* Amount */}
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

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary">{t('description')}</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g., Coffee"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-secondary">{t('date')}</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Category */}
          {type === 'expense' && (
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary">{t('category')}</label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="" disabled>{t('selectCategory')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name.startsWith('category_') ? t(cat.name as TranslationKey) : cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-input hover:bg-border transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}