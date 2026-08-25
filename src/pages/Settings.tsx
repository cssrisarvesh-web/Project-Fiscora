import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTheme, Currency } from '../contexts/ThemeContext';
import { User, Shield, Bell, Eye, CheckCircle2 } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, currency, setCurrency } = useTheme();
  
  // Profile Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  // Notification States
  const [notifyBudget, setNotifyBudget] = useState(true);
  const [notifyNetWorth, setNotifyNetWorth] = useState(true);
  const [notifyGoals, setNotifyGoals] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-20 right-4 md:right-8 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 text-xs font-bold animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manage your personal profile, notification thresholds, and global application currencies.</p>
        </div>
      </div>

      {/* Profile Section */}
      <Card title="User Profile Details" subtitle="Update your account information">
        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div className="flex items-center gap-4.5 pb-4 border-b border-slate-100 dark:border-slate-850">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-100 to-emerald-200 dark:from-emerald-900/60 dark:to-emerald-800/60 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold text-lg border border-emerald-300/20 shadow-sm">
              JD
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-850 dark:text-white">{name}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-450 font-semibold">{email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 text-slate-700 dark:text-slate-350"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 text-slate-700 dark:text-slate-350"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Account Details
            </Button>
          </div>
        </form>
      </Card>

      {/* Preferences Section: Theme and Currency */}
      <Card title="App Customization Preferences" subtitle="Configure base currencies and color appearance themes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Base Currency Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Default Currency</label>
            <p className="text-[11px] text-slate-400 font-medium">Applies to all ledger balance sheets, assets valuations, and portfolio calculations.</p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-700 dark:text-slate-350 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="USD">United States Dollar ($ USD)</option>
              <option value="EUR">Euro (€ EUR)</option>
              <option value="INR">Indian Rupee (₹ INR)</option>
              <option value="GBP">British Pound (£ GBP)</option>
            </select>
          </div>

          {/* Theme selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Interface Mode</label>
            <p className="text-[11px] text-slate-400 font-medium">Switch appearance theme modes. Stored locally on the user's browser settings.</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`flex-1 py-2 text-xs font-bold border rounded-xl transition-all ${
                  theme === 'light' 
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-600 dark:bg-emerald-950/20' 
                    : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-500'
                }`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => theme === 'light' && toggleTheme()}
                className={`flex-1 py-2 text-xs font-bold border rounded-xl transition-all ${
                  theme === 'dark' 
                    ? 'border-emerald-500 bg-slate-900 text-white' 
                    : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-500'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card title="Alerts & Notifications" subtitle="Configure trigger events to push reminders">
        <div className="space-y-4 pt-2">
          {/* Item 1 */}
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifyBudget}
              onChange={(e) => setNotifyBudget(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
            />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-slate-400" />
                Budget Exceeded Alert
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Notify me immediately when spending in any category breaches 85% of its threshold.</p>
            </div>
          </label>

          {/* Item 2 */}
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifyNetWorth}
              onChange={(e) => setNotifyNetWorth(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
            />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Quarterly Asset Evaluation Summary
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Deliver monthly reports profiling net worth increases and changes in liability solvency.</p>
            </div>
          </label>

          {/* Item 3 */}
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifyGoals}
              onChange={(e) => setNotifyGoals(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
            />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Goal Milestone Achievements
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Send celebratory triggers and recalculate dates when goals cross critical funding markers (50%, 75%).</p>
            </div>
          </label>
        </div>
      </Card>

      {/* Data and Privacy Section */}
      <Card title="Data Safety & Control panel" subtitle="Back up, export, or scrub account logs">
        <div className="space-y-3.5 pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Account data storage and export are not connected yet. In the current local prototype, finance records are temporary and are not presented as synced or encrypted account data.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-850">
            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
              Download Data Ledger
            </Button>
            <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 font-bold">
              Scrub Sandboxed Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
