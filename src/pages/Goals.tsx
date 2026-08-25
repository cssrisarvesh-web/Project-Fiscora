import React from 'react';
import { Calendar, Coins, Plus, Target } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useTheme } from '../contexts/ThemeContext';
import { useFinance } from '../hooks/useFinance';
import { formatCurrency } from '../utils/formatters';

export const Goals: React.FC = () => {
  const { currency } = useTheme(); const { goals } = useFinance();
  const target = goals.reduce((sum, goal) => sum + goal.targetAmount, 0); const funded = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  return <div className="space-y-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Financial Goals</h2><p className="text-xs text-slate-500 dark:text-slate-400">Set and track the milestones that matter to you.</p></div><Button size="sm" icon={<Plus className="w-4 h-4" />} disabled title="Goal entry is planned for Phase D">Create Goal</Button></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Card><span className="text-[10px] uppercase font-bold text-slate-500">Total targets</span><h3 className="text-3xl font-extrabold">{formatCurrency(target, currency)}</h3></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Funded</span><h3 className="text-3xl font-extrabold">{formatCurrency(funded, currency)}</h3></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Funding gap</span><h3 className="text-3xl font-extrabold">{formatCurrency(Math.max(0, target - funded), currency)}</h3></Card></div>
    {goals.length === 0 ? <Card><EmptyState icon={<Target className="w-5 h-5" />} title="No financial goals yet" description="Create a goal when you are ready. Fiscora will never pre-fill goals or progress." /></Card> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{goals.map((goal) => { const percentage = goal.targetAmount ? goal.currentAmount / goal.targetAmount * 100 : 0; return <Card key={goal.id} title={goal.name} action={<Badge variant="blue">{goal.category}</Badge>}><div className="space-y-4"><div className="flex justify-between text-xs"><span>Progress</span><span>{percentage.toFixed(0)}%</span></div><ProgressBar value={goal.currentAmount} max={goal.targetAmount} color="blue" /><div className="grid grid-cols-2 gap-3 text-xs"><span><Coins className="inline w-3 h-3" /> {formatCurrency(goal.currentAmount, currency)} funded</span><span className="text-right"><Target className="inline w-3 h-3" /> {formatCurrency(goal.targetAmount, currency)} target</span></div><p className="text-xs text-slate-500"><Calendar className="inline w-3 h-3" /> Target: {goal.targetDate}</p></div></Card>; })}</div>}
  </div>;
};
