import React, { useEffect, useRef, useState } from 'react';
import { formatCompact } from '../../utils/formatters';

interface DataPoint {
  label: string;
  value: number;
  value2?: number; // Used for dual series (e.g., expenses in Income vs Expenses)
}

interface CustomChartProps {
  data: DataPoint[];
  type: 'line' | 'area' | 'bar' | 'dual-bar';
  height?: number;
  currency?: string;
  labels?: [string, string]; // Labels for legends
}

export const CustomChart: React.FC<CustomChartProps> = ({
  data,
  type,
  height = 300,
  currency = 'USD',
  labels = ['Value 1', 'Value 2']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width || 500);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Extra timeout helper to capture initial animation widths
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (data.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500"
        style={{ height }}
      >
        <p className="text-sm font-semibold">No chart data yet</p>
        <p className="text-xs mt-1">Values will appear after you add records.</p>
      </div>
    );
  }

  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = Math.max(width - paddingLeft - paddingRight, 100);
  const chartHeight = Math.max(height - paddingTop - paddingBottom, 100);

  // Extract all values for bounds calculation
  const allValues: number[] = [];
  data.forEach(d => {
    allValues.push(d.value);
    if (d.value2 !== undefined) allValues.push(d.value2);
  });

  const maxValue = Math.max(...allValues, 10) * 1.15; // 15% padding at top
  const minValue = Math.min(...allValues, 0) < 0 ? Math.min(...allValues, 0) * 1.15 : 0;
  const valRange = maxValue - minValue || 1;

  // Convert data points to SVG coordinates
  const getCoords = (val: number, idx: number) => {
    const divisor = Math.max(data.length - 1, 1);
    const x = paddingLeft + (data.length === 1 ? chartWidth / 2 : (idx / divisor) * chartWidth);
    const y = height - paddingBottom - ((val - minValue) / valRange) * chartHeight;
    return { x, y };
  };

  // Generate gridline values
  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minValue + (valRange / yTicks) * i);

  // Line paths
  let linePath = '';
  let areaPath = '';
  let linePath2 = '';

  if (type === 'line' || type === 'area') {
    // Generate path for Series 1 (value)
    data.forEach((d, i) => {
      const { x, y } = getCoords(d.value, i);
      if (i === 0) {
        linePath = `M ${x} ${y}`;
        areaPath = `M ${x} ${height - paddingBottom} L ${x} ${y}`;
      } else {
        linePath += ` L ${x} ${y}`;
        areaPath += ` L ${x} ${y}`;
      }
      if (i === data.length - 1) {
        areaPath += ` L ${x} ${height - paddingBottom} Z`;
      }
    });

    // Generate path for Series 2 (value2) if present
    if (data[0].value2 !== undefined) {
      data.forEach((d, i) => {
        if (d.value2 === undefined) return;
        const { x, y } = getCoords(d.value2, i);
        if (i === 0) {
          linePath2 = `M ${x} ${y}`;
        } else {
          linePath2 += ` L ${x} ${y}`;
        }
      });
    }
  }

  // Handle bar widths and offsets
  const barCount = data.length;
  const groupWidth = chartWidth / barCount;
  const barPadding = groupWidth * 0.25;

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="chartAreaGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {yTickValues.map((val, i) => {
          const y = height - paddingBottom - ((val - minValue) / valRange) * chartHeight;
          return (
            <g key={`grid-${i}`} className="opacity-40">
              <line 
                x1={paddingLeft} 
                y1={y} 
                x2={width - paddingRight} 
                y2={y} 
                stroke="currentColor" 
                className="text-slate-200 dark:text-slate-800" 
                strokeDasharray="4 4"
              />
              <text 
                x={paddingLeft - 8} 
                y={y + 4} 
                textAnchor="end" 
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-medium"
              >
                {formatCompact(val, currency)}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
          let x = 0;
          if (type === 'line' || type === 'area') {
            x = getCoords(d.value, i).x;
          } else {
            x = paddingLeft + (i * groupWidth) + (groupWidth / 2);
          }
          
          // Limit X axis labels on small screens (show every 2nd on tablet, every 3rd on mobile)
          const skipLabel = width < 480 ? i % 2 !== 0 : width < 640 ? i % 2 !== 0 : false;
          if (skipLabel) return null;

          return (
            <text
              key={`x-label-${i}`}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 dark:fill-slate-500 font-semibold"
            >
              {d.label}
            </text>
          );
        })}

        {/* Area Path */}
        {type === 'area' && (
          <path d={areaPath} fill="url(#chartAreaGrad)" />
        )}

        {/* Line Paths */}
        {(type === 'line' || type === 'area') && (
          <>
            <path 
              d={linePath} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-all duration-300"
            />
            {linePath2 && (
              <path 
                d={linePath2} 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-all duration-300"
              />
            )}
          </>
        )}

        {/* Bar / Dual Bar Charts */}
        {type === 'bar' && data.map((d, i) => {
          const w = groupWidth - barPadding;
          const x = paddingLeft + (i * groupWidth) + (barPadding / 2);
          const yObj = getCoords(d.value, i);
          const barHeight = height - paddingBottom - yObj.y;
          
          return (
            <rect
              key={`bar-${i}`}
              x={x}
              y={yObj.y}
              width={w}
              height={Math.max(barHeight, 2)}
              rx="4"
              className="fill-emerald-500/80 dark:fill-emerald-600/80 hover:fill-emerald-500 dark:hover:fill-emerald-400 transition-colors cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          );
        })}

        {type === 'dual-bar' && data.map((d, i) => {
          const w = (groupWidth - barPadding) / 2;
          const x1 = paddingLeft + (i * groupWidth) + (barPadding / 2);
          const x2 = x1 + w;
          
          const y1Obj = getCoords(d.value, i);
          const barHeight1 = height - paddingBottom - y1Obj.y;

          const y2Obj = d.value2 !== undefined ? getCoords(d.value2, i) : { y: height - paddingBottom };
          const barHeight2 = height - paddingBottom - y2Obj.y;

          return (
            <g key={`dual-bar-group-${i}`}>
              {/* Income Bar */}
              <rect
                x={x1}
                y={y1Obj.y}
                width={w - 1}
                height={Math.max(barHeight1, 2)}
                rx="3"
                className="fill-emerald-500/80 dark:fill-emerald-600/80 hover:fill-emerald-500 dark:hover:fill-emerald-400 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Expense Bar */}
              <rect
                x={x2}
                y={y2Obj.y}
                width={w - 1}
                height={Math.max(barHeight2, 2)}
                rx="3"
                className="fill-rose-500/85 dark:fill-rose-600/85 hover:fill-rose-500 dark:hover:fill-rose-400 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            </g>
          );
        })}

        {/* Hover Guideline & Circles (for line/area charts) */}
        {(type === 'line' || type === 'area') && data.map((d, i) => {
          const { x, y } = getCoords(d.value, i);
          const isHovered = hoveredIdx === i;

          return (
            <g key={`dots-${i}`}>
              {/* Invisible trigger lines for easier hovering */}
              <rect
                x={x - groupWidth / 2}
                y={paddingTop}
                width={groupWidth}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {isHovered && (
                <>
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={height - paddingBottom}
                    stroke="currentColor"
                    className="text-slate-300 dark:text-slate-700"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    className="fill-emerald-500 stroke-white dark:stroke-slate-950"
                    strokeWidth="2"
                  />
                  {d.value2 !== undefined && (
                    <circle
                      cx={x}
                      cy={getCoords(d.value2, i).y}
                      r="6"
                      className="fill-rose-500 stroke-white dark:stroke-slate-950"
                      strokeWidth="2"
                    />
                  )}
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hoveredIdx !== null && (
        <div 
          className="absolute z-10 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg text-xs pointer-events-none transition-all duration-100"
          style={{
            left: `${Math.min(
              Math.max(
                (type === 'line' || type === 'area'
                  ? getCoords(data[hoveredIdx].value, hoveredIdx).x 
                  : paddingLeft + (hoveredIdx * groupWidth) + (groupWidth / 2)) - 60,
                10
              ),
              width - 150
            )}px`,
            top: `${paddingTop + 10}px`
          }}
        >
          <p className="font-semibold text-slate-500 dark:text-slate-400 mb-1">{data[hoveredIdx].label}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-6">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {data[hoveredIdx].value2 !== undefined ? labels[0] : 'Value'}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {formatCompact(data[hoveredIdx].value, currency)}
              </span>
            </div>
            {data[hoveredIdx].value2 !== undefined && (
              <div className="flex justify-between gap-6">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  {labels[1]}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {formatCompact(data[hoveredIdx].value2!, currency)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legends for dual charts */}
      {data[0]?.value2 !== undefined && (
        <div className="flex justify-center gap-6 mt-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-1.5 rounded-full bg-emerald-500"></span>
            {labels[0]}
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-1.5 rounded-full bg-rose-500"></span>
            {labels[1]}
          </div>
        </div>
      )}
    </div>
  );
};
