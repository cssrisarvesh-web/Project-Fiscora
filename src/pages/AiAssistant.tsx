import React from 'react';
import { AlertCircle, Bot, Database, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const AiAssistant: React.FC = () => <div className="max-w-5xl mx-auto space-y-4">
  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400"><AlertCircle className="w-4 h-4" /><span><strong>Coming later:</strong> the assistant is intentionally unavailable until it can be grounded in authenticated, user-owned data.</span></div>
  <Card className="min-h-[28rem] flex flex-col items-center justify-center text-center"><div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500"><Sparkles className="w-8 h-8" /></div><h2 className="mt-4 text-lg font-bold">Fiscora Assistant</h2><p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400">Future answers will use deterministic calculations and only the signed-in user’s Supabase data. No demo ledger, generated balances, or external AI key is used today.</p><div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"><div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"><Database className="inline w-4 h-4 mr-2 text-emerald-500" />Authenticated data grounding</div><div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"><Bot className="inline w-4 h-4 mr-2 text-emerald-500" />No AI API configured</div></div></Card>
</div>;
