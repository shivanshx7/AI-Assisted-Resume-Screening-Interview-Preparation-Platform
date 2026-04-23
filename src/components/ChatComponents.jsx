import React, { useState, useEffect } from 'react';
import {
  User, CheckCircle, Plus, X, Loader2, FileText, Calendar,
  Users, BookOpen, Download, AlertCircle, Sparkles
} from 'lucide-react';
import { getStudents } from '../data/firebaseService';
import { generateStudentReport, generateClassReport } from '../functionalities/reportGenerator';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../functionalities/firebase';

// ─── Markdown renderer ───────────────────────────────────────────────────────
export const renderMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#1a1a2e;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#a5b4fc">$1</code>')
    .replace(/^#{1,3}\s(.+)$/gm, '<div style="font-weight:800;color:#e2e8f0;margin:8px 0 4px">$1</div>')
    .replace(/^[-•]\s(.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#6366f1;margin-top:2px">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
};

// ─── Message Bubble ──────────────────────────────────────────────────────────
export const MessageBubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  const isSystem = msg.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 font-medium">
          <CheckCircle size={10} />
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start animate-in`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
        isUser ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg'
      }`}>
        {isUser ? <User size={12} className="text-indigo-400" /> : <Sparkles size={12} className="text-white" />}
      </div>
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
        isUser ? 'bg-indigo-600/20 border border-indigo-500/30 text-slate-200 rounded-tr-sm' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-slate-300 rounded-tl-sm'
      }`}>
        {isUser ? <p>{msg.content}</p> : <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />}
        <p className={`text-[9px] mt-1.5 font-mono ${isUser ? 'text-indigo-400/60 text-right' : 'text-slate-600'}`}>{msg.timestamp}</p>
      </div>
    </div>
  );
};

// ─── Add Student Form ────────────────────────────────────────────────────────
export const AddStudentForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: '', id: '', engagementScore: '', participation: '', quizScore: '', category: 'Medium', sentiment: 'Neutral', atRisk: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.id) { setError('Name and ID required.'); return; }
    setSaving(true);
    try {
      const data = { ...form, engagementScore: Number(form.engagementScore), participation: Number(form.participation), quizScore: Number(form.quizScore), weeklyHistory: [Number(form.engagementScore) || 0], sentimentHistory: [form.sentiment], feedback: [], createdAt: new Date().toISOString() };
      await setDoc(doc(db, 'students', form.id.trim()), data);
      onSuccess(`Student added: ${form.name}`);
      onClose();
    } catch (err) { setError(err.message); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2"><Plus size={16} className="text-emerald-400" /> Add Student</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
             <div className="col-span-2 space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name *</span>
               <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Verma" className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500/50 transition-all" required />
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Student ID *</span>
               <input name="id" value={form.id} onChange={handleChange} placeholder="e.g. S105" className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500/50 transition-all" required />
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</span>
               <select name="category" value={form.category} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
                 <option value="High">High (Optimal)</option>
                 <option value="Medium">Medium (Nominal)</option>
                 <option value="Low">Low (Critical)</option>
               </select>
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engagement (0-100)</span>
               <input name="engagementScore" type="number" min="0" max="100" value={form.engagementScore} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500/50 transition-all" />
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Participation %</span>
               <input name="participation" type="number" min="0" max="100" value={form.participation} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500/50 transition-all" />
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quiz Score %</span>
               <input name="quizScore" type="number" min="0" max="100" value={form.quizScore} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-indigo-500/50 transition-all" />
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sentiment</span>
               <select name="sentiment" value={form.sentiment} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
                 <option value="Positive">Positive</option>
                 <option value="Neutral">Neutral</option>
                 <option value="Negative">Negative</option>
               </select>
             </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group py-1">
            <div className={`w-5 h-5 rounded border ${form.atRisk ? 'bg-red-500/20 border-red-500/50' : 'border-white/10'} flex items-center justify-center transition-all`}>
              <input type="checkbox" name="atRisk" checked={form.atRisk} onChange={handleChange} className="opacity-0 absolute" />
              {form.atRisk && <div className="w-2 h-2 rounded-sm bg-red-500" />}
            </div>
            <span className="text-xs text-slate-400 group-hover:text-slate-300">Flag as At-Risk Student</span>
          </label>
          {error && <div className="text-red-400 text-[11px] bg-red-400/10 p-2 rounded-lg border border-red-400/20">{error}</div>}
          <button type="submit" disabled={saving} className="w-full py-2.5 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} /> Save to Firebase</>}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Report Panel ───────────────────────────────────────────────────────────
export const ReportPanel = ({ onClose, onStatus }) => {
  const [mode, setMode] = useState('class');
  const [type, setType] = useState('Weekly');
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getStudents().then(setStudents); }, []);

  const handleGen = async () => {
    setLoading(true);
    try {
      const file = mode === 'class' ? await generateClassReport(type) : await generateStudentReport(selected.id, type);
      onStatus(`Report ready: ${file}`);
      onClose();
    } catch (err) { onStatus(`Error: ${err.message}`); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/5 text-white font-bold text-sm">
          <span className="flex items-center gap-2"><FileText size={16} className="text-indigo-400" /> Generate Report</span>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            {['class', 'student'].map(m => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${mode === m ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'border-white/10 text-slate-500'}`}>{m.toUpperCase()}</button>
            ))}
          </div>
          {mode === 'student' && (
            <select onChange={(e) => setSelected(students.find(s => s.id === e.target.value))} className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
              <option value="">Select Student...</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          )}
          <button onClick={handleGen} disabled={loading || (mode==='student' && !selected)} className="w-full py-2.5 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <><Download size={16} /> Download {type} Report</>}
          </button>
        </div>
      </div>
    </div>
  );
};
