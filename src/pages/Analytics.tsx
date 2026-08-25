import React from 'react';
import { Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { CustomChart } from '../components/ui/CustomChart';
import { useFinance } from '../hooks/useFinance';

export const Analytics: React.FC = () => {
  const { holdings } = useFinance();
  return <div className="space-y-6"><div><h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Portfolio Risk & Analytics</h2><p className="text-xs text-slate-500 dark:text-slate-400">Risk statistics will be calculated from your own holdings and cash flows.</p></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[['Sharpe ratio', 'Requires return history'], ['Volatility', 'Requires return history'], ['Maximum drawdown', 'Requires return history'], ['Diversification', 'Requires holdings']].map(([label, detail]) => <Card key={label}><span className="text-[10px] uppercase font-bold text-slate-500">{label}</span><h3 className="text-3xl font-extrabold mt-1 text-slate-800 dark:text-white">—</h3><p className="text-xs text-slate-400">{detail}</p></Card>)}</div>
    <Card title="Monthly Performance Returns" subtitle="No market-price integration is active"><div className="h-64"><CustomChart data={[]} type="bar" height={230} /></div></Card>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card title="Risk assessment"><EmptyState icon={<ShieldAlert className="w-5 h-5" />} title={holdings.length ? 'Analytics preparation in progress' : 'Add holdings to begin'} description="Phase G will calculate XIRR, volatility, Sharpe ratio, drawdown, correlation, and concentration from authenticated user data." /></Card><Card title="Correlation Matrix"><EmptyState icon={<Activity className="w-5 h-5" />} title="No correlation data yet" description="A matrix requires historical return data. It will remain empty until that data is available." /></Card></div>
    <Card className="bg-slate-50 dark:bg-slate-900"><div className="flex gap-3"><Sparkles className="w-5 h-5 text-emerald-500" /><p className="text-xs text-slate-500">No risk metric or recommendation is fabricated from sample data.</p></div></Card>
  </div>;
};
