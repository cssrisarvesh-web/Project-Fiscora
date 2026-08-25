import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';
import { useFinance } from '../hooks/useFinance';
import { TRANSACTION_CATEGORIES } from '../data/referenceData';
import { EmptyState } from '../components/ui/EmptyState';
import { Plus, Search, Calendar } from 'lucide-react';

export const Transactions: React.FC = () => {
  const { currency } = useTheme();
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Transaction Form State Mock
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'income' | 'expense'>('expense');
  const [newCategory, setNewCategory] = useState<string>(TRANSACTION_CATEGORIES[2]);
  const { transactions, addTransaction } = useFinance();

  // List of all unique categories for filter dropdown
  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))];

  // Filter logic
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' ? true : tx.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' ? true : tx.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Handle mock insert
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      description: newDesc,
      category: newCategory,
      type: newType,
      amount: parseFloat(newAmount),
      status: 'completed',
    });
    
    // reset form
    setNewDesc('');
    setNewAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Transaction Ledger</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track and filter all account inflows and outflows.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4.5 h-4.5" />} onClick={() => setIsModalOpen(true)}>
          Add Transaction
        </Button>
      </div>

      {/* Filter and Search Bar Card */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-700 dark:text-slate-300"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-3">
            {/* Type selector */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="income">Inflow (Income)</option>
              <option value="expense">Outflow (Expenses)</option>
            </select>

            {/* Category selector */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:border-emerald-500 capitalize"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Transaction List Card */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      icon={<Plus className="w-5 h-5" />}
                      title="No transactions yet"
                      description="A new account starts with an empty ledger. Add income or expenses, or import a statement later."
                      actionLabel="+ Add Transaction"
                      onAction={() => setIsModalOpen(true)}
                    />
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.type === 'income';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 opacity-80" />
                          {tx.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                        {tx.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={isIncome ? 'emerald' : 'slate'} className="capitalize">
                          {tx.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={tx.status === 'completed' ? 'emerald' : 'amber'} className="capitalize">
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold whitespace-nowrap">
                        <span className={isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}>
                          {isIncome ? '+' : '-'}{formatCurrency(tx.amount, currency)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 dark:text-slate-500 font-semibold">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mock Add Transaction Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-1">Add Transaction</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Record an income or expense. This stays on this device until accounts are connected.</p>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Type Select */}
              <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-xl">
                <button
                  type="button"
                  onClick={() => setNewType('expense')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    newType === 'expense' 
                      ? 'bg-white dark:bg-slate-850 shadow-sm text-slate-850 dark:text-white' 
                      : 'text-slate-500'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('income')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    newType === 'income' 
                      ? 'bg-emerald-600 shadow-sm text-white' 
                      : 'text-slate-500'
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Trader Joe's Grocery"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 text-slate-700 dark:text-slate-300"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Amount ({currency})</label>
                <input 
                  type="number" 
                  required
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 text-slate-700 dark:text-slate-300"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/80 text-slate-700 dark:text-slate-300"
                >
                  {TRANSACTION_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3.5 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                >
                  Add Entry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
