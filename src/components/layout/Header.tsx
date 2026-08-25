import React from 'react';
import { Bell, Search } from 'lucide-react';
import { PageKey } from './Sidebar';

interface HeaderProps {
  currentPage: PageKey;
}

export const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const titles: Record<PageKey, string> = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    budget: 'Budget Plans',
    'net-worth': 'Net Worth',
    portfolio: 'Portfolio Holdings',
    analytics: 'Analytics & Risk',
    goals: 'Financial Goals',
    tools: 'Financial Calculators',
    'ai-assistant': 'AI Copilot Assistant',
    reports: 'Financial Reports',
    settings: 'Settings'
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 select-none sticky top-0 z-10">
      <h1 className="text-lg font-bold text-slate-800 dark:text-white">
        {titles[currentPage] || 'Fiscora'}
      </h1>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-56 pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-colors text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>
      </div>
    </header>
  );
};
