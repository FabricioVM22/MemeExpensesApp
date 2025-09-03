

import React from 'react';
import { View } from '../types';
import { HomeIcon, ChartIcon, CogIcon, HistoryIcon, GiftIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
    {icon}
    <span className="text-xs mt-1">{label}</span>
    {isActive && <div className="w-1/2 h-0.5 bg-primary mt-1 rounded-full"></div>}
  </button>
);

export default function BottomNav({ activeView, setActiveView }: BottomNavProps): React.ReactNode {
  const { t } = useLocalization();
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-sm border-t border-border flex justify-around max-w-lg mx-auto shadow-top z-10 md:hidden">
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
        icon={<GiftIcon className="w-6 h-6" />}
        label={t('events')}
        isActive={activeView === View.Events}
        onClick={() => setActiveView(View.Events)}
      />
      <NavItem
        icon={<HistoryIcon className="w-6 h-6" />}
        label={t('history')}
        isActive={activeView === View.History}
        onClick={() => setActiveView(View.History)}
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