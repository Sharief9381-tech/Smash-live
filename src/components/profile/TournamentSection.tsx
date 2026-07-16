"use client";

import React from 'react';
import { Trophy } from 'lucide-react';

const TournamentSection = () => {
  return (
    <div className="py-32 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100">
      <Trophy className="h-12 w-12 text-slate-200 mx-auto mb-6" />
      <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">No Circuit History</h3>
      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2 italic">Register for tournaments to begin logging your professional career.</p>
    </div>
  );
};

export default TournamentSection;