import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, Loader2, Minus, Trophy, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from '@/services/api';
import { cn } from '@/lib/utils';

const Rankings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [athletes, setAthletes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const data = await UserAPI.getAll();
        setAthletes(data);
      } catch (err) {
        setAthletes(JSON.parse(localStorage.getItem('registered_users') || '[]'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  const filtered = useMemo(() => athletes.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery, athletes]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      <main className="container px-4 py-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-sky-500" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Global Ranks</span>
          </div>
          <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter italic uppercase leading-none">Player Rankings</h1>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['world', 'country', 'state'].map((s) => (
              <button 
                key={s} 
                onClick={() => setScope(s)} 
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm", 
                  scope === s ? "bg-[#0B1F3A] text-white" : "bg-white text-slate-400 border border-slate-100"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            placeholder="Search Players..." 
            className="w-full h-14 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl font-bold text-xs shadow-sm outline-none focus:border-sky-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Loading Rankings...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((row, idx) => (
              <div 
                key={row.id || idx} 
                onClick={() => navigate(`/player/${row.id || row.mobile}`)}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group"
              >
                {/* Rank Badge */}
                <div className={cn(
                  "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-black text-xs",
                  idx === 0 ? "bg-amber-500 text-white" : 
                  idx === 1 ? "bg-slate-300 text-white" : 
                  idx === 2 ? "bg-orange-400 text-white" : "bg-slate-50 text-slate-400"
                )}>
                  #{idx + 1}
                </div>

                {/* Player Identity */}
                <div className="flex-1 flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-400 uppercase shadow-inner border border-white/10 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    {row.name ? row.name[0] : "?"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-black text-[#0B1F3A] uppercase italic text-sm leading-tight truncate group-hover:text-sky-600 transition-colors">{row.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight truncate">
                      {row.smash_id || row.smashId || "NODE_01"} • {row.state || "India"}
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <ChevronRight className="h-5 w-5 text-slate-200 group-hover:text-sky-500 transition-colors" />
              </div>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50">
              <Zap className="h-10 w-10 text-slate-200 mx-auto mb-4" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">No players found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Rankings;