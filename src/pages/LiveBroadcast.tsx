"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ScoreOverlay from '@/components/broadcast/ScoreOverlay';
import CommentaryFeed from '@/components/broadcast/CommentaryFeed';
import { Button } from '@/components/ui/button';
import { 
  Maximize2, Volume2, Settings, Users, 
  Share2, Heart, MessageCircle, MoreHorizontal,
  TrendingUp, Activity, Timer, Zap, ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const momentumData = [
  { time: '0m', p1: 50, p2: 50 },
  { time: '5m', p1: 60, p2: 40 },
  { time: '10m', p1: 45, p2: 55 },
  { time: '15m', p1: 70, p2: 30 },
  { time: '20m', p1: 55, p2: 45 },
  { time: '25m', p1: 85, p2: 15 },
];

const LiveBroadcast = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [duration, setDuration] = useState("00:42:15");

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      
      <main className="container px-4 py-8">
        <div className="grid xl:grid-cols-12 gap-8">
          
          {/* Main Content (Player + Primary Insights) */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* Video Player Section */}
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-secondary group border border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-80"
                alt="Live Broadcast"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              
              <ScoreOverlay 
                player1="Viktor Axelsen"
                player2="Lee Zii Jia"
                score1={18}
                score2={14}
                sets1={[21]}
                sets2={[19]}
                server={1}
                title="BWF Finals • Court 01"
              />

              {/* Player Controls */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 text-white">
                    <Timer className="h-6 w-6" />
                  </Button>
                  <span className="text-sm font-black font-mono text-white">{duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 text-white">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 text-white">
                    <Settings className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10 text-white">
                    <Maximize2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 backdrop-blur-md">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-white">LIVE</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                  <Users className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-black text-white">12,482 Viewers</span>
                </div>
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-sm">
                  VA
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight">Viktor Axelsen vs Lee Zii Jia</h1>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Grand Finale • Broadcasted by SmashLive HD</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "h-12 rounded-xl gap-2 font-bold px-6 border border-white/5",
                    isLiked ? "bg-red-500/20 text-red-500" : "bg-white/5 text-white"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} /> {isLiked ? '8.4k' : 'Like'}
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-white/5 hover:bg-white/5 gap-2 font-bold">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-white/5">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Advanced Insights */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Win Probability
                  </h3>
                  <Badge variant="outline" className="border-white/10">AI PREDICTION</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-primary">Axelsen (84%)</span>
                      <span className="text-muted-foreground">Lee (16%)</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary" style={{ width: '84%' }} />
                      <div className="h-full bg-white/20" style={{ width: '16%' }} />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-muted-foreground font-medium italic">
                    "Axelsen's smash consistency in the second set has increased his win probability by 12% in the last 10 minutes."
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" /> Momentum Graph
                </h3>
                <div className="h-[120px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={momentumData}>
                      <defs>
                        <linearGradient id="colorP1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b6ff2a" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#b6ff2a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="p1" stroke="#b6ff2a" fillOpacity={1} fill="url(#colorP1)" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#b6ff2a', fontWeight: 'bold' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel (Commentary + Chat) */}
          <div className="xl:col-span-4 space-y-8">
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
              { id: '4', text: "Server change. Axelsen to serve from the right side.", type: 'analysis', time: '14:36' },
              { id: '5', text: "Unforced error from Lee Zii Jia at the net.", type: 'score', time: '14:35' },
            ]} />

            <div className="glass-card rounded-[2.5rem] flex flex-col h-[500px]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" /> Live Chat
                </h3>
                <Badge className="bg-white/5 text-muted-foreground border-none">8.2k Online</Badge>
              </div>
              <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                {[
                  { user: "BadmintonFan", msg: "Axelsen is on fire today! 🔥", color: "text-blue-400" },
                  { user: "SportLover", msg: "That smash was insane. 410km/h!", color: "text-green-400" },
                  { user: "CoachDave", msg: "Lee needs to focus on the net play.", color: "text-purple-400" },
                  { user: "SmashMaster", msg: "LETS GOOOOO", color: "text-red-400" },
                ].map((chat, i) => (
                  <div key={i} className="space-y-1">
                    <span className={cn("text-[10px] font-black uppercase tracking-wider", chat.color)}>{chat.user}</span>
                    <p className="text-sm font-medium">{chat.msg}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="flex gap-2">
                  {['🔥', '👏', '😮', '🏸'].map(emoji => (
                    <button key={emoji} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Send a message..." 
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-primary/50 outline-none transition-all pr-12"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replays & Highlights Section */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" /> Key Highlights
            </h2>
            <Button variant="link" className="text-primary font-bold">Browse All Clips</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Incredible Smash", dur: "0:45", img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" },
              { title: "Longest Rally (42s)", dur: "1:12", img: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop" },
              { title: "Match Point Moment", dur: "0:30", img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" },
              { title: "Net Play Masterclass", dur: "2:15", img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" },
            ].map((clip, i) => (
              <div key={i} className="glass-card group rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all">
                <div className="relative aspect-video">
                  <img src={clip.img} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                    {clip.dur}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm truncate">{clip.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveBroadcast;