
import React, { useMemo } from 'react';
import { Transaction, Budget, Category, View } from '../types';
import { ChartIcon, CogIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';

interface DashboardProps {
  transactions: Transaction[];
  budget: Budget[];
  categories: Category[];
  setActiveView: (view: View) => void;
}

const CategoryIcon = ({ color, categoryName }: { color: string; categoryName: string }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
        {categoryName.charAt(0)}
    </div>
);


export default function Dashboard({ transactions, budget, categories, setActiveView }: DashboardProps): React.ReactNode {
  const { t } = useLocalization();

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
    
  const getCategory = (id: string | undefined) => categories.find(c => c.id === id);

  return (
    <div className="space-y-6">
      <section>
        <div className="bg-white dark:bg-[#56445d] rounded-lg shadow p-4 space-y-4">
          <div className="text-center">
            <p className="text-sm text-[#56445d] dark:text-[#8fbc94]">{t('currentBalance')}</p>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-[#6da34d]' : 'text-red-500'}`}>
              {t('currencySymbol')}{balance.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-center">
            <div>
              <p className="text-sm text-[#56445d] dark:text-[#8fbc94]">{t('income')}</p>
              <p className="text-lg font-semibold text-[#6da34d]">{t('currencySymbol')}{totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-[#56445d] dark:text-[#8fbc94]">{t('expenses')}</p>
              <p className="text-lg font-semibold text-red-500">{t('currencySymbol')}{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      {budget.length === 0 && (
        <section>
            <div className="bg-[#548687]/10 dark:bg-[#548687]/20 border-l-4 border-[#548687] text-[#548687] dark:text-[#c5e99b] p-4 rounded-lg" role="alert">
                <div className="flex items-center">
                    <CogIcon className="w-6 h-6 mr-3"/>
                    <div>
                        <p className="font-bold">{t('planYourMonth')}</p>
                        <p className="text-sm">{t('budgetNotSet')}</p>
                    </div>
                </div>
                <button onClick={() => setActiveView(View.Settings)} className="mt-3 w-full bg-[#548687] text-white py-2 px-4 rounded-lg hover:bg-[#4a7879] transition-colors">
                    {t('setBudget')}
                </button>
            </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-2 text-[#3a2e40] dark:text-[#f0fdf4]">{t('recentTransactions')}</h2>
        <div className="bg-white dark:bg-[#56445d] rounded-lg shadow p-4 space-y-3">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => {
              const category = transaction.categoryId ? getCategory(transaction.categoryId) : undefined;
              let displayName: string;
              let displayColor: string;

              if (transaction.type === 'income') {
                  displayName = t('income');
                  displayColor = '#6da34d'; // Asparagus
              } else {
                  displayName = category ? (category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name) : t('category_other');
                  displayColor = category ? category.color : '#b7b7a4';
              }

              return (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CategoryIcon color={displayColor} categoryName={displayName}/>
                    <div>
                      <p className="font-semibold">{transaction.description}</p>
                      <p className="text-sm text-[#56445d] dark:text-[#8fbc94]">{displayName}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-[#6da34d]' : 'text-red-500'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{t('currencySymbol')}{transaction.amount.toFixed(2)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-[#56445d] dark:text-[#8fbc94] py-4">{t('noTransactions')}</p>
          )}
        </div>
      </section>
    </div>
  );
}