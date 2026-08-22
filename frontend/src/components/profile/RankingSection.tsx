import React, { useState, useMemo, useEffect } from 'react';
import { Search, Globe, Flag, MapPin, Zap, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const RankingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = () => {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      setUsers(registered.map((u: any) => ({
        ...u,
        matches: 0,
        winRate: "0.0",
        smashAcc: "0.0",
        points: 0,
        img: u.name ? u.name.split(' ').map((n: string) => n[0]).join('') : "?"
      })).sort((a: any, b: any) => b.points - a.points));
    };

    loadUsers();
    window.addEventListener('storage', loadUsers);
    return () => window.removeEventListener('storage', loadUsers);
  }, []);

  const filtered = useMemo(() => {
    return users.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smashId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const scopes = [
    { id: 'world', label: 'World', icon: Globe },
    { id: 'country', label: 'Country', icon: Flag },
    { id: 'state', label: 'State', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {scopes.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm",
                scope === s.id ? "bg-[#0B1F3A] text-white" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              <s.icon className="h-3 w-3" /> {s.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search Athlete" 
            className="h-12 pl-11 bg-white border-slate-100 rounded-2xl font-bold text-xs shadow-sm focus:border-sky-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? filtered.map((p, idx) => (
          <div 
            key={idx} 
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            {/* Rank Identifier */}
            <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center font-black text-xs text-slate-400 border border-slate-100">
              #{idx + 1}
            </div>

            {/* Athlete Info */}
            <div className="flex-1 flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 shrink-0 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-400 uppercase shadow-inner">
                {p.img}
              </div>
              <div className="overflow-hidden">
                <p className="font-black text-[#0B1F3A] uppercase italic text-xs leading-tight truncate">{p.name}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight truncate">{p.smash_id || p.smashId}</p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="flex gap-4 items-center pl-4 border-l border-slate-50">
               <div className="text-right">
                  <p className="text-[7px] font-black text-slate-300 uppercase">Win %</p>
                  <p className="text-xs font-black text-green-500 leading-none">{p.winRate}%</p>
               </div>
               <div className="text-right">
                  <p className="text-[7px] font-black text-slate-300 uppercase">Pts</p>
                  <p className="text-xs font-black text-[#0B1F3A] leading-none">{p.points}</p>
               </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center border-2 border-dashed rounded-3xl bg-white/50 border-slate-200">
            <Trophy className="h-8 w-8 text-slate-200 mx-auto mb-3" />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">No active athletes in registry</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingSection;