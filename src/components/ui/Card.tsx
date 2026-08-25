import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'glass' | 'borderless';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  action,
  variant = 'default',
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseStyle = "rounded-2xl transition-all duration-200";
  
  const variants = {
    default: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm",
    glass: "glass-panel shadow-sm",
    borderless: "bg-transparent"
  };

  const hoverStyle = hoverable 
    ? "hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700/80 hover:-translate-y-0.5" 
    : "";

  return (
    <div 
      className={`${baseStyle} ${variants[variant]} ${hoverStyle} p-6 ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4 gap-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
