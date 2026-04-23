import React from 'react';
import { X, Sparkles, Cpu } from 'lucide-react';
import AISuggestions from './AISuggestions';

export default function AISuggestionModal({ student, suggestion, onClose, loading }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#222] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#222] bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">AI Intervention Strategy</h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Subject: Node {student.id} ({student.name})</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-[#1a1a1a] flex items-center justify-center text-slate-500 hover:text-white transition-all border border-transparent hover:border-[#333]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh] scrollbar-hide">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
              <p className="text-slate-400 font-mono text-xs tracking-[0.2em] animate-pulse uppercase">Synthesizing personalized directives...</p>
            </div>
          ) : suggestion ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <AISuggestions 
                title={`Recommendations for ${student.name.split(' ')[0]}`} 
                suggestions={suggestion} 
              />
              <div className="mt-8 flex justify-end gap-3">
                 <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#111] border border-[#222] text-xs font-bold text-slate-400 hover:text-white hover:border-[#444] transition-all uppercase tracking-widest"
                >
                  Close Terminal
                </button>
              </div>
            </div>
          ) : (
             <div className="py-20 text-center">
                <p className="text-red-500 font-bold font-mono text-sm mb-2">CRITICAL_ERROR: NO_DATA_GENERATED</p>
                <p className="text-slate-500 text-xs font-medium">Failed to receive response from AI matrix.</p>
             </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#1a1a1a] bg-[#050505] flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Cpu size={12} className="text-indigo-500" />
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">CogniTrack AI v4.2 // Real-time Intervention Protocol</span>
           </div>
           <div className="text-[9px] font-mono text-slate-700">STATUS: READY</div>
        </div>
      </div>
    </div>
  );
}
