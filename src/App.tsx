import React, { useState } from 'react';

import { useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';

import { ThemeProvider } from './contexts/ThemeContext';
import { FinanceProvider } from './contexts/FinanceContext';

import { AppLayout } from './components/layout/AppLayout';
import { PageKey } from './components/layout/Sidebar';

// Page components imports
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { NetWorth } from './pages/NetWorth';
import { Portfolio } from './pages/Portfolio';
import { Analytics } from './pages/Analytics';
import { Goals } from './pages/Goals';
import { FinancialTools } from './pages/FinancialTools';
import { AiAssistant } from './pages/AiAssistant';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const { user, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;

      case 'transactions':
        return <Transactions />;

      case 'budget':
        return <Budget />;

      case 'net-worth':
        return <NetWorth />;

      case 'portfolio':
        return <Portfolio />;

      case 'analytics':
        return <Analytics />;

      case 'goals':
        return <Goals />;

      case 'tools':
        return <FinancialTools />;

      case 'ai-assistant':
        return <AiAssistant />;

      case 'reports':
        return <Reports />;

      case 'settings':
        return <Settings />;

      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  // Wait while Supabase checks whether a user is logged in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-700 dark:text-slate-200">
          Loading Fiscora...
        </p>
      </div>
    );
  }

  // If there is no authenticated user, show Login / Register
  if (!user) {
    return <AuthPage />;
  }

  // If the user is logged in, show the existing Fiscora application
  return (
    <ThemeProvider>
      <FinanceProvider>
        <AppLayout
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        >
          {renderPage()}
        </AppLayout>
      </FinanceProvider>
    </ThemeProvider>
  );
};

export default App;