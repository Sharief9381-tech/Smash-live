"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { BarChart3, Activity, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Analytics = () => {
  const [stats, setStats] = useState({
    athletes: 0,
    tourneys: 0,
    participants: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: athletesCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: tourneysCount } = await supabase.from('tournaments').select('*', { count: 'exact', head: true });
        const { count: participantsCount } = await supabase.from('participants').select('*', { count: 'exact', head: true });
        
        setStats({
          athletes: athletesCount || 0,
          tourneys: tourneysCount || 0,
          participants: participantsCount || 0
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-sky-500" />
            <span className="text-xs font-black text-sky-600 uppercase tracking-[0.3em]">Cloud Operational Intel</span>
          </div>
          <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Circuit Pulse</h1>
          <p className="text-slate-500 font-medium">Live synchronization status of the SmashLive global database.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 flex justify-center py-20">
               <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
            </div>
          ) : (
            <>
              {[
                { label: "Active Athletes", val: stats.athletes, icon: Activity },
                { label: "Total Registrations", val: stats.participants, icon: Zap },
                { label: "Live Circuits", val: stats.tourneys, icon: ShieldCheck },
              ].map((kpi, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-8 rounded-[2.5rem] space-y-4 bg-white border-slate-200 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A]">
                    <kpi.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                    <h3 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">{kpi.val}</h3>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>

        <div className="py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <Activity className="h-12 w-12 text-slate-200 mx-auto mb-6" />
          <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">System Ready</h3>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2 italic">Database synchronization successful. Awaiting biomechanical match data.</p>
        </div>
      </main>
    </div>
  );
};

export default Analytics;