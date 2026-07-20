"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, Activity, Target, 
  Award, Trophy, TrendingUp, 
  MapPin, Edit3, Share2, LogOut,
  Star, Flame, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const PlayerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const tabs = [
    { id: 'stats', label: 'Intelligence', icon: Zap },
    { id: 'history', label: 'Campaigns', icon: Trophy },
    { id: 'achievements', label: 'Verified', icon: Award },
  ];

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-8 flex flex-col items-center text-center space-y-6">
           <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/20 to-transparent -z-10 blur-3xl opacity-50" />
           
           <div className="relative">
              <div className="h-32 w-32 rounded-full p-1 bg-gradient-to-br from-primary to-secondary shadow-2xl">
                 <div className="h-full w-full rounded-full bg-card border-4 border-background overflow-hidden flex items-center justify-center">
                    {profile.image ? (
                       <img src={profile.image} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                       <span className="text-4xl font-black italic text-primary">{profile.name?.[0]}</span>
                    )}
                 </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-secondary h-8 w-8 rounded-xl border-4 border-background flex items-center justify-center shadow-lg">
                 <ShieldCheck className="h-4 w-4 text-white" />
              </div>
           </div>

           <div className="space-y-2">
              <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{profile.name}</h1>
              <div className="flex items-center justify-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                 <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-primary" /> {profile.state || "National"}</span>
                 <span className="h-1 w-1 bg-white/10 rounded-full" />
                 <span className="text-primary italic">{profile.smashId || "Dossier Active"}</span>
              </div>
           </div>

           <div className="flex gap-3 w-full max-w-xs">
              <Link to="/player/edit" className="flex-1">
                 <Button className="w-full h-12 rounded-2xl bg-card border border-white/5 font-black text-[10px] uppercase tracking-widest gap-2">
                    <Edit3 className="h-4 w-4" /> Edit Profile
                 </Button>
              </Link>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-white/5 bg-card">
                 <Share2 className="h-4 w-4" />
              </Button>
              <Button onClick={handleSignOut} variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-all">
                 <LogOut className="h-4 w-4" />
              </Button>
           </div>
        </section>

        {/* 2. TAB NAVIGATION */}
        <div className="flex p-1.5 bg-card rounded-[2rem] border border-white/5 sticky top-20 z-40 shadow-xl backdrop-blur-md">
           {tabs.map(tab => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === tab.id ? "bg-primary text-white orange-glow" : "text-muted-foreground"
                )}
             >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
             </button>
           ))}
        </div>

        {/* 3. DYNAMIC CONTENT */}
        <div className="min-h-[400px]">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                 {activeTab === 'stats' && (
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Matches", val: "0", icon: Activity, color: "text-primary" },
                            { label: "Win Rate", val: "0%", icon: Target, color: "text-secondary" },
                            { label: "Smash Acc.", val: "0%", icon: Zap, color: "text-primary" },
                            { label: "Streak", val: "0", icon: Flame, color: "text-orange-400" },
                          ].map((s, i) => (
                             <div key={i} className="bg-card p-6 rounded-[2.5rem] border border-white/5 space-y-4 shadow-xl">
                                <div className={cn("h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center", s.color)}>
                                   <s.icon className="h-5 w-5" />
                                </div>
                                <div>
                                   <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                   <h4 className="text-2xl font-black tabular-nums italic leading-none">{s.val}</h4>
                                </div>
                             </div>
                          ))}
                       </div>

                       <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                          <div className="flex items-center justify-between">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Performance core</h4>
                             <TrendingUp className="h-4 w-4 text-secondary" />
                          </div>
                          <div className="py-20 text-center space-y-3">
                             <Activity className="h-10 w-10 text-muted-foreground/20 mx-auto animate-pulse" />
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Awaiting Biomechanical Data Sync</p>
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === 'history' && (
                    <div className="space-y-6">
                       <div className="bg-card p-10 rounded-[3rem] border border-white/5 text-center space-y-4">
                          <Trophy className="h-12 w-12 text-muted-foreground/20 mx-auto" />
                          <div className="space-y-2">
                             <h4 className="text-xl font-black uppercase italic">No Active Campaigns</h4>
                             <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">
                                Join a circuit to start building your professional career dossier.
                             </p>
                          </div>
                          <Link to="/tournaments" className="block pt-4">
                             <Button className="w-full h-14 bg-primary text-white rounded-2xl font-black text-[10px] tracking-widest uppercase">Start Campaign</Button>
                          </Link>
                       </div>
                    </div>
                 )}

                 {activeTab === 'achievements' && (
                    <div className="grid grid-cols-3 gap-4">
                       {[
                         { name: "Verified", icon: ShieldCheck },
                         { name: "Early Node", icon: Zap },
                         { name: "Arena Hero", icon: Star },
                       ].map((a, i) => (
                         <div key={i} className="bg-card/50 aspect-square rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-3 opacity-40 grayscale">
                            <a.icon className="h-8 w-8 text-primary" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-center">{a.name}</span>
                         </div>
                       ))}
                    </div>
                 )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* 4. PREMIUM CTA */}
        <section className="bg-gradient-to-br from-primary to-orange-700 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
              <Zap className="h-40 w-40 fill-current" />
           </div>
           <div className="relative z-10 space-y-2">
              <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter">Go Pro Studio</h3>
              <p className="text-xs font-medium opacity-80 uppercase tracking-widest leading-relaxed">
                 Unlock AI biomechanical charts, court heatmaps, and global scouting exposure.
              </p>
           </div>
           <Button className="w-full h-14 bg-white text-primary rounded-2xl font-black text-xs tracking-widest uppercase relative z-10 group active:scale-95 transition-all shadow-xl">
              Elevate Intelligence <ArrowUpRight className="ml-2 h-4 w-4" />
           </Button>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;