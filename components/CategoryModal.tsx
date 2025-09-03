/**
 * @file Renders a modal for adding or editing a spending category.
 * It allows users to set a category name and choose a color.
 */

import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

/**
 * Props for the CategoryModal component.
 */
interface CategoryModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Function to call when the modal should be closed. */
  onClose: () => void;
  /** Callback function to save the new or updated category. */
  onSave: (category: Omit<Category, 'id'> & { id?: string }) => void;
  /** The category to edit. If null, the modal is in 'add' mode. */
  categoryToEdit: Category | null;
}

/** A predefined palette of colors for categories. */
const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', 
  '#f43f5e', '#d97706', '#65a30d', '#059669', '#0ea5e9', '#6366f1', '#d946ef', '#78716c'
];

/**
 * A modal component for creating and editing categories.
 * @param {CategoryModalProps} props - The props for the component.
 * @returns The rendered modal component or null if not open.
 */
export default function CategoryModal({ isOpen, onClose, onSave, categoryToEdit }: CategoryModalProps): React.ReactNode {
  const { t } = useLocalization();
  // Form state
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  /**
   * Effect to populate the form fields when the modal opens.
   * If `categoryToEdit` is provided, it fills the form with the category's data.
   * Otherwise, it resets the form to its default state for a new category.
   */
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

  /**
   * Handles the form submission.
   * Validates the input and calls the onSave callback.
   * @param {React.FormEvent} e - The form submission event.
   */
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
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-center">{categoryToEdit ? t('editCategory') : t('addCategory')}</h2>

          {/* Category Name Input */}
          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-text-secondary">{t('categoryName')}</label>
            <input
              type="text"
              id="category-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={t('category_groceries')}
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-text-secondary">{t('categoryColor')}</label>
            <div className="mt-2 grid grid-cols-8 gap-2">
              {COLORS.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-full aspect-square rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          
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