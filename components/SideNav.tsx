
/**
 * @file Renders the sidebar navigation for desktop and tablet views.
 * This component provides access to all main sections of the app, a button
 * to add new transactions, and a theme toggle. It is hidden on mobile screens.
 */

import React from 'react';
import { View } from '../types';
import { HomeIcon, ChartIcon, CogIcon, HistoryIcon, PlusIcon, GiftIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';
import ThemeToggle from './ThemeToggle';

/**
 * Props for the SideNav component.
 */
interface SideNavProps {
  /** The currently active view. */
  activeView: View;
  /** Function to set the active view. */
  setActiveView: (view: View) => void;
  /** Function to open the 'Add Transaction' modal. */
  openModal: () => void;
  /** The current application theme. */
  theme: 'light' | 'dark';
  /** Function to set the application theme. */
  setTheme: (theme: 'light' | 'dark') => void;
}

/**
 * A single clickable item in the sidebar navigation.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} props.label - The text label for the item.
 * @param {boolean} props.isActive - Whether this item is the currently active view.
 * @param {() => void} props.onClick - The function to call when the item is clicked.
 * @returns A navigation item button.
 */
const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 text-left ${isActive ? 'bg-input text-primary font-semibold' : 'text-text-secondary hover:bg-input hover:text-primary'}`}>
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

/**
 * The sidebar navigation component for larger screens.
 * @param {SideNavProps} props - The props for the component.
 * @returns The rendered sidebar component.
 */
export default function SideNav({ activeView, setActiveView, openModal, theme, setTheme }: SideNavProps): React.ReactNode {
    const { t } = useLocalization();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border p-4 space-y-6 flex-shrink-0">
            <div className="px-2 pt-2">
               <h1 className="text-3xl font-bold text-center text-gradient">Meme Budget</h1>
            </div>
            
            {/* "New Transaction" Button */}
            <button
                onClick={openModal}
                className="flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
                <PlusIcon className="w-6 h-6 mr-2" />
                {t('addTransaction')}
            </button>

            {/* Navigation Links */}
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

            {/* Theme Toggle at the bottom */}
            <div className="flex justify-center">
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
        </aside>
    );
}