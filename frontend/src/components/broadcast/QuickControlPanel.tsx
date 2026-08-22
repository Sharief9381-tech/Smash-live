import React from 'react';
import { Play, Pause, Square, Zap, Bell, RefreshCw, Trophy, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const QuickControlPanel = () => {
  return (
    <div className="glass-panel p-8 rounded-[3rem] border-slate-200 space-y-8 bg-[#0B1F3A]/5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-[0.2em]">Master Control Panel</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase">Live Buffer Active</span>
        </div>
      </div>

      {/* Initialization Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
          <Target className="h-5 w-5 text-sky-500" />
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-[#0B1F3A]">124</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Matches Initialized</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-[#0B1F3A]">12</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tourneys Initialized</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          onClick={() => showSuccess("Broadcast Stream Initialized")}
          className="h-20 rounded-2xl border-slate-200 bg-white hover:bg-sky-50 flex flex-col gap-2 group"
        >
          <Play className="h-5 w-5 text-green-500 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">Start Stream</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 flex flex-col gap-2"
        >
          <Pause className="h-5 w-5 text-amber-500 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">Pause Stream</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 flex flex-col gap-2"
        >
          <RefreshCw className="h-5 w-5 text-sky-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">Resume</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 rounded-2xl border-slate-200 bg-white hover:bg-red-50 flex flex-col gap-2"
        >
          <Square className="h-5 w-5 text-red-500 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-widest">End Session</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-4">
        <Button className="h-14 rounded-xl bg-[#0B1F3A] text-white font-black uppercase tracking-widest gap-3 shadow-xl hover:bg-sky-500 transition-all">
          <Zap className="h-4 w-4 fill-sky-400 text-sky-400" /> Generate AI Insights
        </Button>
        <Button variant="outline" className="h-14 rounded-xl border-slate-200 bg-white font-black uppercase tracking-widest gap-3 hover:border-sky-500 hover:text-sky-500">
          <Bell className="h-4 w-4" /> Push Notifications
        </Button>
      </div>
    </div>
  );
};

export default QuickControlPanel;