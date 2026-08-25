import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AssetLiabilityItem,
  BudgetCategory,
  FinancialGoal,
  Holding,
  Transaction,
} from '../types/finance';

export interface FinanceState {
  transactions: Transaction[];
  budgets: BudgetCategory[];
  netWorthItems: AssetLiabilityItem[];
  holdings: Holding[];
  goals: FinancialGoal[];
}

interface FinanceContextValue extends FinanceState {
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  addBudget: (budget: Omit<BudgetCategory, 'id'>) => void;
  updateBudgetLimit: (id: string, limit: number) => void;
  addNetWorthItem: (item: Omit<AssetLiabilityItem, 'id'>) => void;
  addHolding: (holding: Holding) => void;
  addGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
}

const EMPTY_STATE: FinanceState = {
  transactions: [],
  budgets: [],
  netWorthItems: [],
  holdings: [],
  goals: [],
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

function withId<T extends { id: string }>(item: Omit<T, 'id'>, prefix: string): T {
  return { ...item, id: `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` } as T;
}

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FinanceState>(EMPTY_STATE);

  const value = useMemo<FinanceContextValue>(
    () => ({
      ...state,
      addTransaction: (tx) =>
        setState((prev) => ({
          ...prev,
          transactions: [withId<Transaction>(tx, 'tx'), ...prev.transactions],
        })),
      addBudget: (budget) =>
        setState((prev) => ({
          ...prev,
          budgets: [...prev.budgets, withId<BudgetCategory>(budget, 'b')],
        })),
      updateBudgetLimit: (id, limit) =>
        setState((prev) => ({
          ...prev,
          budgets: prev.budgets.map((b) => (b.id === id ? { ...b, limit } : b)),
        })),
      addNetWorthItem: (item) =>
        setState((prev) => ({
          ...prev,
          netWorthItems: [...prev.netWorthItems, withId<AssetLiabilityItem>(item, 'nw')],
        })),
      addHolding: (holding) =>
        setState((prev) => ({
          ...prev,
          holdings: [...prev.holdings, holding],
        })),
      addGoal: (goal) =>
        setState((prev) => ({
          ...prev,
          goals: [...prev.goals, withId<FinancialGoal>(goal, 'g')],
        })),
    }),
    [state]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
