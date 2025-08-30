
import React, { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, Budget, Category, View } from './types';
import { DEFAULT_CATEGORIES } from './constants';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import AddTransactionModal from './components/AddTransactionModal';
import History from './components/History';
import ThemeToggle from './components/ThemeToggle';
import { PlusIcon } from './components/icons';
import { useLocalization } from './context/LocalizationContext';
import { lightTheme, darkTheme } from './theme';
import { generateThemeCss } from './utils/theme';


type Theme = 'light' | 'dark';

export default function App(): React.ReactNode {
  const { t } = useLocalization();
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [budgets, setBudgets] = useLocalStorage<Record<string, Budget[]>>('budgets', {});
  const [appTheme, setAppTheme] = useLocalStorage<Theme>('theme', 'light');

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case View.History:
        return <History transactions={transactions} categories={categories} />;
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
    <div className="font-sans antialiased text-text-primary">
      <div className="relative pb-24 max-w-lg mx-auto">
        <header className="p-4 flex justify-between items-center border-b border-border">
          <div className="w-8"></div> {/* Spacer */}
          <h1 className="text-2xl font-bold text-center text-gradient">Meme Budget</h1>
          <ThemeToggle theme={appTheme} setTheme={setAppTheme} />
        </header>

        <main className="p-4">
          {renderView()}
        </main>

        <div className="fixed bottom-20 right-4 z-20" style={{ right: 'calc(50% - 224px + 16px)' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-transform transform hover:scale-105"
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