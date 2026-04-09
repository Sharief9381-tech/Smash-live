"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import CourtView from '@/components/match/CourtView';
import AICommentary from '@/components/match/AICommentary';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Undo2, RotateCcw, AlertCircle, Clock, 
  Pause, Play, CheckCircle2, Trophy,
  ChevronUp, ChevronDown, BarChart3
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { showSuccess, showError } from '@/utils/toast';
import { Commentary } from '@/types/match';

const LiveMatch = () => {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [sets1, setSets1] = useState(0);
  const [sets2, setSets2] = useState(0);
  const [servingTeam, setServingTeam] = useState<1 | 2>(1);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<Commentary[]>([]);
  const [winProb, setWinProb] = useState(50);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addCommentary = (text: string, type: 'point' | 'info' | 'highlight' = 'point') => {
    const newLog: Commentary = {
      id: Math.random().toString(),
      text,
      type,
      timestamp: formatTime(timer)
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const generateAICommentary = (team: 1 | 2, newScore: number, otherScore: number) => {
    const teamName = team === 1 ? 'Viktor Axelsen' : 'Lee Zii Jia';
    const comments = [
      `Brilliant smash from ${teamName}!`,
      `Excellent net play gives ${teamName} the lead.`,
      `Unforced error from the opponent. Point to ${teamName}.`,
      `${teamName} is dominating the court right now.`,
      `Great recovery from ${teamName}!`,
    ];
    
    let text = comments[Math.floor(Math.random() * comments.length)];
    let type: 'point' | 'info' | 'highlight' = 'point';

    if (newScore === 20 && otherScore < 20) {
      text = `Game point for ${teamName}! The pressure is on.`;
      type = 'highlight';
    } else if (newScore >= 21 && (newScore - otherScore) >= 2) {
      text = `${teamName} takes the set! What a performance.`;
      type = 'highlight';
    } else if (Math.abs(newScore - otherScore) === 0 && newScore > 15) {
      text = `It's neck and neck at ${newScore}-${otherScore}. High intensity!`;
    }

    addCommentary(text, type);
    
    // Update win probability mock
    const diff = newScore - otherScore;
    setWinProb(50 + (team === 1 ? diff * 2 : -diff * 2));
  };

  const handleScore = (team: 1 | 2) => {
    if (team === 1) {
      setScore1(s => s + 1);
      setServingTeam(1);
      generateAICommentary(1, score1 + 1, score2);
    } else {
      setScore2(s => s + 1);
      setServingTeam(2);
      generateAICommentary(2, score2 + 1, score1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        {/* Header / Match Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">BWF World Tour Finals 2024</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Quarter-Finals • Court 01</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Duration</span>
              <div className="flex items-center gap-2 font-mono text-xl font-bold">
                <Clock className="h-4 w-4 text-primary" />
                {formatTime(timer)}
              </div>
            </div>
            <div className="h-10 w-px bg-white/5" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)} className="border-white/10">
                {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-bold">
                End Match
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Visual Section */}
          <div className="lg:col-span-8 space-y-8">
            <CourtView servingTeam={servingTeam} />
            
            {/* Live Scoreboard */}
            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 Score Card */}
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScore(1)}
                className={`glass-card p-6 rounded-3xl cursor-pointer border-2 transition-all ${servingTeam === 1 ? 'border-primary/50 shadow-[0_0_30px_rgba(182,255,42,0.1)]' : 'border-transparent'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Player 1</span>
                    <h3 className="text-xl font-bold">Viktor Axelsen</h3>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(s => (
                      <div key={s} className={`h-2 w-2 rounded-full ${sets1 >= s ? 'bg-primary' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-7xl font-black font-mono text-primary">{score1.toString().padStart(2, '0')}</span>
                  {servingTeam === 1 && (
                    <div className="bg-primary/20 p-2 rounded-full animate-pulse">
                      <ChevronUp className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Team 2 Score Card */}
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScore(2)}
                className={`glass-card p-6 rounded-3xl cursor-pointer border-2 transition-all ${servingTeam === 2 ? 'border-primary/50 shadow-[0_0_30px_rgba(182,255,42,0.1)]' : 'border-transparent'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Player 2</span>
                    <h3 className="text-xl font-bold">Lee Zii Jia</h3>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(s => (
                      <div key={s} className={`h-2 w-2 rounded-full ${sets2 >= s ? 'bg-primary' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between"><dyad-write path="src/pages/LiveMatch.tsx" description="Completing the LiveMatch component with scoring controls and analytics.">
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import CourtView from '@/components/match/CourtView';
import AICommentary from '@/components/match/AICommentary';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Undo2, RotateCcw, AlertCircle, Clock, 
  Pause, Play, CheckCircle2, Trophy,
  ChevronUp, ChevronDown, BarChart3,
  Timer, Activity, Zap
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { showSuccess, showError } from '@/utils/toast';
import { Commentary } from '@/types/match';
import { Badge } from "@/components/ui/badge";

const LiveMatch = () => {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [sets1, setSets1] = useState(0);
  const [sets2, setSets2] = useState(0);
  const [servingTeam, setServingTeam] = useState<1 | 2>(1);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<Commentary[]>([]);
  const [winProb, setWinProb] = useState(50);
  const [momentum, setMomentum] = useState([50, 50, 50, 50, 50]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addCommentary = (text: string, type: 'point' | 'info' | 'highlight' = 'point') => {
    const newLog: Commentary = {
      id: Math.random().toString(),
      text,
      type,
      timestamp: formatTime(timer)
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const generateAICommentary = (team: 1 | 2, newScore: number, otherScore: number) => {
    const teamName = team === 1 ? 'Viktor Axelsen' : 'Lee Zii Jia';
    const comments = [
      `Brilliant smash from ${teamName}!`,
      `Excellent net play gives ${teamName} the point.`,
      `Unforced error from the opponent. Point to ${teamName}.`,
      `${teamName} is dominating the court right now.`,
      `Great recovery from ${teamName}!`,
      `Powerful cross-court return by ${teamName}.`,
      `The momentum is shifting towards ${teamName}.`
    ];
    
    let text = comments[Math.floor(Math.random() * comments.length)];
    let type: 'point' | 'info' | 'highlight' = 'point';

    if (newScore === 20 && otherScore < 20) {
      text = `Game point for ${teamName}! The pressure is on.`;
      type = 'highlight';
    } else if (newScore >= 21 && (newScore - otherScore) >= 2) {
      text = `${teamName} takes the set! What a performance.`;
      type = 'highlight';
      setScore1(0);
      setScore2(0);
      if (team === 1) setSets1(s => s + 1);
      else setSets2(s => s + 1);
    } else if (Math.abs(newScore - otherScore) === 0 && newScore > 15) {
      text = `It's neck and neck at ${newScore}-${otherScore}. High intensity!`;
    }

    addCommentary(text, type);
    
    // Update win probability & momentum
    const diff = newScore - otherScore;
    const newProb = Math.min(Math.max(50 + diff * 4, 5), 95);
    setWinProb(newProb);
    setMomentum(prev => [...prev.slice(1), newProb]);
  };

  const handleScore = (team: 1 | 2) => {
    if (team === 1) {
      setScore1(s => s + 1);
      setServingTeam(1);
      generateAICommentary(1, score1 + 1, score2);
    } else {
      setScore2(s => s + 1);
      setServingTeam(2);
      generateAICommentary(2, score2 + 1, score1);
    }
  };

  const undoScore = () => {
    if (score1 > 0 || score2 > 0) {
      showSuccess("Last point undone");
      addCommentary("Point reversed by officials.", "info");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        {/* Header Match Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">BWF World Tour Finals 2024</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Quarter-Finals • Court 01</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Match Time</span>
              <div className="flex items-center gap-2 font-mono text-xl font-bold">
                <Timer className="h-4 w-4 text-primary" />
                {formatTime(timer)}
              </div>
            </div>
            <div className="h-10 w-px bg-white/5 hidden md:block" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)} className="border-white/10 hover:bg-white/5">
                {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-bold border-none">
                End Match
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Visual & Score Section */}
          <div className="lg:col-span-8 space-y-6">
            <CourtView servingTeam={servingTeam} />
            
            {/* Scoreboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScore(1)}
                className={`glass-card p-8 rounded-[2rem] cursor-pointer border-2 transition-all relative overflow-hidden ${servingTeam === 1 ? 'border-primary shadow-[0_0_40px_rgba(182,255,42,0.15)]' : 'border-transparent'}`}
              >
                {servingTeam === 1 && (
                  <div className="absolute top-0 right-0 p-4">
                    <Zap className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Team A</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={`h-2.5 w-2.5 rounded-full transition-colors ${sets1 >= s ? 'bg-primary shadow-[0_0_8px_rgba(182,255,42,0.5)]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black truncate">Viktor Axelsen</h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-8xl font-black font-mono tracking-tighter text-primary">
                      {score1.toString().padStart(2, '0')}
                    </span>
                    <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary border-none text-[10px] font-bold">
                      +1 POINT
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScore(2)}
                className={`glass-card p-8 rounded-[2rem] cursor-pointer border-2 transition-all relative overflow-hidden ${servingTeam === 2 ? 'border-primary shadow-[0_0_40px_rgba(182,255,42,0.15)]' : 'border-transparent'}`}
              >
                {servingTeam === 2 && (
                  <div className="absolute top-0 right-0 p-4">
                    <Zap className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Team B</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={`h-2.5 w-2.5 rounded-full transition-colors ${sets2 >= s ? 'bg-primary shadow-[0_0_8px_rgba(182,255,42,0.5)]' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black truncate">Lee Zii Jia</h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-8xl font-black font-mono tracking-tighter text-primary">
                      {score2.toString().padStart(2, '0')}
                    </span>
                    <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary border-none text-[10px] font-bold">
                      +1 POINT
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Controls */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={undoScore} className="border-white/10 hover:bg-white/5 rounded-xl px-6">
                <Undo2 className="mr-2 h-4 w-4" /> Undo Point
              </Button>
              <Button variant="outline" onClick={() => setServingTeam(s => s === 1 ? 2 : 1)} className="border-white/10 hover:bg-white/5 rounded-xl px-6">
                <RotateCcw className="mr-2 h-4 w-4" /> Change Serve
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl px-6">
                <AlertCircle className="mr-2 h-4 w-4" /> Fault
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl px-6">
                <Clock className="mr-2 h-4 w-4" /> Timeout
              </Button>
            </div>

            {/* AI Commentary Panel */}
            <AICommentary logs={logs} />
          </div>

          {/* Sidebar Analytics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Win Probability */}
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Live Analytics
                </h3>
                <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">AI CALCULATED</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span>Viktor Axelsen</span>
                  <span className="text-primary">{winProb}% Win Prob.</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                  <motion.div 
                    animate={{ width: `${winProb}%` }}
                    className="h-full bg-primary"
                  />
                  <div className="h-full flex-1 bg-white/10" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Momentum Tracker</span>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-end justify-between h-20 gap-2">
                  {momentum.map((val, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      className="flex-1 bg-primary/20 rounded-t-sm border-t border-primary/40"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Player Stats */}
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <h3 className="font-bold uppercase tracking-wider text-sm">Performance Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Smash Accuracy", v1: "88%", v2: "76%" },
                  { label: "Net Points", v1: "12", v2: "09" },
                  { label: "Longest Rally", v1: "24", v2: "24" },
                  { label: "Avg Speed", v1: "340km/h", v2: "325km/h" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                      <span>{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold w-12 text-primary">{stat.v1}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full flex overflow-hidden">
                        <div className="h-full bg-primary/40 w-1/2 border-r border-white/20" />
                        <div className="h-full bg-white/10 flex-1" />
                      </div>
                      <span className="text-sm font-mono font-bold w-12 text-right">{stat.v2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Bracket Shortcut */}
            <div className="glass-card p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Tournament Status</h4>
                  <p className="text-[10px] text-muted-foreground">QUARTER FINALS • MATCH 3 OF 4</p>
                </div>
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-xs font-bold uppercase py-6 rounded-2xl">
                View Tournament Bracket
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;