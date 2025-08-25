
import React from 'react';
import { View } from '../types';
import { HomeIcon, ChartIcon, CogIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-fuchsia-500' : 'text-slate-500 dark:text-slate-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400'}`}>
    {icon}
    <span className="text-xs mt-1">{label}</span>
    {isActive && <div className="w-1/2 h-0.5 bg-fuchsia-500 mt-1 rounded-full"></div>}
  </button>
);

export default function BottomNav({ activeView, setActiveView }: BottomNavProps): React.ReactNode {
  const { t } = useLocalization();
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-rose-100 dark:border-slate-700 flex justify-around max-w-lg mx-auto shadow-top z-10">
      <NavItem
        icon={<HomeIcon className="w-6 h-6" />}
        label={t('dashboard')}
        isActive={activeView === View.Dashboard}
        onClick={() => setActiveView(View.Dashboard)}
      />
      <NavItem
        icon={<ChartIcon className="w-6 h-6" />}
        label={t('analytics')}
        isActive={activeView === View.Analytics}
        onClick={() => setActiveView(View.Analytics)}
      />
      <NavItem
        icon={<CogIcon className="w-6 h-6" />}
        label={t('settings')}
        isActive={activeView === View.Settings}
        onClick={() => setActiveView(View.Settings)}
      />
    </nav>
  );
}