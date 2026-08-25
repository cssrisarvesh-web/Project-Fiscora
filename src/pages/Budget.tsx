import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Edit2, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useTheme } from '../contexts/ThemeContext';
import { useFinance } from '../hooks/useFinance';
import { BUDGET_COLORS, TRANSACTION_CATEGORIES } from '../data/referenceData';
import { formatCurrency } from '../utils/formatters';
import { budgetTotals } from '../utils/financeCalcs';
import type { BudgetCategory } from '../types/finance';

export const Budget: React.FC = () => {
  const { currency } = useTheme();
  const { budgets, addBudget, updateBudgetLimit } = useFinance();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetCategory | null>(null);
  const [name, setName] = useState<string>(TRANSACTION_CATEGORIES[2]);
  const [limit, setLimit] = useState('');
  const totals = budgetTotals(budgets);

  const saveBudget = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedLimit = Number(limit);
    if (!Number.isFinite(parsedLimit) || parsedLimit <= 0) return;
    if (selectedBudget) updateBudgetLimit(selectedBudget.id, parsedLimit);
    else addBudget({ name, limit: parsedLimit, spent: 0, color: BUDGET_COLORS[budgets.length % BUDGET_COLORS.length] });
    setLimit(''); setSelectedBudget(null); setIsAdding(false);
  };

  return <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Budget Allocation</h2><p className="text-xs text-slate-500 dark:text-slate-400">Establish and monitor monthly spending boundaries by category.</p></div><Button size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAdding(true)}>Create Budget</Button></div>
    <Card className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white border-0 shadow-lg"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div><span className="text-[10px] uppercase font-bold text-slate-400">Allocated budget</span><h3 className="text-3xl font-extrabold">{formatCurrency(totals.totalLimit, currency)}</h3><p className="text-xs text-slate-400">Across all categories</p></div><div><span className="text-[10px] uppercase font-bold text-slate-400">Spent this month</span><h3 className="text-3xl font-extrabold">{formatCurrency(totals.totalSpent, currency)}</h3><p className="text-xs text-slate-400">Calculated from your entries</p></div><div><span className="text-[10px] uppercase font-bold text-slate-400">Remaining</span><h3 className="text-3xl font-extrabold">{formatCurrency(totals.remaining, currency)}</h3><p className="text-xs text-slate-400">{totals.totalLimit ? `${totals.utilization.toFixed(0)}% utilized` : 'Create a budget to begin'}</p></div></div><div className="mt-6 pt-4 border-t border-slate-800"><ProgressBar value={totals.totalSpent} max={totals.totalLimit} color="emerald" /></div></Card>
    {budgets.length === 0 ? <Card><EmptyState icon={<Plus className="w-5 h-5" />} title="No budgets yet" description="Create a monthly category budget. Spending will be calculated from your own transactions." actionLabel="+ Create Budget" onAction={() => setIsAdding(true)} /></Card> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{budgets.map((budget) => { const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0; const isOver = budget.spent > budget.limit; return <Card key={budget.id} title={budget.name} action={<button onClick={() => { setSelectedBudget(budget); setLimit(String(budget.limit)); setIsAdding(true); }} className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white"><Edit2 className="w-4 h-4" /></button>}><div className="space-y-4"><div className="flex justify-between"><span className="text-lg font-extrabold">{formatCurrency(budget.spent, currency)}</span><span className="text-sm text-slate-500">of {formatCurrency(budget.limit, currency)}</span></div><ProgressBar value={budget.spent} max={budget.limit} color={budget.color as never} showLabel /><div className={`flex items-center gap-1.5 text-xs font-semibold ${isOver ? 'text-rose-500' : 'text-emerald-500'}`}>{isOver ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}{isOver ? 'Limit exceeded' : `${Math.max(0, 100 - percentage).toFixed(0)}% remaining`}</div></div></Card>; })}</div>}
    {isAdding && <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"><form onSubmit={saveBudget} className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"><h3 className="text-base font-bold text-slate-800 dark:text-white">{selectedBudget ? 'Adjust category limit' : 'Create a budget'}</h3>{!selectedBudget && <select value={name} onChange={(event) => setName(event.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm">{TRANSACTION_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select>}<input required min="0.01" step="0.01" type="number" value={limit} onChange={(event) => setLimit(event.target.value)} placeholder={`Monthly limit (${currency})`} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm" /><div className="flex gap-3"><Button type="button" variant="outline" className="flex-1" onClick={() => { setIsAdding(false); setSelectedBudget(null); }}>Cancel</Button><Button type="submit" className="flex-1">Save</Button></div></form></div>}
  </div>;
};
