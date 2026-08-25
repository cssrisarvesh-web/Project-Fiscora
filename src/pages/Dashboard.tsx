import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CustomChart } from '../components/ui/CustomChart';
import { EmptyState } from '../components/ui/EmptyState';
import { useTheme } from '../contexts/ThemeContext';
import { useFinance } from '../hooks/useFinance';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { monthlyExpenses, monthlyIncome, netWorthTotal, savingsRate } from '../utils/financeCalcs';
import {
  Lightbulb,
  TrendingUp,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Plus,
} from 'lucide-react';

interface DashboardProps {
  onPageChange: (page: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const { currency } = useTheme();
  const { transactions, budgets, holdings, netWorthItems } = useFinance();

  const income = monthlyIncome(transactions);
  const expenses = monthlyExpenses(transactions);
  const savings = savingsRate(income, expenses);
  const { netWorth } = netWorthTotal(netWorthItems);
  const hasActivity =
    transactions.length > 0 || netWorthItems.length > 0 || holdings.length > 0 || budgets.length > 0;

  const cashflowData =
    income === 0 && expenses === 0
      ? []
      : [{ label: 'This month', value: income, value2: expenses }];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Welcome to Fiscora</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {hasActivity
              ? 'Here is an overview of your financial health today.'
              : 'Your workspace starts empty. Add a transaction, asset, budget, or goal when you are ready.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net Worth</span>
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {formatCurrency(netWorth, currency)}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {netWorthItems.length === 0 ? 'No assets or liabilities yet' : 'Assets minus liabilities'}
            </p>
          </div>
        </Card>

        <Card hoverable>
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monthly Income</span>
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {formatCurrency(income, currency)}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">This calendar month</p>
          </div>
        </Card>

        <Card hoverable>
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monthly Expenses</span>
            <span className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {formatCurrency(expenses, currency)}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">This calendar month</p>
          </div>
        </Card>

        <Card hoverable>
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Savings Rate</span>
            <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {formatPercentage(savings)}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {income === 0 ? 'Add income to calculate savings' : 'Income minus expenses this month'}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Net Worth Growth" subtitle="History appears after snapshots are recorded">
          <div className="mt-2 h-72">
            <CustomChart data={[]} type="area" height={260} currency={currency} />
          </div>
        </Card>

        <Card title="Income vs Expenses" subtitle="Comparison of monthly cash inflows and outflows">
          <div className="mt-2 h-72">
            <CustomChart
              data={cashflowData}
              type="dual-bar"
              height={260}
              currency={currency}
              labels={['Inflow', 'Outflow']}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6 xl:col-span-1">
          <Card
            title="Budget Progress"
            subtitle="Category limits vs actual spend"
            action={
              <button onClick={() => onPageChange('budget')} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center hover:underline">
                View all <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            }
          >
            {budgets.length === 0 ? (
              <EmptyState
                icon={<Plus className="w-5 h-5" />}
                title="No budgets yet"
                description="Create a monthly category budget to track spending against a limit."
                actionLabel="+ Create Budget"
                onAction={() => onPageChange('budget')}
              />
            ) : (
              <div className="space-y-4.5 mt-2">
                {budgets.slice(0, 4).map((budget) => (
                  <div key={budget.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{budget.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {formatCurrency(budget.spent, currency)} /{' '}
                        <span className="font-normal text-slate-400">{formatCurrency(budget.limit, currency)}</span>
                      </span>
                    </div>
                    <ProgressBar value={budget.spent} max={budget.limit} color={budget.color as never} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card
            title="Portfolio Highlights"
            subtitle="Key holdings performance overview"
            action={
              <button onClick={() => onPageChange('portfolio')} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center hover:underline">
                Manage <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            }
          >
            {holdings.length === 0 ? (
              <EmptyState
                icon={<Plus className="w-5 h-5" />}
                title="No investments yet"
                description="Add holdings when you are ready. Live market prices are not connected yet."
                actionLabel="+ Add Investment"
                onAction={() => onPageChange('portfolio')}
              />
            ) : (
              <div className="space-y-3.5 mt-2">
                {holdings.slice(0, 3).map((holding) => {
                  const isGain = holding.gainLoss >= 0;
                  return (
                    <div key={holding.symbol} className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{holding.symbol}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{holding.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {formatCurrency(holding.value, currency)}
                        </span>
                        <p className={`text-[10px] font-semibold ${isGain ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isGain ? '+' : ''}
                          {holding.gainLossPercentage}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="xl:col-span-1">
          <Card
            title="Recent Transactions"
            subtitle="A summary of your latest account transactions"
            action={
              <button onClick={() => onPageChange('transactions')} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center hover:underline">
                Ledger <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            }
          >
            {transactions.length === 0 ? (
              <EmptyState
                icon={<Plus className="w-5 h-5" />}
                title="No transactions yet"
                description="Income and expenses you add will show up here. Nothing is pre-filled."
                actionLabel="+ Add Transaction"
                onAction={() => onPageChange('transactions')}
              />
            ) : (
              <div className="space-y-3.5 mt-2">
                {transactions.slice(0, 6).map((tx) => {
                  const isIncome = tx.type === 'income';
                  return (
                    <div key={tx.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                            isIncome
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {tx.category.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{tx.description}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                            {tx.date} • {tx.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold ${
                            isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {isIncome ? '+' : '-'}
                          {formatCurrency(tx.amount, currency)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="xl:col-span-1">
          <Card
            title="Financial Insights"
            subtitle="Rule-based observations from your own records"
            className="h-full bg-slate-900 border-slate-800 dark:bg-slate-900 text-slate-100 flex flex-col"
          >
            <div className="mt-2 flex-1">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/60 flex gap-3">
                <Lightbulb className="w-5 h-5 flex-shrink-0 text-blue-400" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-200">Waiting for your data</h4>
                    <Badge variant="blue" className="text-[9px] px-1.5 py-0">
                      info
                    </Badge>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                    Insights will use your transactions, budgets, and holdings. They will not invent balances or returns.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPageChange('ai-assistant')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow shadow-emerald-700/20"
            >
              Open assistant (coming later)
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
