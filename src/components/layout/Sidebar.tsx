import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  TrendingUp, 
  Briefcase, 
  LineChart, 
  Target, 
  Calculator, 
  MessageSquareCode, 
  FileText, 
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export type PageKey = 
  | 'dashboard'
  | 'transactions'
  | 'budget'
  | 'net-worth'
  | 'portfolio'
  | 'analytics'
  | 'goals'
  | 'tools'
  | 'ai-assistant'
  | 'reports'
  | 'settings';

interface SidebarProps {
  currentPage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
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

  return (
    <aside className="w-64 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 hidden md:flex flex-col select-none">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-extrabold shadow-sm shadow-emerald-500/20">
          F
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
          Fiscora<span className="text-emerald-500">.</span>
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onPageChange(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.5px]' : 'opacity-85'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions & User Profile */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center p-0.5 transition-colors">
            <span className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${theme === 'dark' ? 'translate-x-4 bg-emerald-400' : ''}`} />
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-100 to-emerald-200 dark:from-emerald-900/60 dark:to-emerald-800/60 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300/20">
            G
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Guest</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-500 truncate">Not signed in</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
