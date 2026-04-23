import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StudentDetails from './pages/StudentDetails';
import StudentTable from './components/StudentTable';
import AlertsPanel from './components/AlertsPanel';
import AISuggestions from './components/AISuggestions';
import SeedButton from './components/SeedButton';
import AIChatbot from './components/AIChatbot';
import ChatPopup from './components/ChatPopup';
import { uploadTestData } from './functionalities/testUpload';
import { syncGoogleSheets } from './functionalities/googleSheetsSync';
import { getStudents } from './data/firebaseService';

export default function App() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');
  const [testStatus, setTestStatus] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Run the Google Sheets sync automatically on load
    syncGoogleSheets();

    // Poll for changes every 30 seconds
    const interval = setInterval(() => {
      syncGoogleSheets();
    }, 30000);

    // Listen for sync completion to refresh UI
    const handleSync = () => {
      console.log("Sync event received in App, refreshing data...");
      fetchData();
    };
    window.addEventListener('googleSheetsSynced', handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener('googleSheetsSynced', handleSync);
    };
  }, []);

  const handleTestUpload = async () => {
    setTestStatus('testing');
    const result = await uploadTestData();
    setTestStatus(result.success ? 'success' : 'error');
    if (result.success) {
      alert(result.message);
    } else {
      alert("Error: " + result.message);
    }
  };

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
        <div className={`flex-1 flex flex-col relative w-full h-full ${activePage === 'AIAssistant' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          <Navbar />
          <main className="p-6 md:p-8 lg:p-10 flex-1 max-w-[1600px] mx-auto w-full">
            {selectedStudentId ? (
              <StudentDetails 
                studentId={selectedStudentId} 
                onBack={() => setSelectedStudentId(null)} 
              />
            ) : activePage === 'Dashboard' ? (
              <Dashboard onSelectStudent={setSelectedStudentId} students={students} loading={loading} />
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
                {loading ? (
                   <div className="h-[40vh] flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-mono text-[9px] tracking-widest uppercase animate-pulse">Accessing Node Directory...</p>
                  </div>
                ) : (
                  <StudentTable students={students} onSelectStudent={setSelectedStudentId} />
                )}
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
                {loading ? (
                   <div className="h-[40vh] flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-mono text-[9px] tracking-widest uppercase animate-pulse">Scanning Protocols...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AlertsPanel students={students} />
                    <AISuggestions />
                  </div>
                )}
              </div>
            ) : activePage === 'AIAssistant' ? (
              <AIChatbot />
            ) : activePage === 'Settings' ? (
              <div className="space-y-8 animate-in relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
                      System Management
                    </h1>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Database Initialization</p>
                  </div>
                </div>
                <div className="neon-card rounded-2xl p-16 text-center text-slate-500 font-mono shadow-inner shadow-black relative overflow-hidden group">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[50px]"></div>
                   
                   <div className="flex flex-col items-center gap-12">
                     <div className="space-y-4">
                       <h3 className="text-white font-bold text-sm tracking-widest uppercase">Full System Seed</h3>
                       <SeedButton />
                     </div>

                     <div className="w-full h-px bg-[#222]"></div>

                     <div className="space-y-4">
                       <h3 className="text-white font-bold text-sm tracking-widest uppercase">Single Node Test</h3>
                       <button
                         onClick={handleTestUpload}
                         disabled={testStatus === 'testing'}
                         className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl font-bold font-mono hover:bg-amber-500/20 transition-all text-xs"
                       >
                         {testStatus === 'testing' ? 'UPLOADING...' : 'RUN SINGLE UPLOAD TEST (PRIYA PATEL)'}
                       </button>
                       <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                         Runs the snippet you provided to upload student S102 to Firestore.
                       </p>
                     </div>
                   </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
        <ChatPopup />
      </div>
    </div>
  );
}

