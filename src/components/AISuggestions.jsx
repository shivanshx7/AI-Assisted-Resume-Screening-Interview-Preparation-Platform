import React from 'react';
import { Cpu, Terminal, Zap } from 'lucide-react';

export default function AISuggestions() {
  const suggestions = [
    {
      icon: <Terminal size={14} />,
      title: 'Optimize participation',
      desc: 'Execute breakout protocol for passive nodes.',
      color: 'text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]',
    },
    {
      icon: <Cpu size={14} />,
      title: 'Resolve feedback anomalies',
      desc: 'Deploy anonymous ping to gauge node confusion.',
      color: 'text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    },
    {
      icon: <Zap size={14} />,
      title: 'Boost quiz throughput',
      desc: 'Inject practice sequence prior to primary eval.',
      color: 'text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    }
  ];

  return (
    <div className="neon-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Cpu size={16} className="text-indigo-400" />
        </div>
        <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest">AI Directives</h2>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <div key={i} className="flex gap-4 items-start p-3.5 rounded-xl bg-[#141414] border border-[#222] hover:border-indigo-500/20 transition-all cursor-crosshair group">
            <div className={`p-2 rounded bg-black border ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">{s.title}</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
