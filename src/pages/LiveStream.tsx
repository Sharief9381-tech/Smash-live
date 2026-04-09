"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, Volume2, Maximize2, 
  Settings, Users, Radio, MessageSquare,
  Share2, Heart, TrendingUp, Zap,
  Timer, Activity, Star, ChevronDown,
  History, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LiveStream = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [commentary, setCommentary] = useState([
    { id: 1, text: "Fantastic deep clear from Axelsen to push back Lee.", time: "42:12", type: "event" },
    { id: 2, text: "Unbelievable defense! Lee Zii Jia recovers a 400km/h smash.", time: "42:34", type: "highlight" },
    { id: 3, text: "Momentum shifting towards Denmark as Viktor takes the lead.", time: "43:01", type: "ai" },
  ]);

  const [reactions, setReactions] = useState(0);

  // Simulate AI commentary
  useEffect(() => {
    const timer = setInterval(() => {
      const texts = [
        "Power smash cross-court winner!",
        "Staggering rally! 24 shots exchanged.",
        "Precision drop shot leaves opponent flat-footed.",
        "Aggressive play at the net from Lee."
      ];
      const newMsg = {
        id: Date.now(),
        text: texts[Math.floor(Math.random() * texts.length)],
        time: "44:15",
        type: Math.random() > 0.5 ? "event" : "ai"
      };
      setCommentary(prev => [newMsg, ...prev].slice(0, 10));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      
      <main className="container px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Player Section */}
          <div className="lg:col-span-9 space-y-6">
            {/* Video Player & Overlay Container */}
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl group border border-white/5">
              {/* Fake Video Content */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
                <img 
                  src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-40 grayscale-[20%]"
                  alt="Live Badminton"
                />
                {!isPlaying && <Play className="h-20 w-20 text-primary fill-current" />}
              </div>

              {/* LIVE SCORE OVERLAY */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <div className="glass-card !bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-8 border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Axelsen</p>
                      <div className="flex gap-1 justify-end mt-1">
                        <div className="h-1 w-3 bg-primary rounded-full" />
                        <div className="h-1 w-3 bg-white/10 rounded-full" />
                      </div>
                    </div>
                    <span className="text-4xl font-black font-mono tracking-tighter text-primary">21</span>
                  </div>

                  <div className="h-8 w-px bg-white/10" />

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">Set 02</span>
                    <Timer className="h-3 w-3 text-red-500 animate-pulse" />
                  </div>

                  <div className="h-8 w-px bg-white/10" />

                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black font-mono tracking-tighter">19</span>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">Lee Z.J.</p>
                      <div className="flex gap-1 mt-1">
                        <div className="h-1 w-3 bg-white/10 rounded-full" />
                        <div className="h-1 w-3 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100">
                <div className="flex flex-col gap-6">
                  <Progress value={78} className="h-1 bg-white/10" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="h-12 w-12 rounded-full hover:bg-white/10">
                        {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
                      </Button>
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5" />
                        <div className="w-24 h-1 bg-white/10 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 w-3/4 bg-primary rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-red-500 h-2 w-2 rounded-full animate-pulse" />
                        <span className="text-xs font-black tracking-widest uppercase">LIVE • 12,482 Viewers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="font-bold text-xs uppercase tracking-widest">1080p60</Button>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full"><Settings className="h-5 w-5" /></Button>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full"><Maximize2 className="h-5 w-5" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Info & Interaction */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-4">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-black font-black uppercase tracking-widest text-[10px]">BWF FINALS</Badge>
                  <Badge variant="outline" className="border-white/10 text-muted-foreground font-black text-[10px]">MAJOR EVENT</Badge>
                </div>
                <h1 className="text-3xl font-black tracking-tighter uppercase italic">AXELSEN vs ZII JIA - Road to Finals LIVE Broadcast</h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-primary" /> Men's Singles • Group A</span>
                  <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Low Latency Stream</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setReactions(r => r + 1)} className="bg-white/5 border-white/10 hover:bg-primary hover:text-black rounded-2xl h-14 px-6 gap-3 group">
                  <Heart className={`h-5 w-5 ${reactions > 0 ? 'fill-current text-red-500 group-hover:text-black' : ''}`} />
                  <span className="font-black font-mono">{reactions.toLocaleString()}</span>
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-2xl h-14 px-6 gap-3 font-black uppercase text-xs tracking-widest">
                  <Share2 className="h-5 w-5" /> Share
                </Button>
                <Button className="bg-primary text-black font-black rounded-2xl h-14 px-8 shadow-[0_20px_40px_rgba(182,255,42,0.1)]">
                  FOLLOW MATCH
                </Button>
              </div>
            </div>

            {/* AI COMMENTARY & INSIGHTS TABS */}
            <Tabs defaultValue="insights" className="pt-8">
              <TabsList className="bg-transparent gap-8 h-auto p-0 mb-8 border-b border-white/5 w-full justify-start rounded-none">
                <TabsTrigger value="insights" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-4 px-0 font-black uppercase tracking-widest text-xs">Match Insights</TabsTrigger>
                <TabsTrigger value="commentary" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-4 px-0 font-black uppercase tracking-widest text-xs">AI Commentary</TabsTrigger>
                <TabsTrigger value="replays" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-4 px-0 font-black uppercase tracking-widest text-xs">Highlights</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="m-0">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Momentum Graph */}
                  <div className="md:col-span-2 glass-card p-8 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" /> Momentum Tracker
                      </h3>
                      <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-primary border-primary/20">Set 02 Active</Badge>
                    </div>
                    <div className="h-48 w-full flex items-end gap-1.5 pt-12">
                      {[40, 60, 80, 30, 50, 90, 70, 40, 60, 20, 80, 100, 50, 70, 90, 30, 40, 60, 50, 80].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-help group relative"
                          style={{ height: `${h}%` }}
                        >
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Point {i + 1} • Momentum: {h}%
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-2">
                      <span>Start of Set</span>
                      <span className="text-primary">Current Peak</span>
                    </div>
                  </div>

                  {/* Win Probability */}
                  <div className="glass-card p-8 rounded-[2.5rem] space-y-8 flex flex-col justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                    <div className="relative z-10 space-y-6">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Win Probability</h3>
                      <div className="relative inline-flex">
                        <svg className="h-32 w-32 rotate-[-90deg]">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * 0.32} className="text-primary" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-black italic tracking-tighter">68%</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-black uppercase text-sm italic">Viktor Axelsen</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Based on current form & lead</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="commentary" className="m-0">
                <div className="glass-card p-8 rounded-[2.5rem] space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide">
                  <AnimatePresence>
                    {commentary.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className={`p-2 rounded-lg ${msg.type === 'ai' ? 'bg-primary/10 text-primary' : 'bg-white/10 text-muted-foreground'}`}>
                          {msg.type === 'ai' ? <Zap className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                              {msg.type === 'ai' ? 'AI ANALYST' : 'MATCH EVENT'}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm font-bold">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              <TabsContent value="replays" className="m-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Incredible Smash Recovery", duration: "0:24", views: "1.2k" },
                    { title: "24-Shot Rally Marathon", duration: "1:15", views: "2.8k" },
                    { title: "First Set Winning Point", duration: "0:42", views: "940" },
                    { title: "AI Momentum Shift Analysis", duration: "0:56", views: "560" },
                  ].map((clip, i) => (
                    <div key={i} className="group cursor-pointer space-y-3">
                      <div className="aspect-video rounded-2xl bg-zinc-800 relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                          <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[8px] font-black">
                          {clip.duration}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs line-clamp-1 group-hover:text-primary transition-colors">{clip.title}</h4>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{clip.views} Views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Side Interaction Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-[2.5rem] flex flex-col h-[600px] border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Live Chat
                </h3>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Hub</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {[
                  { user: "SportFan99", text: "AXELSEN IS UNSTOPPABLE!", color: "text-blue-400" },
                  { user: "BadmintonPro", text: "Lee needs to focus on the net play.", color: "text-primary" },
                  { user: "MatchWatcher", text: "What a point!! 🔥", color: "text-orange-400" },
                  { user: "EliteScout", text: "Momentum is totally with Denmark now.", color: "text-green-400" },
                  { user: "ZiiJiaFan", text: "Come on Lee! You can do it!", color: "text-red-400" },
                  { user: "StatsKing", text: "68% win prob seems accurate.", color: "text-purple-400" },
                ].map((chat, i) => (
                  <div key={i} className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${chat.color}`}>{chat.user}</span>
                    <p className="text-xs font-bold leading-relaxed">{chat.text}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-white/5 bg-secondary/20">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Send a message..." 
                    className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-xs font-bold placeholder:text-muted-foreground"
                  />
                  <Button size="icon" className="h-12 w-12 rounded-xl bg-primary text-black hover:scale-105 transition-transform shrink-0">
                    <Star className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                  {['🔥', '😮', '👏', '🏆', '💯'].map((emoji) => (
                    <button key={emoji} className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-[2rem] border-primary/20 bg-primary/5 space-y-4">
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary">Up Next</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center font-black text-[10px]">P2</div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold line-clamp-1 group-hover:text-primary">An Se-young vs Tai Tzu-ying</h4>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mt-1">Starts in 45m</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveStream;