import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-white/10 p-4 rounded-xl shadow-2xl shadow-indigo-500/10 text-sm z-50 font-mono">
        <p className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex items-center gap-3 font-medium">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 5px ${entry.color}` }}></span>
              <span className="text-xs">{entry.name}:</span> <span className="font-black text-white ml-auto text-sm">{entry.value}%</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const WeeklyAverageChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAvg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="shadow" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#ec4899" floodOpacity="0.5"/>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="week" stroke="#555" fontSize={10} tickLine={false} axisLine={false} dy={10} fontWeight={600} fontFamily="monospace" />
          <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} dx={-10} fontWeight={600} fontFamily="monospace" />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#333', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Line 
            type="monotone" 
            dataKey="average" 
            name="Avg Engagement" 
            stroke="url(#colorAvg)" 
            strokeWidth={4}
            dot={{ r: 4, strokeWidth: 2, fill: "#000", stroke: "#ec4899" }}
            activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2, fill: "#ec4899" }}
            filter="url(#shadow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SentimentBarChart = ({ data }) => {
  const colors = ['#10b981', '#64748b', '#ef4444'];
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} dy={10} fontWeight={600} fontFamily="monospace" />
          <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} dx={-10} fontWeight={600} fontFamily="monospace" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#111' }} />
          <Bar dataKey="value" name="Percentage" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryPieChart = ({ data }) => {
  const colors = ['#10b981', '#f59e0b', '#ef4444'];
  return (
    <div className="h-64 w-full flex items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
        <span className="text-2xl font-black text-white tracking-tight">100%</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#555] mt-1">Total</span>
      </div>
    </div>
  );
};

export const StudentPerformanceChart = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 5 }} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} dy={10} fontWeight={600} fontFamily="monospace" />
          <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} dx={-10} fontWeight={600} fontFamily="monospace" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#111' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px', fontWeight: 'bold', fontFamily: 'monospace' }} iconType="circle" />
          <Bar dataKey="participation" name="Participation" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={24} />
          <Bar dataKey="quizScore" name="Quiz Score" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
