import React from 'react';
import { LayoutDashboard, Users, UserPlus, Settings, LogOut, Zap, Bot } from 'lucide-react';

export default function Sidebar({ onLogoClick, onMenuClick, activePage, setActivePage }) {
  const navItem = (page, icon, label, isAI = false) => {
    const active = activePage === page;
    return (
      <button
        onClick={() => { setActivePage(page); onMenuClick(); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
          active
            ? isAI
              ? 'bg-purple-500/10 text-white shadow-[inset_2px_0_0_#a855f7]'
              : 'bg-white/10 text-white shadow-[inset_2px_0_0_#818cf8]'
            : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-slate-200'
        }`}
      >
        <div className={
          active
            ? isAI ? 'text-purple-400' : 'text-indigo-400'
            : 'text-slate-500'
        }>
          {icon}
        </div>
        {label}
        {isAI && (
          <span className="ml-auto text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/25 text-purple-400">
            AI
          </span>
        )}
      </button>
    );
  };

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

        {navItem('Dashboard',     <LayoutDashboard size={18} />, 'Dashboard')}
        {navItem('Nodes',         <Users size={18} />,           'Nodes')}
        {navItem('Interventions', <UserPlus size={18} />,        'Interventions')}

        <div className="pt-3 pb-1">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Intelligence</p>
        </div>

        {navItem('AIAssistant', <Bot size={18} />, 'AI Assistant', true)}

        <div className="pt-3 pb-1">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">System</p>
        </div>

        {navItem('Settings', <Settings size={18} />, 'Settings')}
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

