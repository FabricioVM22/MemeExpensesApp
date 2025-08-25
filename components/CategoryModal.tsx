
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'> & { id?: string }) => void;
  categoryToEdit: Category | null;
}

const COLORS = [
  '#84a98c', '#a5a58d', '#f28482', '#8d99ae', '#52b69a', '#fca311', '#f7b267', '#6d6875',
  '#bde0fe', '#ffc6ff', '#f1faee', '#e63946', '#a8dadc', '#457b9d', '#1d3557', '#e9c46a'
];

export default function CategoryModal({ isOpen, onClose, onSave, categoryToEdit }: CategoryModalProps): React.ReactNode {
  const { t } = useLocalization();
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (isOpen) {
      if (categoryToEdit) {
        const categoryName = categoryToEdit.name;
        // Display translated name for default categories, or actual name for custom ones
        setName(categoryName.startsWith('category_') ? t(categoryName as TranslationKey) : categoryName);
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
      <div className="bg-white dark:bg-[#56445d] rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-center">{categoryToEdit ? t('editCategory') : t('addCategory')}</h2>

          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-[#56445d] dark:text-[#c5e99b]">{t('categoryName')}</label>
            <input
              type="text"
              id="category-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full bg-slate-100 dark:bg-[#493a50] border-transparent rounded-md p-2 focus:ring-2 focus:ring-[#548687] focus:outline-none"
              placeholder={t('category_groceries')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#56445d] dark:text-[#c5e99b]">{t('categoryColor')}</label>
            <div className="mt-2 grid grid-cols-8 gap-2">
              {COLORS.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-full aspect-square rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-[#548687] ring-offset-2 ring-offset-white dark:ring-offset-[#56445d]' : ''}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-[#493a50] hover:bg-slate-300 dark:hover:bg-[#6b5873] transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-[#548687] text-white font-bold hover:bg-[#4a7879] transition-colors">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}