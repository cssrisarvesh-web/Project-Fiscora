import React from 'react';
import { Sidebar, PageKey } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  currentPage, 
  onPageChange 
}) => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Sidebar for Desktop/Laptops */}
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <Header currentPage={currentPage} />

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Mobile Navigation bar */}
        <MobileNav currentPage={currentPage} onPageChange={onPageChange} />
      </div>
    </div>
  );
};
