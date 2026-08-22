import React from 'react';
import { Users } from 'lucide-react';

const TeamSection = () => {
  return (
    <div className="glass-panel py-32 rounded-[3.5rem] border-slate-200 bg-white flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed shadow-sm">
      <Users className="h-12 w-12 text-slate-200 animate-pulse" />
      <div className="space-y-1">
        <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">No Team Data Detected</h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Participate in doubles or mixed matches to log partner intelligence.</p>
      </div>
    </div>
  );
};

export default TeamSection;