import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Loader2, Minus, Maximize2, Trash2 } from 'lucide-react';
import { sendMessageToAI } from '../functionalities/aiService';
import { MessageBubble } from './ChatComponents';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm CogniTrack AI. How can I help with your student data today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { role: 'user', content: userMsg, timestamp }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await sendMessageToAI(userMsg, newMessages);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I hit an error: " + err.message, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-[0_8px_32px_rgba(99,102,241,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-[100] group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#050505] rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ease-out ${
      isMinimized ? 'h-14 w-64' : 'h-[500px] w-[380px]'
    }`}>
      <div className="w-full h-full bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Bot size={16} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-none">CogniTrack AI</h3>
              <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Live Now
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
             <button onClick={() => {
                const welcome = messages[0];
                setMessages([welcome, { 
                  role: 'system', 
                  content: 'History cleared', 
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                }]);
             }} title="Clear Chat" className="p-1.5 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                <Trash2 size={14} />
             </button>
             <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
             </button>
             <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                <X size={14} />
             </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {loading && (
                <div className="flex gap-2.5 items-start">
                   <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                   </div>
                   <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tl-sm px-3.5 py-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-white/[0.02]">
              <div className="relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask AI..."
                  className="w-full bg-black border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-500 hover:text-indigo-400 disabled:text-slate-700 transition-colors"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
              <p className="text-[8px] text-slate-700 mt-2 font-mono text-center uppercase tracking-widest">
                Powered by Gemini & Firebase
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
