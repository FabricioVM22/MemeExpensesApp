/**
 * @file The main component of the Meme Budget application.
 * This component orchestrates the entire application's state, navigation,
 * and view rendering. It manages transactions, categories, budgets, events,
 * and theme settings.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, Budget, Category, View, Event } from './types';
import { DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import AddTransactionModal from './components/AddTransactionModal';
import History from './components/History';
import Events from './components/Events';
import EventDetail from './components/EventDetail';
import AddEventModal from './components/AddEventModal';
import ThemeToggle from './components/ThemeToggle';
import { PlusIcon } from './components/icons';
import { useLocalization } from './context/LocalizationContext';
import { lightTheme, darkTheme } from './theme';
import { generateThemeCss } from './utils/theme';


/**
 * Defines the available theme options.
 */
type Theme = 'light' | 'dark';

/**
 * The root component for the Meme Budget application.
 * @returns The rendered application UI.
 */
export default function App(): React.ReactNode {
  const { t } = useLocalization();
  
  // --- State Management ---
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [budgets, setBudgets] = useLocalStorage<Record<string, Budget[]>>('budgets', {});
  const [appTheme, setAppTheme] = useLocalStorage<Theme>('theme', 'light');
  const [events, setEvents] = useLocalStorage<Event[]>('events', []);

  // Modal and view-specific state
  const [transactionModalContext, setTransactionModalContext] = useState<{ eventId?: string } | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  /**
   * Effect to apply the selected theme (light/dark) to the application.
   * It updates the class on the root HTML element and injects CSS variables.
   */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(appTheme);
    
    document.body.className = 'bg-background transition-colors duration-300';

    const theme = appTheme === 'light' ? lightTheme : darkTheme;
    const themeCss = generateThemeCss(theme);
    
    let styleTag = document.getElementById('app-theme');
    if (styleTag) {
      styleTag.innerHTML = themeCss;
    }

  }, [appTheme]);

  /**
   * Adds a new transaction to the state.
   * @param transaction - The transaction object to add, without an ID.
   */
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: crypto.randomUUID() }]);
  };

  /**
   * Saves an event, either by creating a new one or updating an existing one.
   * @param event - The event object to save. Can have an optional ID for updates.
   */
  const saveEvent = (event: Omit<Event, 'id'> & { id?: string }) => {
    if (event.id) { // Update existing event
      setEvents(prev => prev.map(e => e.id === event.id ? { ...e, name: event.name, budget: event.budget } : e));
      alert(t('editEventSuccess'));
    } else { // Add new event
      setEvents(prev => [...prev, { name: event.name, budget: event.budget, id: crypto.randomUUID() }]);
      alert(t('addEventSuccess'));
    }
  };

  /**
   * Deletes an event and all its associated transactions.
   * @param eventId - The ID of the event to delete.
   */
  const deleteEvent = (eventId: string) => {
    if (window.confirm(t('confirmDeleteEventDesc'))) {
      // If the user is viewing the deleted event, navigate back
      if (selectedEventId === eventId) {
        setSelectedEventId(null);
      }
      setEvents(prev => prev.filter(e => e.id !== eventId));
      setTransactions(prev => prev.filter(t => t.eventId !== eventId));
      alert(t('deleteEventSuccess'));
    }
  };
  
  /**
   * Opens the event modal for adding or editing an event.
   * @param event - The event to edit, or null to add a new one.
   */
  const handleOpenEventModal = (event: Event | null) => {
    setEventToEdit(event);
    setIsEventModalOpen(true);
  };

  // --- Memoized Calculations for Performance ---
  const currentMonthKey = new Date().toISOString().slice(0, 7); // YYYY-MM

  // Filter out event transactions from main budget calculations
  const mainTransactions = useMemo(() => transactions.filter(t => !t.eventId), [transactions]);

  const currentMonthTransactions = useMemo(() => {
    return mainTransactions.filter(t => t.date.startsWith(currentMonthKey));
  }, [mainTransactions, currentMonthKey]);

  const currentMonthBudget = useMemo(() => {
    return budgets[currentMonthKey] || [];
  }, [budgets, currentMonthKey]);
  
  /**
   * Updates the budget for the current month.
   * @param newBudgets - An array of budget settings for the current month.
   */
  const setMonthBudget = (newBudgets: Budget[]) => {
    setBudgets(prev => ({...prev, [currentMonthKey]: newBudgets}));
  }

  /**
   * Sets the active view, resetting any event-specific view state.
   * @param view - The new view to display.
   */
  const handleSetView = (view: View) => {
    setSelectedEventId(null);
    setActiveView(view);
  }

  /**
   * Renders the currently active view component based on state.
   * @returns The React component for the current view.
   */
  const renderView = () => {
    if (selectedEventId) {
        const event = events.find(e => e.id === selectedEventId);
        if (!event) {
            setSelectedEventId(null); // Event not found, go back
            return null;
        }
        return <EventDetail 
            event={event}
            transactions={transactions.filter(t => t.eventId === selectedEventId)}
            categories={categories}
            onBack={() => setSelectedEventId(null)}
            onAddExpense={() => setTransactionModalContext({ eventId: selectedEventId })}
            onEdit={handleOpenEventModal}
            onDelete={deleteEvent}
        />
    }

    switch (activeView) {
      case View.Dashboard:
        return <Dashboard transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} setActiveView={handleSetView} />;
      case View.Analytics:
        return <Analytics transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} />;
      case View.History:
        return <History transactions={mainTransactions} categories={categories} />;
      case View.Events:
        return <Events 
            events={events} 
            transactions={transactions}
            onSelectEvent={setSelectedEventId} 
            onAddEvent={() => handleOpenEventModal(null)}
            onEditEvent={handleOpenEventModal}
            onDeleteEvent={deleteEvent}
        />;
      case View.Settings:
        return <Settings 
          categories={categories} 
          setCategories={setCategories}
          budget={currentMonthBudget} 
          setMonthBudget={setMonthBudget} 
          transactions={mainTransactions}
          setTransactions={setTransactions}
        />;
      default:
        return <Dashboard transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} setActiveView={handleSetView}/>;
    }
  };

  return (
    <div className="font-sans antialiased text-text-primary bg-background min-h-screen md:flex">
      
      {/* --- Sidebar for Desktop --- */}
      <SideNav
        activeView={activeView}
        setActiveView={handleSetView}
        openModal={() => setTransactionModalContext({})}
        theme={appTheme}
        setTheme={setAppTheme}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 w-full md:w-auto">
        <div className="relative pb-24 md:pb-8 max-w-3xl mx-auto">
          
          {/* --- Mobile Header --- */}
          <header className="p-4 flex justify-between items-center border-b border-border md:hidden">
            <div className="w-8"></div> {/* Spacer */}
            <h1 className="text-2xl font-bold text-center text-gradient">Meme Budget</h1>
            <ThemeToggle theme={appTheme} setTheme={setAppTheme} />
          </header>

          <main className="p-4 md:pt-8">
            {renderView()}
          </main>
          
          {/* --- Mobile Floating Action Button --- */}
          {!selectedEventId && (
            <div className="fixed bottom-20 right-6 z-20 md:hidden">
              <button
                onClick={() => setTransactionModalContext({})}
                className="bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-transform transform hover:scale-105"
                aria-label={t('addTransaction')}
              >
                <PlusIcon className="w-8 h-8" />
              </button>
            </div>
          )}
          
          {/* --- Mobile Bottom Navigation --- */}
          <BottomNav activeView={activeView} setActiveView={handleSetView} />
        </div>
      </div>


      {/* --- Global Modals --- */}
      <AddTransactionModal
        isOpen={!!transactionModalContext}
        onClose={() => setTransactionModalContext(null)}
        onAddTransaction={addTransaction}
        categories={categories}
        eventId={transactionModalContext?.eventId}
      />

      <AddEventModal
        isOpen={isEventModalOpen}
        onClose={() => { setIsEventModalOpen(false); setEventToEdit(null); }}
        onSaveEvent={saveEvent}
        eventToEdit={eventToEdit}
      />
    </div>
  );
}