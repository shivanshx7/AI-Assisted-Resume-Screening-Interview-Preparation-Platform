import React from 'react';

export default function StudentCard({ label, value, subtext, trend, trendLabel, colorClass, isAlert }) {
  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
      isAlert 
        ? 'bg-[#1a0f12] border border-red-500/30 hover:border-red-500/60 shadow-[0_4px_24px_rgba(239,68,68,0.1)]' 
        : 'neon-card neon-card-hover'
    }`}>
      <h3 className="text-xs font-black text-slate-500 mb-4 tracking-widest uppercase">{label}</h3>
      <div className="flex items-baseline gap-3 relative z-10">
        <p className={`text-4xl font-black ${colorClass} tracking-tight`}>{value}</p>
        {trend && (
          <span className={`text-xs font-bold flex items-center px-2 py-0.5 rounded border ${
            trend === 'up' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {trend === 'up' ? '↗' : '↘'} {Math.abs(subtext)}%
          </span>
        )}
      </div>
      {trendLabel && (
        <p className="mt-3 text-[11px] font-medium text-slate-500 opacity-80 uppercase tracking-wider">{trendLabel}</p>
      )}
    </div>
  );
}
