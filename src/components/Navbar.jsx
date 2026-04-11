import React from 'react';
import { Bell, Search, Hexagon } from 'lucide-react';
import { mockStudents } from '../data/mockData';

export default function Navbar() {
  const atRiskCount = mockStudents.filter(s => s.atRisk).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 bg-[#050505]/80 backdrop-blur-xl border-b border-[#222]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">System Online • Session Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 text-slate-400 hover:text-indigo-400 bg-[#111] hover:bg-[#1a1a1a] border border-[#333] rounded-xl transition-all">
          <Bell size={18} />
          {atRiskCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-[#111] shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse"></span>
          )}
        </button>

        <div className="h-10 w-10 rounded-xl bg-[#111] border border-[#333] flex items-center justify-center text-indigo-400 hover:border-indigo-500/50 cursor-pointer transition-colors shadow-inner">
            <Hexagon size={20} className="fill-indigo-500/20" />
        </div>
      </div>
    </header>
  );
}
