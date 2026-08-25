import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Briefcase, 
  Menu, 
  X,
  TrendingUp,
  LineChart,
  Target,
  Calculator,
  MessageSquareCode,
  FileText,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { PageKey } from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileNavProps {
  currentPage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const primaryItems = [
    { key: 'dashboard' as const, label: 'Home', icon: LayoutDashboard },
    { key: 'transactions' as const, label: 'Txns', icon: ArrowLeftRight },
    { key: 'budget' as const, label: 'Budget', icon: PieChart },
    { key: 'portfolio' as const, label: 'Portfolio', icon: Briefcase },
  ];

  const allItems = [
    { key: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'transactions' as const, label: 'Transactions', icon: ArrowLeftRight },
    { key: 'budget' as const, label: 'Budget', icon: PieChart },
    { key: 'net-worth' as const, label: 'Net Worth', icon: TrendingUp },
    { key: 'portfolio' as const, label: 'Portfolio', icon: Briefcase },
    { key: 'analytics' as const, label: 'Analytics', icon: LineChart },
    { key: 'goals' as const, label: 'Goals', icon: Target },
    { key: 'tools' as const, label: 'Financial Tools', icon: Calculator },
    { key: 'ai-assistant' as const, label: 'AI Assistant', icon: MessageSquareCode },
    { key: 'reports' as const, label: 'Reports', icon: FileText },
    { key: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (key: PageKey) => {
    onPageChange(key);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden select-none">
      {/* Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-4 z-40 shadow-lg">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-emerald-500 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            isOpen || !primaryItems.some(pi => pi.key === currentPage)
              ? 'text-emerald-500 font-semibold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 transition-opacity flex justify-end">
          {/* Drawer Panel */}
          <div className="w-80 h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-lg font-bold text-slate-800 dark:text-white">Fiscora Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links List */}
            <div className="flex-1 space-y-1">
              {allItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
                <span className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center p-0.5 transition-colors">
                  <span className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${theme === 'dark' ? 'translate-x-4 bg-emerald-400' : ''}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
