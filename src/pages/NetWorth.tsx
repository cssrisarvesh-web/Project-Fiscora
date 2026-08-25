import React from 'react';
import { Building2, Plus, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { CustomChart } from '../components/ui/CustomChart';
import { useTheme } from '../contexts/ThemeContext';
import { useFinance } from '../hooks/useFinance';
import { formatCurrency } from '../utils/formatters';
import { netWorthTotal } from '../utils/financeCalcs';

export const NetWorth: React.FC = () => {
  const { currency } = useTheme();
  const { netWorthItems } = useFinance();
  const { assets: totalAssets, liabilities: totalLiabilities, netWorth } = netWorthTotal(netWorthItems);
  const assets = netWorthItems.filter((item) => item.type === 'asset');
  const liabilities = netWorthItems.filter((item) => item.type === 'liability');
  const hasItems = netWorthItems.length > 0;
  return <div className="space-y-6">
    <div><h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Net Worth Dashboard</h2><p className="text-xs text-slate-500 dark:text-slate-400">Consolidate your assets and liabilities.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Card className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white border-0 shadow-lg relative overflow-hidden"><span className="text-[10px] uppercase font-bold text-emerald-100">Total net worth</span><h3 className="text-3xl font-extrabold">{formatCurrency(netWorth, currency)}</h3><p className="text-xs text-emerald-100">{hasItems ? 'Assets less liabilities' : 'No balance sheet entries yet'}</p><Building2 className="absolute right-0 bottom-0 w-32 h-32 opacity-10" /></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Gross assets</span><h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">{formatCurrency(totalAssets, currency)}</h3><p className="text-xs text-slate-400">Your recorded assets</p></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Gross liabilities</span><h3 className="text-3xl font-extrabold text-rose-500">{formatCurrency(totalLiabilities, currency)}</h3><p className="text-xs text-slate-400">Your recorded liabilities</p></Card></div>
    <Card title="Net Worth Growth" subtitle="History will appear after snapshots are recorded"><div className="h-64"><CustomChart data={[]} type="area" height={230} currency={currency} /></div></Card>
    {!hasItems ? <Card><EmptyState icon={<Plus className="w-5 h-5" />} title="Your balance sheet is empty" description="Asset and liability entry will be added in Phase D. No values are pre-filled." /></Card> : <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{[['Assets', assets], ['Liabilities', liabilities]].map(([title, items]) => <Card key={String(title)} title={String(title)}><div className="space-y-3">{(items as typeof netWorthItems).map((item) => <div key={item.id} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"><div><p className="text-xs font-bold">{item.name}</p><p className="text-[10px] text-slate-500">{item.category}</p></div><span className={item.type === 'asset' ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{formatCurrency(Math.abs(item.value), currency)}</span></div>)}</div></Card>)}</div>}
    <Card className="bg-slate-50 dark:bg-slate-900"><div className="flex gap-3"><TrendingUp className="w-5 h-5 text-emerald-500" /><p className="text-xs text-slate-500 dark:text-slate-400">Ratios and net-worth trends will be calculated from your recorded balance sheet—never estimated from demo data.</p></div></Card>
  </div>;
};
