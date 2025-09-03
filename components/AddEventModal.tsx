
import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEvent: (event: Omit<Event, 'id'> & { id?: string }) => void;
  eventToEdit: Event | null;
}

export default function AddEventModal({ isOpen, onClose, onSaveEvent, eventToEdit }: AddEventModalProps): React.ReactNode {
  const { t } = useLocalization();
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const isEditing = !!eventToEdit;

  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        setName(eventToEdit.name);
        setBudget(eventToEdit.budget.toString());
      } else {
        setName('');
        setBudget('');
      }
    }
  }, [isOpen, eventToEdit]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(t('errorEventName'));
      return;
    }
    const budgetAmount = parseFloat(budget);
    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      alert(t('errorEventBudget'));
      return;
    }
    onSaveEvent({
      id: eventToEdit?.id,
      name,
      budget: budgetAmount,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">{isEditing ? t('editEventTitle') : t('addEvent')}</h2>
          
          <div>
            <label htmlFor="event-name" className="block text-sm font-medium text-text-secondary">{t('eventName')}</label>
            <input
              type="text"
              id="event-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full bg-input border-transparent rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g., Summer Vacation"
            />
          </div>

          <div>
            <label htmlFor="event-budget" className="block text-sm font-medium text-text-secondary">{t('eventBudget')}</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-text-secondary sm:text-sm">{t('currencySymbol')}</span>
              </div>
              <input
                type="number"
                id="event-budget"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full pl-7 pr-2 py-2 bg-input border-transparent rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-input hover:bg-border transition-colors">{t('cancel')}</button>
            <button type="submit" className="py-2 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}