
import React from 'react';
import { View } from '../types';
import { HomeIcon, ChartIcon, CogIcon, HistoryIcon, PlusIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';
import ThemeToggle from './ThemeToggle';

interface SideNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  openModal: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 text-left ${isActive ? 'bg-primary/20 text-primary font-semibold' : 'text-text-secondary hover:bg-surface hover:text-primary'}`}>
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

export default function SideNav({ activeView, setActiveView, openModal, theme, setTheme }: SideNavProps): React.ReactNode {
    const { t } = useLocalization();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border p-4 space-y-6 flex-shrink-0">
            <div className="px-2 pt-2">
               <h1 className="text-3xl font-bold text-center text-gradient">Meme Budget</h1>
            </div>
            
            <button
                onClick={openModal}
                className="flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
                <PlusIcon className="w-6 h-6 mr-2" />
                {t('addTransaction')}
            </button>

            <nav className="flex-1 space-y-2">
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

            <div className="flex justify-center">
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
        </aside>
    );
}
