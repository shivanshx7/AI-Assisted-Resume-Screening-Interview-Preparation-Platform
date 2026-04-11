import React from 'react';
import { LayoutDashboard, Users, UserPlus, Settings, LogOut, Zap } from 'lucide-react';

export default function Sidebar({ onLogoClick, onMenuClick, activePage, setActivePage }) {
  return (
    <div className="w-64 hidden md:flex flex-col bg-[#0a0a0a] border-r border-[#222] shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-40 relative">
      <div 
        className="px-6 py-8 flex items-center gap-3 cursor-pointer group"
        onClick={onLogoClick}
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
          <Zap size={20} className="text-black fill-black" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-white">
          Cogni<span className="text-indigo-400">Track</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5 mt-2">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Analytics</p>
        
        <button
          onClick={() => { setActivePage('Dashboard'); onMenuClick(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
            activePage === 'Dashboard' 
              ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]' 
              : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-slate-200'
          }`}
        >
          <div className={`${activePage === 'Dashboard' ? 'text-indigo-400' : 'text-slate-500'}`}>
             <LayoutDashboard size={18} />
          </div>
          Dashboard
        </button>

        <button
          onClick={() => { setActivePage('Nodes'); onMenuClick(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
            activePage === 'Nodes' 
              ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]' 
              : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-slate-200'
          }`}
        >
          <div className={`${activePage === 'Nodes' ? 'text-indigo-400' : 'text-slate-500'}`}>
             <Users size={18} />
          </div>
          Nodes
        </button>

        <button
          onClick={() => { setActivePage('Interventions'); onMenuClick(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
            activePage === 'Interventions' 
              ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]' 
              : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-slate-200'
          }`}
        >
          <div className={`${activePage === 'Interventions' ? 'text-indigo-400' : 'text-slate-500'}`}>
             <UserPlus size={18} />
          </div>
          Interventions
        </button>

        <button
          onClick={() => { setActivePage('Settings'); onMenuClick(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
            activePage === 'Settings' 
              ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]' 
              : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-slate-200'
          }`}
        >
          <div className={`${activePage === 'Settings' ? 'text-indigo-400' : 'text-slate-500'}`}>
             <Settings size={18} />
          </div>
          Settings
        </button>

      </nav>

      <div className="p-4 border-t border-[#222]">
        <button 
          onClick={() => alert('Session termination protocol initiated. (Mock Logout)')}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500/80 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
