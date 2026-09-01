import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { 
  History, Search, Loader2,
  Play, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MatchAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const MatchArchive = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery]     = useState('');

  useEffect(() => {
    MatchAPI.getAll('completed')
      .then(data => setMatches(data))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  const getMatchup = (m: any): string => {
    if (!m.players) return m.name || 'Unknown';
    if (m.match_type === 'singles') {
      return `${m.players.p1?.name || 'A'} vs ${m.players.p2?.name || 'B'}`;
    }
    const a = (m.players.sideA || []).map((p: any) => p?.name || '?').join(' / ');
    const b = (m.players.sideB || []).map((p: any) => p?.name || '?').join(' / ');
    return `${a} vs ${b}`;
  };

  const getScore = (m: any): string => {
    const games: any[] = m.game_scores || [];
    if (games.length > 0) return games.map((g: any) => `${g.scoreA}–${g.scoreB}`).join(', ');
    const s = m.current_score || [0, 0];
    return `${s[0]}–${s[1]}`;
  };

  const filtered = matches.filter(m => {
    const q = query.toLowerCase();
    return !q || getMatchup(m).toLowerCase().includes(q) || (m.name || '').toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A]">
              <History className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">Match Database</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase">Score Archive</h1>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 flex gap-4 items-center">
          <div className="flex-1 w-full flex items-center bg-white rounded-2xl px-6 h-14 border border-slate-100 focus-within:border-sky-500 transition-all shadow-sm">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search players or match..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-black px-4 w-full"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-sky-500 h-8 w-8" /></div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-black text-[10px] uppercase tracking-widest py-8 px-10">Matchup</TableHead>
                  <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Score</TableHead>
                  <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Type</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-16 text-slate-400 font-bold">
                      No completed matches found
                    </TableCell>
                  </TableRow>
                ) : filtered.map((m) => (
                  <TableRow key={m._id} className="border-slate-100 hover:bg-sky-50/50 transition-all h-24">
                    <TableCell className="px-10">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-sky-500">
                          <Zap className="h-5 w-5 fill-current" />
                        </div>
                        <div>
                          <p className="font-black text-[#0B1F3A] text-lg leading-tight">{getMatchup(m)}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono font-black text-sky-600 text-xl tracking-tighter">{getScore(m)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-black text-[10px] border-slate-200 uppercase px-3 py-1">
                        {m.match_type || 'singles'} · {m.category || 'friendly'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-12">
                      <Button
                        onClick={() => navigate(`/scoring/${m._id}`)}
                        variant="ghost"
                        className="h-12 w-12 rounded-2xl hover:bg-[#0B1F3A] hover:text-white transition-all"
                      >
                        <Play className="h-5 w-5 fill-current" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchArchive;