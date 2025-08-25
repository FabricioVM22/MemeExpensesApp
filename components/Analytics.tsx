
import React, { useMemo } from 'react';
import { Transaction, Budget, Category } from '../types';
import { useLocalization } from '../context/LocalizationContext';
import { TranslationKey } from '../locales/en';
import { PALETTE } from '../theme';

// Tell TypeScript that window.Recharts exists
declare global {
  interface Window {
    Recharts: any;
  }
}

interface AnalyticsProps {
  transactions: Transaction[];
  budget: Budget[];
  categories: Category[];
  theme: 'light' | 'dark';
}

const CustomTooltip = ({ active, payload, label, t }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface p-2 border border-border rounded shadow">
          <p className="font-bold text-text-primary">{label}</p>
          <p className="text-danger">{t('tooltipSpent', { amount: `${t('currencySymbol')}${data.spent.toFixed(2)}` })}</p>
          <p style={{ color: PALETTE.mint2 }}>{t('tooltipBudget', { amount: `${t('currencySymbol')}${data.budget.toFixed(2)}` })}</p>
        </div>
      );
    }
  
    return null;
  };

export default function Analytics({ transactions, budget, categories, theme }: AnalyticsProps): React.ReactNode {
  const { t } = useLocalization();
  
  // Guard against Recharts not being loaded yet from the CDN
  if (typeof window === 'undefined' || !window.Recharts) {
    return (
        <div className="flex items-center justify-center h-96 bg-surface rounded-lg shadow">
            <p className="text-text-secondary">{t('loadingCharts')}</p>
        </div>
    );
  }
  
  // Recharts is loaded from CDN in index.html, destructure it here inside the component
  const { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } = window.Recharts;

  const expenses = useMemo(() => transactions.filter(t => t.type === 'expense'), [transactions]);

  const spendingData = useMemo(() => {
    return categories.map(category => {
      const categoryBudget = budget.find(b => b.categoryId === category.id)?.amount || 0;
      const categorySpent = expenses
        .filter(e => e.categoryId === category.id)
        .reduce((sum, e) => sum + e.amount, 0);

      return {
        name: category.name.startsWith('category_') ? t(category.name as TranslationKey) : category.name,
        spent: categorySpent,
        budget: categoryBudget,
        color: category.color,
      };
    }).filter(d => d.budget > 0 || d.spent > 0);
  }, [categories, budget, expenses, t]);

  if (spendingData.length === 0) {
    return (
        <div className="text-center py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">{t('spendingAnalytics')}</h2>
            <p className="text-text-secondary">
                {t('noSpendingData')}
            </p>
        </div>
    );
  }

  const axisColor = theme === 'dark' ? PALETTE.celadon2 : PALETTE.seaGreen;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">{t('spendingVsBudget')}</h2>
        <div className="bg-surface rounded-lg shadow p-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
              <XAxis type="number" stroke={axisColor} />
              <YAxis dataKey="name" type="category" stroke={axisColor} width={80} />
              <Tooltip content={<CustomTooltip t={t} />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} />
              <Legend />
              <Bar dataKey="budget" fill={PALETTE.mint2} name={t('budget')} radius={[0, 4, 4, 0]} background={{ fill: 'hsl(var(--primary) / 0.2)', radius: 4 }}/>
              <Bar dataKey="spent" name={t('spent')}>
                {spendingData.map((entry, index) => {
                  const isOverBudget = entry.spent > entry.budget && entry.budget > 0;
                  return <Cell key={`cell-${index}`} fill={isOverBudget ? PALETTE.danger : entry.color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}