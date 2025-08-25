
import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, Budget, Category, View } from './types';
import { DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import AddTransactionModal from './components/AddTransactionModal';
import { PlusIcon } from './components/icons';
import { useLocalization } from './context/LocalizationContext';

export default function App(): React.ReactNode {
  const { t } = useLocalization();
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [budgets, setBudgets] = useLocalStorage<Record<string, Budget[]>>('budgets', {});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: crypto.randomUUID() }]);
  };

  const currentMonthKey = new Date().toISOString().slice(0, 7); // YYYY-MM

  const currentMonthTransactions = useMemo(() => {
    return transactions.filter(t => t.date.startsWith(currentMonthKey));
  }, [transactions, currentMonthKey]);

  const currentMonthBudget = useMemo(() => {
    return budgets[currentMonthKey] || [];
  }, [budgets, currentMonthKey]);
  
  const setMonthBudget = (newBudgets: Budget[]) => {
    setBudgets(prev => ({...prev, [currentMonthKey]: newBudgets}));
  }

  const renderView = () => {
    switch (activeView) {
      case View.Dashboard:
        return <Dashboard transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} setActiveView={setActiveView} />;
      case View.Analytics:
        return <Analytics transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} />;
      case View.Settings:
        return <Settings 
          categories={categories} 
          setCategories={setCategories}
          budget={currentMonthBudget} 
          setMonthBudget={setMonthBudget} 
          transactions={transactions}
          setTransactions={setTransactions}
        />;
      default:
        return <Dashboard transactions={currentMonthTransactions} budget={currentMonthBudget} categories={categories} setActiveView={setActiveView}/>;
    }
  };

  return (
    <div className="font-sans antialiased text-slate-800 dark:text-slate-200 bg-rose-50 dark:bg-slate-900 min-h-screen">
      <div className="relative pb-24 max-w-lg mx-auto">
        <header className="p-4 border-b border-rose-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-center text-gradient">SimpliFi</h1>
        </header>

        <main className="p-4">
          {renderView()}
        </main>

        <div className="fixed bottom-20 right-4 z-20" style={{ right: 'calc(50% - 224px + 16px)' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            aria-label={t('addTransaction')}
          >
            <PlusIcon className="w-8 h-8" />
          </button>
        </div>
        
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={addTransaction}
        categories={categories}
      />
    </div>
  );
}