import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import AISuggestionModal from './AISuggestionModal';
import { generateStudentIntervention } from '../functionalities/aiService';

export default function StudentTable({ students = [], onSelectStudent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'engagementScore', direction: 'desc' });
  const [filter, setFilter] = useState('All');
  const [selectedStudentForAI, setSelectedStudentForAI] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const handleAIAction = async (e, student) => {
    e.stopPropagation(); // Don't trigger onSelectStudent
    setSelectedStudentForAI(student);
    setIsGenerating(true);
    setShowAIModal(true);
    const result = await generateStudentIntervention(student);
    setAiSuggestion(result.text);
    setIsGenerating(false);
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredStudents = sortedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' ? true : student.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown size={14} className="opacity-0 group-hover:opacity-50" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'High': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      case 'Medium': return 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Low': return 'text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
  };

  return (
    <div className="neon-card rounded-2xl overflow-hidden flex flex-col">
      <div className="p-6 md:p-8 border-b border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-[14px] font-black text-slate-300 uppercase tracking-widest">Node Registry</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Query ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#222] rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500/50 text-slate-200 transition-all placeholder-[#555]"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-40 px-3 py-2.5 bg-[#0a0a0a] border border-[#222] rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-500/50 text-slate-200 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="High">Optimal</option>
            <option value="Medium">Nominal</option>
            <option value="Low">Critical</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="bg-[#0f0f0f] border-b border-[#222] text-[10px] font-black uppercase tracking-widest text-slate-500">
              <th className="p-5 cursor-pointer group" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors">NODE <SortIcon columnKey="id" /></div>
              </th>
              <th className="p-5 cursor-pointer group" onClick={() => handleSort('engagementScore')}>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors">ENGAGE LVL <SortIcon columnKey="engagementScore" /></div>
              </th>
              <th className="p-5 cursor-pointer hidden md:table-cell group" onClick={() => handleSort('participation')}>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors">PARTICIPATION <SortIcon columnKey="participation" /></div>
              </th>
              <th className="p-5 cursor-pointer hidden md:table-cell group" onClick={() => handleSort('quizScore')}>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors">EVALUATION <SortIcon columnKey="quizScore" /></div>
              </th>
              <th className="p-5">STATUS</th>
              <th className="p-5 text-right">ALERT</th>
              <th className="p-5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {filteredStudents.map((student) => (
              <tr 
                key={student.id} 
                onClick={() => onSelectStudent(student.id)}
                className={`group cursor-pointer hover:bg-[#1a1a1a] transition-colors ${student.atRisk ? 'bg-red-950/10' : ''}`}
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-[#222] text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 group-hover:text-white transition-colors text-sm">{student.name}</p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">{student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-300 text-sm w-8">{student.engagementScore}%</span>
                    <div className="w-16 h-1 bg-[#222] rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full rounded-full ${student.engagementScore >= 80 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : student.engagementScore >= 50 ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}
                        style={{ width: `${student.engagementScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="p-5 hidden md:table-cell font-mono text-xs text-slate-400">{student.participation}%</td>
                <td className="p-5 hidden md:table-cell font-mono text-xs text-slate-400">{student.quizScore}%</td>
                <td className="p-5">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${getCategoryColor(student.category)} uppercase tracking-wide`}>
                    {student.category}
                  </span>
                </td>
                <td className="p-5 text-right">
                  {student.atRisk ? (
                     <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-red-400 px-2 py-1 rounded border border-red-500/30">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse"></span>
                       CRITICAL
                     </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">STABLE</span>
                  )}
                </td>
                <td className="p-5 text-right">
                   <button 
                    onClick={(e) => handleAIAction(e, student)}
                    className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all group/ai relative"
                    title="Generate AI Strategy"
                   >
                     <Sparkles size={14} />
                     <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-[#0a0a0a] border border-[#222] text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover/ai:opacity-100 transition-opacity pointer-events-none">AI STRATEGY</span>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-mono text-sm">
            NO DATA FOUND.
          </div>
        )}
      </div>

      {showAIModal && (
        <AISuggestionModal 
          student={selectedStudentForAI} 
          suggestion={aiSuggestion} 
          loading={isGenerating} 
          onClose={() => {
            setShowAIModal(false);
            setAiSuggestion(null);
            setSelectedStudentForAI(null);
          }} 
        />
      )}
    </div>
  );
}
