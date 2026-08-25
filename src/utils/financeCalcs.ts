import { AssetLiabilityItem, BudgetCategory, Holding, Transaction } from '../types/finance';

export function isSameMonth(dateStr: string, ref: Date = new Date()): boolean {
  const d = new Date(dateStr);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function monthlyIncome(transactions: Transaction[], ref?: Date): number {
  return transactions
    .filter((t) => t.type === 'income' && isSameMonth(t.date, ref))
    .reduce((sum, t) => sum + t.amount, 0);
}

export function monthlyExpenses(transactions: Transaction[], ref?: Date): number {
  return transactions
    .filter((t) => t.type === 'expense' && isSameMonth(t.date, ref))
    .reduce((sum, t) => sum + t.amount, 0);
}

export function savingsRate(income: number, expenses: number): number {
  if (income <= 0) return 0;
  return ((income - expenses) / income) * 100;
}

export function netWorthTotal(items: AssetLiabilityItem[]): {
  assets: number;
  liabilities: number;
  netWorth: number;
} {
  const assets = items.filter((i) => i.type === 'asset').reduce((sum, i) => sum + i.value, 0);
  const liabilities = items
    .filter((i) => i.type === 'liability')
    .reduce((sum, i) => sum + Math.abs(i.value), 0);
  return { assets, liabilities, netWorth: assets - liabilities };
}

export function budgetTotals(budgets: BudgetCategory[]): {
  totalLimit: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
} {
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = Math.max(totalLimit - totalSpent, 0);
  const utilization = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
  return { totalLimit, totalSpent, remaining, utilization };
}

export function portfolioTotals(holdings: Holding[]): {
  marketValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPercent: number;
} {
  const marketValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const costBasis = holdings.reduce((sum, h) => sum + h.shares * h.averagePrice, 0);
  const gainLoss = marketValue - costBasis;
  const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
  return { marketValue, costBasis, gainLoss, gainLossPercent };
}

export function allocationFromHoldings(holdings: Holding[]): { name: string; value: number; color: string }[] {
  const palette = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#f43f5e', '#06b6d4'];
  const byType = new Map<string, number>();
  holdings.forEach((h) => {
    byType.set(h.assetClass, (byType.get(h.assetClass) ?? 0) + h.value);
  });
  return Array.from(byType.entries()).map(([name, value], idx) => ({
    name,
    value,
    color: palette[idx % palette.length],
  }));
}
