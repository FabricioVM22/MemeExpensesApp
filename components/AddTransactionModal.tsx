
import React, { useState, useEffect } from 'react';
import { Transaction, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  categories: Category[];
}

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction, categories }: AddTransactionModalProps): React.ReactNode {
  const { t } = useLocalization();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id || '');

  useEffect(() => {
    if (isOpen) {
      setType('expense');
      setAmount('');
      setDescription('');
      setCategoryId(categories.find(c => c.id !== 'other')?.id || categories[0]?.id || '');
    }
  }, [isOpen, categories]);
  
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
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#56445d] rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">{t('addTransactionTitle')}</h2>
          
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-200 dark:bg-[#3a2e40] p-1">
            <button type="button" onClick={() => setType('expense')} className={`py-2 rounded-md transition-colors ${type === 'expense' ? 'bg-white dark:bg-[#56445d] shadow text-red-500 font-bold' : 'text-slate-600 dark:text-[#8fbc94]'}`}>{t('expense')}</button>
            <button type="button" onClick={() => setType('income')} className={`py-2 rounded-md transition-colors ${type === 'income' ? 'bg-white dark:bg-[#56445d] shadow text-[#6da34d] font-bold' : 'text-slate-600 dark:text-[#8fbc94]'}`}>{t('income')}</button>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-[#56445d] dark:text-[#c5e99b]">{t('amount')}</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-slate-500 dark:text-[#8fbc94] sm:text-sm">{t('currencySymbol')}</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-7 pr-2 py-2 bg-slate-100 dark:bg-[#493a50] border-transparent rounded-md focus:ring-2 focus:ring-[#548687] focus:outline-none"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#56445d] dark:text-[#c5e99b]">{t('description')}</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 w-full bg-slate-100 dark:bg-[#493a50] border-transparent rounded-md p-2 focus:ring-2 focus:ring-[#548687] focus:outline-none"
              placeholder={type === 'expense' ? t('placeholderExpense') : t('placeholderIncome')}
            />
          </div>

          {type === 'expense' && (
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#56445d] dark:text-[#c5e99b]">{t('category')}</label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="mt-1 w-full bg-slate-100 dark:bg-[#493a50] border-transparent rounded-md p-2 focus:ring-2 focus:ring-[#548687] focus:outline-none"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name.startsWith('category_') ? t(c.name as TranslationKey) : c.name}</option>)}
              </select>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-[#493a50] hover:bg-slate-300 dark:hover:bg-[#6b5873] transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-[#548687] text-white font-bold hover:bg-[#4a7879] transition-colors">{t('add')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}