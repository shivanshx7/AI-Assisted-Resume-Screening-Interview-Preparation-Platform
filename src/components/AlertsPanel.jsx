import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { mockStudents } from '../data/mockData';

export default function AlertsPanel() {
  const atRiskStudents = mockStudents.filter(s => s.atRisk);
  const droppingStudents = mockStudents.filter(s => {
    const hist = s.weeklyHistory;
    return hist[hist.length - 1] < hist[hist.length - 2] && hist[hist.length - 2] < hist[hist.length - 3];
  });

  return (
    <div className="neon-card rounded-2xl p-6 md:p-8 relative">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-8 h-8 bg-red-500/10 border border-red-500/30 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertTriangle size={16} className="text-red-500" />
        </div>
        <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest">Active Alerts</h2>
      </div>
      
      <div className="space-y-3 relative z-10">
        {atRiskStudents.slice(0, 2).map((s, i) => (
          <div key={`risk-${i}`} className="flex items-start gap-4 p-4 bg-[#140b0d] rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors group">
            <AlertTriangle size={16} className="text-red-500 mt-1 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {s.name} <span className="font-medium text-slate-400">CRITICAL</span>
              </p>
              <p className="text-xs font-bold text-red-500 mt-1 uppercase tracking-wide">Score drops to {s.engagementScore}%</p>
            </div>
          </div>
        ))}
        
        {droppingStudents.slice(0, 1).map((s, i) => (
          <div key={`drop-${i}`} className="flex items-start gap-4 p-4 bg-[#141208] rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors group">
            <TrendingDown size={16} className="text-amber-500 mt-1 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {s.name} <span className="font-medium text-slate-400">WARNING</span>
              </p>
              <p className="text-xs font-bold text-amber-500 mt-1 uppercase tracking-wide">Decreased 2 cycles</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
