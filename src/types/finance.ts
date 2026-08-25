export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'completed' | 'pending';
}

export interface Holding {
  symbol: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  gainLoss: number;
  gainLossPercentage: number;
  assetClass: 'Equity' | 'Fixed Income' | 'Commodity' | 'Crypto' | 'Cash';
}

export interface AssetLiabilityItem {
  id: string;
  name: string;
  value: number;
  category: string;
  type: 'asset' | 'liability';
}

export interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  limit: number;
  color: string; // Tailwind color class e.g., 'emerald', 'blue', 'amber', etc.
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface MetricCard {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  timeframe: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
