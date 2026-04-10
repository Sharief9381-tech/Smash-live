"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';

const performanceData = [
  { name: 'Jan', performance: 85, points: 2100 },
  { name: 'Feb', performance: 88, points: 2250 },
  { name: 'Mar', performance: 82, points: 2050 },
  { name: 'Apr', performance: 94, points: 2400 },
  { name: 'May', performance: 90, points: 2300 },
  { name: 'Jun', performance: 98, points: 2600 },
];

const h2hData = [
  { player: 'Axelsen', value: 88, color: '#b6ff2a' },
  { player: 'Opponents', value: 12, color: '#00f2ff' },
];

const AnalyticsSection = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Performance Trend */}
      <div className="lg:col-span-8 glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-[#b6ff2a]" /> Performance Trajectory
            </h3>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">Monthly points vs win efficiency</p>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b6ff2a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b6ff2a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} fontWeight="black" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="performance" stroke="#b6ff2a" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
              <Area type="monotone" dataKey="points" stroke="#00f2ff" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPoints)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Head-to-Head & Distribution */}
      <div className="lg:col-span-4 space-y-8">
        <div className="glass-card p-8 rounded-[3rem] border-white/5 flex flex-col items-center text-center space-y-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-[#00f2ff]" /> Tournament Win Share
          </h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={h2hData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {h2hData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase">
               <div className="h-2 w-2 rounded-full bg-[#b6ff2a]" /> Career Wins
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase">
               <div className="h-2 w-2 rounded-full bg-[#00f2ff]" /> Career Losses
             </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[3rem] border-white/5 space-y-6">
           <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#b6ff2a]" /> Points per Match
          </h3>
          <div className="space-y-4">
             {[
               { label: "Set 1 Avg", val: 21.4, color: "bg-[#b6ff2a]" },
               { label: "Set 2 Avg", val: 19.8, color: "bg-[#00f2ff]" },
               { label: "Final Set Avg", val: 21.1, color: "bg-white/20" },
             ].map((s, i) => (
               <div key={i} className="space-y-1.5">
                 <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
                    <span>{s.label}</span>
                    <span className="text-white">{s.val}</span>
                 </div>
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${(s.val/25)*100}%` }} />
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;