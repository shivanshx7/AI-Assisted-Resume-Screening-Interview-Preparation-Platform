import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StudentDetails from './pages/StudentDetails';
import StudentTable from './components/StudentTable';
import AlertsPanel from './components/AlertsPanel';
import AISuggestions from './components/AISuggestions';

export default function App() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');

  // Hardcode dark mode globally in this version
  return (
    <div className="dark min-h-screen bg-[#050505] text-slate-200 bg-neon font-sans selection:bg-indigo-500/30">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          onLogoClick={() => { setSelectedStudentId(null); setActivePage('Dashboard'); }} 
          onMenuClick={() => setSelectedStudentId(null)}
        />
        <div className="flex-1 flex flex-col relative w-full h-full overflow-y-auto">
          <Navbar />
          <main className="p-6 md:p-8 lg:p-10 flex-1 max-w-[1600px] mx-auto w-full">
            {selectedStudentId ? (
              <StudentDetails 
                studentId={selectedStudentId} 
                onBack={() => setSelectedStudentId(null)} 
              />
            ) : activePage === 'Dashboard' ? (
              <Dashboard onSelectStudent={setSelectedStudentId} />
            ) : activePage === 'Nodes' ? (
              <div className="space-y-8 animate-in relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
                      Node Directory 
                    </h1>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">All Active Terminals</p>
                  </div>
                </div>
                <StudentTable onSelectStudent={setSelectedStudentId} />
              </div>
            ) : activePage === 'Interventions' ? (
              <div className="space-y-8 animate-in relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
                      Intervention Protocols
                    </h1>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">System Anomalies & Logs</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AlertsPanel />
                  <AISuggestions />
                </div>
              </div>
            ) : activePage === 'Settings' ? (
              <div className="space-y-8 animate-in relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
                      System Settings
                    </h1>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Configuration Management</p>
                  </div>
                </div>
                <div className="neon-card rounded-2xl p-16 text-center text-slate-500 font-mono shadow-inner shadow-black relative overflow-hidden group">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-[50px]"></div>
                   <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 flex items-center justify-center rounded-xl mx-auto mb-6">
                     <span className="text-2xl">🔒</span>
                   </div>
                   <p className="text-lg text-slate-400 font-bold tracking-widest mb-2">ACCESS DENIED</p>
                   <p className="text-xs">Root privileges required to modify core telemetry variables.</p>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
