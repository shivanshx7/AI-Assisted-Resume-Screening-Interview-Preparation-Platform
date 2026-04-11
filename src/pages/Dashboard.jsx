import React from 'react';
import StudentCard from '../components/StudentCard';
import { WeeklyAverageChart, CategoryPieChart, SentimentBarChart } from '../components/Charts';
import StudentTable from '../components/StudentTable';
import AlertsPanel from '../components/AlertsPanel';
import AISuggestions from '../components/AISuggestions';
import { classAverageTrends, categoryDistribution, sentimentDistribution, mockStudents } from '../data/mockData';

export default function Dashboard({ onSelectStudent }) {
  const avgEngagement = Math.round(mockStudents.reduce((acc, curr) => acc + curr.engagementScore, 0) / mockStudents.length);
  const atRiskCount = mockStudents.filter(s => s.atRisk).length;
  
  return (
    <div className="space-y-8 animate-in relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-1 flex items-center gap-3">
            System Overview 
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse block"></span>
          </h1>
          <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">CS101 Active Matrix</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StudentCard 
          label="Avg Engagement" 
          value={`${avgEngagement}%`} 
          subtext={2.4} 
          trend="up" 
          trendLabel="vs last cycle"
          colorClass="text-indigo-400 text-glow"
        />
        <StudentCard 
          label="Active Terminals" 
          value={mockStudents.length} 
          colorClass="text-slate-100"
        />
        <StudentCard 
          label="Optimal Performance" 
          value={`${Math.round((categoryDistribution.find(c => c.name === 'High').value / mockStudents.length) * 100)}%`} 
          subtext={5} 
          trend="up"
          colorClass="text-emerald-400 text-glow"
        />
        <StudentCard 
          label="Critical Alerts" 
          value={atRiskCount} 
          subtext={-1} 
          trend="down"
          colorClass="text-red-500 text-glow"
          isAlert={atRiskCount > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="neon-card rounded-2xl p-6 md:p-8">
            <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest mb-6">Engagement Trajectory</h2>
            <WeeklyAverageChart data={classAverageTrends} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="neon-card rounded-2xl p-6 md:p-8">
              <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest mb-6">Status Matrix</h2>
              <CategoryPieChart data={categoryDistribution} />
            </div>
            <div className="neon-card rounded-2xl p-6 md:p-8">
              <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest mb-6">Sentiment Analysis</h2>
              <SentimentBarChart data={sentimentDistribution} />
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-8">
          <AlertsPanel />
          <AISuggestions />
        </div>
      </div>

      <div className="mt-8">
        <StudentTable onSelectStudent={onSelectStudent} />
      </div>
    </div>
  );
}
