import React from 'react';
import { FileText, Lock, Upload } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { useFinance } from '../hooks/useFinance';

export const Reports: React.FC = () => {
  const { transactions } = useFinance();
  return <div className="space-y-6"><div><h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Financial Reports</h2><p className="text-xs text-slate-500 dark:text-slate-400">Exports will be generated only from your own records.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Card><span className="text-[10px] uppercase font-bold text-slate-500">Available transactions</span><h3 className="text-3xl font-extrabold">{transactions.length}</h3></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Export status</span><h3 className="text-lg font-extrabold mt-2">Planned</h3></Card><Card><span className="text-[10px] uppercase font-bold text-slate-500">Data source</span><h3 className="text-lg font-extrabold mt-2">User records only</h3></Card></div>
    <Card><EmptyState icon={<FileText className="w-5 h-5" />} title="No reports yet" description="CSV and PDF export will be added after authenticated data storage is connected. Fiscora does not show invented statements or simulate downloads." /></Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Card title="Future exports"><p className="text-xs text-slate-500"><Upload className="inline w-4 h-4 mr-2" />Transaction CSV, monthly summary, and balance-sheet exports are planned.</p></Card><Card title="Privacy"><p className="text-xs text-slate-500"><Lock className="inline w-4 h-4 mr-2" />Exports will be scoped to the authenticated user and generated from RLS-protected records.</p></Card></div>
  </div>;
};
