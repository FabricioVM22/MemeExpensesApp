
/**
 * @file Renders the main view for the "Events" feature.
 * This component displays a list of all created event budgets,
 * allowing users to view, add, edit, or delete them.
 */

import React from 'react';
import { Event, Transaction } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { PlusIcon, EditIcon, TrashIcon } from './icons';

/**
 * Props for the Events component.
 */
interface EventsProps {
  /** The list of all created events. */
  events: Event[];
  /** The list of all transactions to calculate spending for each event. */
  transactions: Transaction[];
  /** Callback to navigate to an event's detail view. */
  onSelectEvent: (eventId: string) => void;
  /** Callback to open the modal for adding a new event. */
  onAddEvent: () => void;
  /** Callback to open the modal for editing an existing event. */
  onEditEvent: (event: Event) => void;
  /** Callback to delete an event. */
  onDeleteEvent: (eventId: string) => void;
}

/**
 * The main component for listing and managing event budgets.
 * @param {EventsProps} props - The props for the component.
 * @returns The rendered events list UI.
 */
export default function Events({ events, transactions, onSelectEvent, onAddEvent, onEditEvent, onDeleteEvent }: EventsProps): React.ReactNode {
    const { t } = useLocalization();

    /**
     * Calculates the total amount spent for a specific event.
     * @param {string} eventId - The ID of the event.
     * @returns The total spent amount.
     */
    const getEventSpent = (eventId: string) => {
        return transactions
            .filter(t => t.eventId === eventId)
            .reduce((sum, t) => sum + t.amount, 0);
    };
    
    // Display events in reverse chronological order (newest first).
    const sortedEvents = [...events].reverse();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">{t('events')}</h1>
                <button
                    onClick={onAddEvent}
                    className="flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-transform transform hover:scale-105"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    {t('addEvent')}
                </button>
            </div>

            {sortedEvents.length > 0 ? (
                <div className="space-y-4">
                    {sortedEvents.map(event => {
                        const spent = getEventSpent(event.id);
                        const remaining = event.budget - spent;
                        const percentage = event.budget > 0 ? Math.min((spent / event.budget) * 100, 100) : 0;
                        const isOverBudget = spent > event.budget;

                        return (
                            <div key={event.id} className="bg-surface border border-border rounded-2xl shadow-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    {/* Event Name - clickable to see details */}
                                    <div onClick={() => onSelectEvent(event.id)} className="flex-grow cursor-pointer pr-2">
                                        <h2 className="font-bold text-lg text-text-primary truncate">{event.name}</h2>
                                    </div>
                                    {/* Edit and Delete Buttons */}
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <button onClick={(e) => { e.stopPropagation(); onEditEvent(event); }} aria-label={t('editEvent')} className="p-1 text-text-secondary hover:text-primary rounded-full"><EditIcon className="w-5 h-5"/></button>
                                        <button onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }} aria-label={t('deleteEvent')} className="p-1 text-text-secondary hover:text-danger rounded-full"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                                <div onClick={() => onSelectEvent(event.id)} className="cursor-pointer space-y-3">
                                    {/* Progress Bar */}
                                    <div
                                        className="w-full bg-input rounded-full h-4 relative overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={spent}
                                        aria-valuemin={0}
                                        aria-valuemax={event.budget}
                                    >
                                        <div 
                                            className="h-4 rounded-full" 
                                            style={{ 
                                                width: `${percentage}%`, 
                                                backgroundColor: isOverBudget ? 'hsl(var(--danger))' : 'hsl(var(--primary))'
                                            }}
                                        ></div>
                                    </div>
                                    {/* Spending Summary */}
                                    <div className="flex justify-between text-sm">
                                        <div className="text-text-secondary">
                                            <span className="font-semibold text-danger">{t('currencySymbol')}{spent.toFixed(2)}</span> {t('spent')}
                                        </div>
                                        <div className="text-text-secondary">
                                            {t('budget')}: <span className="font-semibold text-text-primary">{t('currencySymbol')}{event.budget.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    {isOverBudget && (
                                        <p className="text-right text-xs text-danger">
                                            {t('overBudgetWarning', { amount: `${t('currencySymbol')}${(spent - event.budget).toFixed(2)}` })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Placeholder shown when no events have been created
                <div className="text-center py-10 px-4 bg-surface border border-border rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-2">{t('noEvents')}</h2>
                    <p className="text-text-secondary mb-4">{t('createFirstEvent')}</p>
                    <button onClick={onAddEvent} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors">
                        {t('addEvent')}
                    </button>
                </div>
            )}
        </div>
    );
}