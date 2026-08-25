import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow active:bg-emerald-700",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600",
    outline: "border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 active:bg-slate-100 dark:active:bg-slate-800",
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
