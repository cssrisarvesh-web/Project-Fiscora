import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'slate' | 'cyan';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'slate', 
  className = '', 
  ...props 
}) => {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/20",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20",
    slate: "bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800",
    cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-500/20"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
