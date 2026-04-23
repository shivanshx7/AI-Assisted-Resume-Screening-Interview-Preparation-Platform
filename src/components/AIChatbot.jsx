import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Download, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { sendMessageToAI } from '../functionalities/aiService';
import { getStudents } from '../data/firebaseService';
import { MessageBubble, AddStudentForm, ReportPanel } from './ChatComponents';

const QUICK_PROMPTS = [
  "Who are the at-risk students?",
  "Give me a class performance summary",
  "Which students need immediate attention?",
  "Compare top vs bottom performers",
  "What is the average engagement score?",
  "Suggest interventions for low performers",
];

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "**Hello! I'm CogniTrack AI 🤖**\n\nI have access to your Firebase student database in real-time. Ask me anything about student performance, engagement trends, at-risk alerts, or request a PDF report.\n\n**I can help you:**\n- Analyze individual student data\n- Summarize class performance\n- Identify at-risk students\n- Add new students to Firebase\n- Generate Weekly or Monthly PDF reports",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showReportPanel, setShowReportPanel] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    getStudents().then((s) => setStudentCount(s.length));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const addMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      { role, content, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleSend = async (text = input.trim()) => {
    if (!text || loading) return;
    setInput('');
    addMessage('user', text);
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const result = await sendMessageToAI(text, [...history, { role: 'user', content: text }]);
      addMessage('assistant', result.text);
    } catch (err) {
      addMessage('assistant', `❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-120px)] animate-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
            AI Assistant
            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-pulse block" />
          </h1>
          <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">
            Firebase-Powered Chat · {studentCount} Students Loaded
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowAddStudent(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all">
            <Plus size={14} /> Add Student
          </button>
          <button onClick={() => setShowReportPanel(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition-all">
            <Download size={14} /> Generate Report
          </button>
          <button onClick={() => {
            setMessages(prev => [prev[0]]);
            addMessage('system', 'Conversation history cleared.');
          }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#2a2a2a] text-slate-500 text-xs font-medium hover:border-[#444] hover:text-slate-300 transition-all">
            <Trash2 size={13} /> Clear
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col neon-card rounded-2xl overflow-hidden min-h-0">
        <div className="px-5 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center gap-3 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">CogniTrack AI · Live Firebase Context</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && (
            <div className="flex gap-3 items-start animate-in">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-[#111] border border-[#222] rounded-2xl rounded-tl-sm px-5 py-4">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-5 py-3 border-t border-[#1a1a1a] bg-[#0a0a0a] shrink-0 overflow-x-auto scrollbar-hide flex gap-2">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button key={i} onClick={() => handleSend(prompt)}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-[#111] border border-[#2a2a2a] text-[11px] text-slate-400 hover:border-indigo-500/40 hover:text-indigo-400 transition-all whitespace-nowrap font-medium">
                {prompt}
              </button>
            ))}
        </div>

        <div className="px-5 py-4 border-t border-[#1a1a1a] bg-[#080808] shrink-0 flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask about students, request a report..."
              rows={1}
              className="flex-1 bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              style={{ maxHeight: '120px' }}
            />
            <button onClick={() => handleSend()} disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:bg-[#1a1a1a] flex items-center justify-center transition-all shadow-lg shrink-0">
              {loading ? <Loader2 size={16} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
            </button>
        </div>
      </div>

      {showAddStudent && <AddStudentForm onClose={() => setShowAddStudent(false)} onSuccess={(m) => { addMessage('system', m); getStudents().then(s => setStudentCount(s.length)); }} />}
      {showReportPanel && <ReportPanel onClose={() => setShowReportPanel(false)} onStatus={(m) => addMessage('system', m)} />}
    </div>
  );
}
