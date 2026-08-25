/**
 * Isolated sample records for local UI development only.
 * Production screens must not import this module.
 * New users start with empty datasets in FinanceContext.
 */
import { Transaction, Holding, AssetLiabilityItem, BudgetCategory, FinancialGoal } from '../types/finance';

export const DEMO_METRICS = {
  netWorth: {
    value: 1248500,
    change: 4.8,
    changeType: 'increase' as const,
    timeframe: 'vs last month'
  },
  monthlyIncome: {
    value: 12500,
    change: 8.2,
    changeType: 'increase' as const,
    timeframe: 'vs last month'
  },
  monthlyExpenses: {
    value: 4850,
    change: -2.4,
    changeType: 'decrease' as const,
    timeframe: 'vs last month'
  },
  savingsRate: {
    value: 61.2,
    change: 3.5,
    changeType: 'increase' as const,
    timeframe: 'vs last month'
  }
};

export const DEMO_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', date: '2026-08-24', description: 'Monthly Salary - Stripe Inc', category: 'Salary', type: 'income', amount: 8500, status: 'completed' },
  { id: 'tx-2', date: '2026-08-23', description: 'Vanguard ETF Purchase (VOO)', category: 'Investments', type: 'expense', amount: 1500, status: 'completed' },
  { id: 'tx-3', date: '2026-08-22', description: 'Acme Rental Properties - Rent', category: 'Housing', type: 'expense', amount: 2200, status: 'completed' },
  { id: 'tx-4', date: '2026-08-20', description: 'Whole Foods Groceries', category: 'Food', type: 'expense', amount: 245.50, status: 'completed' },
  { id: 'tx-5', date: '2026-08-18', description: 'Dividends - Apple Inc', category: 'Investments', type: 'income', amount: 185.20, status: 'completed' },
  { id: 'tx-6', date: '2026-08-17', description: 'Amazon Web Services - SaaS', category: 'Business', type: 'expense', amount: 89.90, status: 'completed' },
  { id: 'tx-7', date: '2026-08-15', description: 'Chevron Fuel Station', category: 'Transport', type: 'expense', amount: 65.00, status: 'completed' },
  { id: 'tx-8', date: '2026-08-12', description: 'Freelance UI/UX Contract', category: 'Salary', type: 'income', amount: 3800, status: 'completed' },
  { id: 'tx-9', date: '2026-08-10', description: 'Uber Eats Premium Dining', category: 'Food', type: 'expense', amount: 124.80, status: 'completed' },
  { id: 'tx-10', date: '2026-08-08', description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 22.99, status: 'completed' },
  { id: 'tx-11', date: '2026-08-05', description: 'Equinox Gym Membership', category: 'Health', type: 'expense', amount: 250.00, status: 'completed' },
  { id: 'tx-12', date: '2026-08-04', description: 'Coinbase Crypto Buy (ETH)', category: 'Investments', type: 'expense', amount: 500.00, status: 'completed' },
  { id: 'tx-13', date: '2026-08-02', description: 'Starbucks Coffee', category: 'Food', type: 'expense', amount: 14.50, status: 'completed' },
  { id: 'tx-14', date: '2026-08-01', description: 'Target Store Purchases', category: 'Shopping', type: 'expense', amount: 189.40, status: 'completed' },
  { id: 'tx-15', date: '2026-07-28', description: 'IRS Tax Return', category: 'Refund', type: 'income', amount: 1450.00, status: 'completed' }
];

export const DEMO_BUDGETS: BudgetCategory[] = [
  { id: 'b-1', name: 'Housing & Utilities', spent: 2350, limit: 2500, color: 'blue' },
  { id: 'b-2', name: 'Food & Dining', spent: 680, limit: 900, color: 'emerald' },
  { id: 'b-3', name: 'Investments & Savings', spent: 2000, limit: 3000, color: 'purple' },
  { id: 'b-4', name: 'Transport & Auto', spent: 340, limit: 500, color: 'amber' },
  { id: 'b-5', name: 'Entertainment & Leisure', spent: 480, limit: 400, color: 'rose' },
  { id: 'b-6', name: 'Health & Fitness', spent: 250, limit: 300, color: 'cyan' }
];

export const DEMO_NETWORTH: AssetLiabilityItem[] = [
  // Assets
  { id: 'nw-a1', name: 'Brokerage Portfolio (Vanguard)', value: 485000, category: 'Investments', type: 'asset' },
  { id: 'nw-a2', name: 'Primary Residence (Valuation)', value: 620000, category: 'Real Estate', type: 'asset' },
  { id: 'nw-a3', name: 'Chase Checking & Savings', value: 84200, category: 'Cash & Bank', type: 'asset' },
  { id: 'nw-a4', name: 'Crypto Holdings (BTC/ETH)', value: 42300, category: 'Investments', type: 'asset' },
  { id: 'nw-a5', name: 'Tesla Model 3 (Estimated Value)', value: 35000, category: 'Vehicles', type: 'asset' },
  // Liabilities
  { id: 'nw-l1', name: 'Home Mortgage (Fixed 30-year)', value: -380000, category: 'Mortgages', type: 'liability' },
  { id: 'nw-l2', name: 'Student Loan Balance', value: -24500, category: 'Student Loans', type: 'liability' },
  { id: 'nw-l3', name: 'Chase Sapphire Credit Card', value: -3200, category: 'Credit Cards', type: 'liability' },
  { id: 'nw-l4', name: 'Auto Loan Balance', value: -10100, category: 'Auto Loans', type: 'liability' }
];

export const DEMO_HOLDINGS: Holding[] = [
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 520, averagePrice: 385.40, currentPrice: 488.20, value: 253864, gainLoss: 53456, gainLossPercentage: 26.67, assetClass: 'Equity' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', shares: 180, averagePrice: 290.10, currentPrice: 421.90, value: 75942, gainLoss: 23724, gainLossPercentage: 45.43, assetClass: 'Equity' },
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 250, averagePrice: 145.20, currentPrice: 224.30, value: 56075, gainLoss: 19775, gainLossPercentage: 54.48, assetClass: 'Equity' },
  { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', shares: 620, averagePrice: 78.50, currentPrice: 72.80, value: 45136, gainLoss: -3534, gainLossPercentage: -7.26, assetClass: 'Fixed Income' },
  { symbol: 'BTC', name: 'Bitcoin (Coinbase)', shares: 0.45, averagePrice: 32000, currentPrice: 64200, value: 28890, gainLoss: 14490, gainLossPercentage: 100.63, assetClass: 'Crypto' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', shares: 110, averagePrice: 175.80, currentPrice: 228.40, value: 25124, gainLoss: 5786, gainLossPercentage: 29.93, assetClass: 'Commodity' },
  { symbol: 'ETH', name: 'Ethereum (Coinbase)', shares: 4.2, averagePrice: 1850, currentPrice: 3192, value: 13406, gainLoss: 5638, gainLossPercentage: 72.47, assetClass: 'Crypto' }
];

export const DEMO_ANALYTICS = {
  riskMetrics: {
    sharpeRatio: 1.84,
    beta: 0.92,
    volatility: 12.4, // annual stdev %
    maxDrawdown: -14.2 // peak to trough drop %
  },
  correlationMatrix: [
    { asset1: 'VOO', asset2: 'MSFT', value: 0.78 },
    { asset1: 'VOO', asset2: 'AAPL', value: 0.74 },
    { asset1: 'VOO', asset2: 'BND', value: -0.12 },
    { asset1: 'VOO', asset2: 'BTC', value: 0.38 },
    { asset1: 'MSFT', asset2: 'AAPL', value: 0.65 },
    { asset1: 'MSFT', asset2: 'BND', value: -0.08 },
    { asset1: 'MSFT', asset2: 'BTC', value: 0.32 },
    { asset1: 'AAPL', asset2: 'BND', value: -0.05 },
    { asset1: 'AAPL', asset2: 'BTC', value: 0.28 },
    { asset1: 'BND', asset2: 'BTC', value: -0.22 }
  ],
  monthlyReturns: [
    { month: 'Jan', return: 2.4 },
    { month: 'Feb', return: -1.2 },
    { month: 'Mar', return: 4.8 },
    { month: 'Apr', return: 3.1 },
    { month: 'May', return: -0.5 },
    { month: 'Jun', return: 5.2 },
    { month: 'Jul', return: 1.8 },
    { month: 'Aug', return: 2.9 }
  ],
  assetAllocation: [
    { label: 'U.S. Equities (VOO/MSFT/AAPL)', value: 385881, color: '#10b981', percentage: 77.4 },
    { label: 'Bonds (BND)', value: 45136, color: '#3b82f6', percentage: 9.0 },
    { label: 'Crypto (BTC/ETH)', value: 42296, color: '#8b5cf6', percentage: 8.5 },
    { label: 'Gold & Commodities (GLD)', value: 25124, color: '#f59e0b', percentage: 5.1 }
  ]
};

export const DEMO_GOALS: FinancialGoal[] = [
  { id: 'g-1', name: 'Retirement Portfolio Target', targetAmount: 2000000, currentAmount: 485000, targetDate: '2045-12-31', category: 'Retirement' },
  { id: 'g-2', name: 'Emergency Fund (6 Months)', targetAmount: 30000, currentAmount: 30000, targetDate: '2026-06-30', category: 'Safety Net' },
  { id: 'g-3', name: 'New House Downpayment', targetAmount: 150000, currentAmount: 84000, targetDate: '2028-09-30', category: 'Real Estate' },
  { id: 'g-4', name: 'Children\'s Education Fund', targetAmount: 100000, currentAmount: 25000, targetDate: '2035-06-01', category: 'Education' }
];

export const DEMO_INSIGHTS = [
  { id: 'in-1', title: 'High Savings Rate', description: 'Your savings rate of 61.2% is outstanding and puts you on track to reach your House Downpayment goal 6 months ahead of schedule.', type: 'success' },
  { id: 'in-2', title: 'Asset Rebalancing Recommended', description: 'Equity exposure has grown to 77.4% due to strong tech returns, exceeding your target allocation of 70%. Consider locking in gains to buy BND.', type: 'warning' },
  { id: 'in-3', title: 'Subscription Overhead Check', description: 'You have 7 SaaS or streaming subscriptions totalling $184/month. We detected a 15% increase in entertainment expenditure this month.', type: 'info' }
];

export const SUGGESTED_AI_QUESTIONS = [
  "How am I tracking towards my retirement goal?",
  "Is my stock portfolio diversified enough?",
  "Can I afford to purchase a Tesla Model Y next month?",
  "Explain my Sharpe Ratio and portfolio risk levels.",
  "Give me tips on how to lower my monthly food expenditure."
];

export const AI_PRESETS: Record<string, string> = {
  "How am I tracking towards my retirement goal?": 
    "Based on your current holdings ($485,000 in equities/bonds) and monthly contribution rate of approximately $1,500, you are **on track** to hit your $2,000,000 retirement target by 2045. Assuming a conservative 7% annual compounding rate, your portfolio would reach $2,185,000. Tips to accelerate this include auto-escalating your contribution by 5% every year.",
  
  "Is my stock portfolio diversified enough?": 
    "Currently, your portfolio is heavily skewed toward **U.S. Equities** (77.4%), specifically Tech (Microsoft & Apple constitute ~26% of your investment assets). While performance has been stellar, your portfolio Beta is 0.92, showing high sensitivity to tech cycles. I recommend dedicating future contributions to international ETFs (e.g., VXUS) or fixed income to cushion volatility.",
  
  "Can I afford to purchase a Tesla Model Y next month?": 
    "Your checking/savings accounts hold $84,200, and your Emergency Fund goal of $30,000 is fully funded. Buying a $45,000 Tesla Model Y outright leaves $39,200 of liquid cash, which covers your emergency reserve and leaves $9,200 of buffer. Technically **Yes**, you can afford it. However, doing so will delay your New House Downpayment goal by roughly 14 months unless funded through low-interest financing.",
  
  "Explain my Sharpe Ratio and portfolio risk levels.": 
    "Your current Sharpe Ratio is **1.84**, which is considered **excellent**. This indicates you are earning a high excess return per unit of volatility. Your portfolio beta of 0.92 means it is slightly less volatile than the general S&P 500 (1.0). This efficiency is thanks to your core holdings (VOO) mixed with low-correlation assets like Gold (GLD) and Bonds (BND).",
  
  "Give me tips on how to lower my monthly food expenditure.": 
    "This month, you spent $680 on Food & Dining out of a $900 budget. Looking closely at your recent transactions, **Uber Eats premium orders** made up $248 (36%) of that spending. You can save approximately $150 next month by restricting food delivery to once a week and opting for pickup. Grocery spending at Whole Foods ($245) is healthy for your household size."
};
