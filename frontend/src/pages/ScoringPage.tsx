import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Zap, Target, RefreshCw, StopCircle, X, ChevronLeft, Loader2, AlertCircle, Trophy, Undo2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { MatchAPI } from '@/services/api';
import { io as socketIO, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const SOCKET_URL = API_URL.replace('/api', '');

const ScoringPage = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [scoring, setScoring]     = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<1 | 2 | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // ── Load match ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!matchId) return;

    const load = async () => {
      try {
        const data = await MatchAPI.getById(matchId);
        setMatchData(data);
      } catch {
        // Fallback to localStorage (offline/guest mode)
        const local = localStorage.getItem(matchId);
        if (local) setMatchData(JSON.parse(local));
        else navigate('/broadcast/center');
      } finally {
        setLoading(false);
      }
    };
    load();

    // ── Socket.IO: join room and listen for authoritative updates ──────────
    const socket = socketIO(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.emit('match:join', matchId);

    socket.on('match:state', (data: any) => {
      setMatchData(data);
    });

    socket.on('score:update', (data: any) => {
      setMatchData((prev: any) => prev ? { ...prev, ...data } : data);
      if (data.matchCompleted) {
        showSuccess('Match Complete!');
      } else if (data.gameCompleted) {
        showSuccess('Game Complete!');
      }
    });

    socket.on('match:completed', (data: any) => {
      setMatchData(data);
    });

    return () => {
      socket.emit('match:leave', matchId);
      socket.disconnect();
    };
  }, [matchId, navigate]);

  // ── Score a point via backend ─────────────────────────────────────────────
  const handlePoint = async (side: 1 | 2, action: string) => {
    if (!matchId || scoring) return;
    if (matchData?.status === 'completed') {
      showError('Match is already completed');
      return;
    }

    setActiveOverlay(null);
    setScoring(true);
    try {
      const res = await MatchAPI.scorePoint(matchId, side, action);
      setMatchData(res.match);
      if (res.matchCompleted) showSuccess('Match Complete!');
      else if (res.gameCompleted) showSuccess('Game Complete!');
    } catch (err: any) {
      showError(err.message || 'Scoring failed');
    } finally {
      setScoring(false);
    }
  };

  const handleUndo = async () => {
    if (!matchId || scoring) return;
    setScoring(true);
    try {
      const res = await MatchAPI.undo(matchId);
      setMatchData(res);
      showSuccess('Point undone');
    } catch (err: any) {
      showError(err.message || 'Nothing to undo');
    } finally {
      setScoring(false);
    }
  };

  const handleStart = async () => {
    if (!matchId) return;
    try {
      const res = await MatchAPI.start(matchId);
      setMatchData(res);
      showSuccess('Match started!');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleEnd = async () => {
    if (!matchId) return;
    if (!confirm('End this match?')) return;
    try {
      const res = await MatchAPI.end(matchId);
      setMatchData(res);
      showSuccess('Match ended');
      navigate('/smashed');
    } catch (err: any) {
      showError(err.message);
    }
  };

  const getSideName = (side: 1 | 2): string => {
    if (!matchData?.players) return side === 1 ? 'Side A' : 'Side B';
    const mt = matchData.match_type || 'singles';
    if (mt === 'singles') {
      const p = side === 1 ? matchData.players.p1 : matchData.players.p2;
      return p?.name || (side === 1 ? 'Athlete A' : 'Athlete B');
    }
    const team = side === 1 ? matchData.players.sideA : matchData.players.sideB;
    if (!Array.isArray(team)) return side === 1 ? 'Team A' : 'Team B';
    return team.map((p: any) => p?.name || 'Athlete').join(' / ');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-sky-500 h-10 w-10" />
      </div>
    );
  }

  const score     = (matchData?.current_score as [number, number]) || [0, 0];
  const setsWon   = (matchData?.sets_won as [number, number])      || [0, 0];
  const serving   = (matchData?.serving as 1 | 2)                  || 1;
  const isLive    = matchData?.status === 'live';
  const isDone    = matchData?.status === 'completed';
  const gameScores: any[] = matchData?.game_scores || [];

  return (
    <div className="min-h-screen w-full bg-slate-50 pb-24 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 space-y-5 max-w-lg mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Button onClick={() => navigate('/broadcast/center')} variant="ghost" className="h-10 px-4 font-black text-[9px] uppercase tracking-widest border bg-white rounded-xl">
            <ChevronLeft className="mr-1 h-3 w-3" /> Exit
          </Button>
          <div className="flex items-center gap-2">
            {isDone
              ? <Trophy className="h-4 w-4 text-yellow-500" />
              : <div className={cn("h-2 w-2 rounded-full", isLive ? "bg-red-500 animate-pulse" : "bg-slate-300")} />
            }
            <span className="text-[9px] font-black uppercase text-slate-400 max-w-[160px] truncate">
              {isDone ? 'Completed' : isLive ? 'Live' : 'Scheduled'}: {matchData?.name}
            </span>
          </div>
        </div>

        {/* Game history dots */}
        {gameScores.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {gameScores.map((g: any, i: number) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl px-3 py-1.5 text-[9px] font-black text-slate-500 uppercase">
                G{i + 1}: {g.scoreA}–{g.scoreB}
              </div>
            ))}
          </div>
        )}

        {/* Score panels */}
        <div className="flex flex-col gap-4">
          {([1, 2] as (1 | 2)[]).map((side) => {
            const isServing = serving === side;
            const isWinner  = isDone && matchData?.winner === side;
            return (
              <div key={side} className={cn(
                'p-6 rounded-[2.5rem] border transition-all flex items-center justify-between shadow-xl relative overflow-hidden',
                isWinner  ? 'bg-yellow-50 border-yellow-400 scale-[1.02]' :
                isServing && isLive ? 'bg-white border-sky-500 scale-[1.02]' :
                'bg-white/50 border-slate-100 opacity-70'
              )}>
                {isWinner && <Trophy className="absolute right-4 top-4 h-12 w-12 text-yellow-400 opacity-10" />}
                <div className="space-y-2 flex-1 mr-4">
                  <div className={cn('h-10 w-10 rounded-full flex items-center justify-center font-black text-white text-sm', side === 1 ? 'bg-sky-500' : 'bg-[#0B1F3A]')}>
                    {side === 1 ? 'A' : 'B'}
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-black uppercase italic tracking-tighter leading-tight">{getSideName(side)}</h2>
                    {isServing && isLive && (
                      <span className="text-lg leading-none" title="Serving">🏸</span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: Math.ceil((matchData?.total_sets || 3) / 2) }).map((_, i) => (
                      <div key={i} className={cn('h-2 w-2 rounded-full border', i < setsWon[side - 1] ? 'bg-sky-500 border-sky-500' : 'bg-slate-100 border-slate-200')} />
                    ))}
                  </div>
                </div>
                <motion.span
                  key={score[side - 1]}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className={cn('text-7xl font-black font-mono tabular-nums leading-none', side === 1 ? 'text-sky-600' : 'text-[#0B1F3A]')}
                >
                  {score[side - 1]}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* Start button if scheduled */}
        {!isLive && !isDone && (
          <Button onClick={handleStart} className="w-full h-16 rounded-2xl bg-sky-500 text-white font-black text-lg uppercase">
            Start Match
          </Button>
        )}

        {/* Scoring buttons — only when live */}
        {isLive && (
          <div className="grid grid-cols-2 gap-4">
            {([1, 2] as (1 | 2)[]).map((side) => (
              <div key={side} className="relative h-28">
                <Button
                  onClick={() => setActiveOverlay(side)}
                  disabled={scoring}
                  className={cn('w-full h-full rounded-[2.5rem] text-white font-black text-3xl shadow-2xl transition-transform active:scale-95', side === 1 ? 'bg-sky-500' : 'bg-[#0B1F3A]')}
                >
                  {scoring ? <Loader2 className="animate-spin h-8 w-8" /> : '+1'}
                </Button>
                <AnimatePresence>
                  {activeOverlay === side && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2.5rem] p-3 flex flex-col gap-2 border-2 border-sky-500/50"
                    >
                      <div className="flex justify-between items-center px-3">
                        <span className="text-[8px] font-black text-sky-400 uppercase">Point Type</span>
                        <X onClick={() => setActiveOverlay(null)} className="h-4 w-4 text-white/40 cursor-pointer" />
                      </div>
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        {[
                          { label: 'Smash', icon: Zap },
                          { label: 'Net',   icon: Target },
                          { label: 'Error', icon: AlertCircle, red: true },
                        ].map(({ label, icon: Icon, red }) => (
                          <button
                            key={label}
                            onClick={() => handlePoint(side, label)}
                            className={cn('rounded-2xl flex flex-col items-center justify-center gap-1', red ? 'bg-red-500/10' : 'bg-white/5')}
                          >
                            <Icon className={cn('h-5 w-5', red ? 'text-red-500' : 'text-sky-400')} />
                            <span className="text-[7px] font-black text-white uppercase">{label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Completed state */}
        {isDone && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 text-center space-y-2">
            <Trophy className="h-10 w-10 text-yellow-500 mx-auto" />
            <p className="font-black text-[#0B1F3A] text-lg uppercase italic">
              {getSideName(matchData.winner as 1 | 2)} Wins!
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {setsWon[0]}–{setsWon[1]} in games
            </p>
          </div>
        )}

        {/* Bottom controls */}
        <div className="flex gap-4">
          <Button onClick={() => navigate('/smashed')} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-[10px] uppercase gap-2 bg-white">
            <ChevronLeft className="h-4 w-4" /> Archive
          </Button>
          {isLive && (
            <Button onClick={handleUndo} disabled={scoring} variant="outline" className="flex-1 h-14 rounded-2xl border-amber-100 text-amber-600 font-black text-[10px] uppercase gap-2 bg-white hover:bg-amber-50">
              <Undo2 className="h-4 w-4" /> Undo
            </Button>
          )}
          {!isDone && (
            <Button onClick={handleEnd} variant="outline" className="flex-1 h-14 rounded-2xl border-red-100 text-red-500 font-black text-[10px] uppercase gap-2 bg-white hover:bg-red-50">
              <StopCircle className="h-4 w-4" /> End
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;
