import React from 'react';

interface ProgressBarProps {
  value: number; // current spent or progress
  max: number; // total limit or target
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'cyan';
  showLabel?: boolean;
  prefix?: string;
  suffix?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'emerald',
  showLabel = false,
  prefix = '',
  suffix = ''
}) => {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
  const isOver = value > max;

  const colorStyles = {
    emerald: "bg-emerald-500 dark:bg-emerald-400",
    blue: "bg-blue-500 dark:bg-blue-400",
    purple: "bg-purple-500 dark:bg-purple-400",
    amber: "bg-amber-500 dark:bg-amber-400",
    rose: "bg-rose-500 dark:bg-rose-400",
    cyan: "bg-cyan-500 dark:bg-cyan-400"
  };

  const progressColor = isOver ? colorStyles.rose : colorStyles[color];

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {prefix}{percentage.toFixed(0)}%{suffix}
          </span>
          {isOver && (
            <span className="text-rose-500 dark:text-rose-400 font-medium">
              Over limit
            </span>
          )}
        </div>
      )}
    </div>
  );
};
