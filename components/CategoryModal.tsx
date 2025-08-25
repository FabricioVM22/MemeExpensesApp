
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'> & { id?: string }) => void;
  categoryToEdit: Category | null;
}

const COLORS = [
  '#f9a8d4', '#a78bfa', '#fde047', '#f87171', '#5eead4', '#fb923c', '#86efac', '#93c5fd',
  '#f472b6', '#c084fc', '#fbbf24', '#ef4444', '#2dd4bf', '#f97316', '#4ade80', '#60a5fa',
];

export default function CategoryModal({ isOpen, onClose, onSave, categoryToEdit }: CategoryModalProps): React.ReactNode {
  const { t } = useLocalization();
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (isOpen) {
      if (categoryToEdit) {
        setName(t(categoryToEdit.name as any)); // Use translated name for editing
        setColor(categoryToEdit.color);
      } else {
        setName('');
        setColor(COLORS[0]);
      }
    }
  }, [isOpen, categoryToEdit, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(t('errorCategoryName'));
      return;
    }
    onSave({
      id: categoryToEdit?.id,
      name: name.trim(),
      color,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-center">{categoryToEdit ? t('editCategory') : t('addCategory')}</h2>

          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('categoryName')}</label>
            <input
              type="text"
              id="category-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full bg-slate-100 dark:bg-slate-700 border-transparent rounded-md p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              placeholder={t('category_groceries')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('categoryColor')}</label>
            <div className="mt-2 grid grid-cols-8 gap-2">
              {COLORS.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-full aspect-square rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800' : ''}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-fuchsia-500 text-white font-bold hover:bg-fuchsia-600 transition-colors">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
