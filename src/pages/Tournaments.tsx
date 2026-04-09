"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, ListFilter, ArrowRight,
  Globe, Zap, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Tournaments = () => {
  const categories = ["All Events", "BWF World Tour", "Championships", "Local Clubs", "Youth"];
  
  const tournaments = [
    {
      id: "bwf-finals-2024",
      name: "BWF World Tour Finals",
      date: "Dec 12 - 18, 2024",
      location: "Jakarta, Indonesia",
      status: "Live",
      category: "Major",
      participants: 32,
      prize: "$2.5M",
      img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "all-england-2025",
      name: "All England Open 2025",
      date: "Mar 11 - 16, 2025",
      location: "Birmingham, UK",
      status: "Upcoming",
      category: "Super 1000",
      participants: 128,
      prize: "$1.3M",
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "malaysia-open-2025",
      name: "PETRONAS Malaysia Open",
      date: "Jan 07 - 12, 2025",
      location: "Kuala Lumpur, MY",
      status: "Upcoming",
      category: "Super 1000",
      participants: 96,
      prize: "$1.2M",
      img: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Global Pro Circuit</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Tournaments</h1>
          <p className="text-muted-foreground max-w-2xl font-medium">Explore the world's most prestigious badminton events, track brackets, and watch history in the making.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide w-full md:w-auto">
            {categories.map((cat, i) => (
              <Button 
                key={i} 
                variant={i === 0 ? "default" : "outline"} 
                className={`rounded-xl px-6 h-11 font-bold whitespace-nowrap ${i === 0 ? 'bg-primary text-black' : 'border-white/5 hover:bg-white/5'}`}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none flex items-center bg-secondary/50 rounded-xl px-4 h-11 border border-white/5 focus-within:border-primary/50 transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Find event..." 
                className="bg-transparent border-none outline-none text-sm font-medium px-3 w-full md:w-40"
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-white/5">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((t) => (
            <Link key={t.id} to={`/tournament/${t.id}`}>
              <div className="group relative glass-card rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={t.img} 
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale-[50%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <Badge className={t.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-primary text-black'}>
                      {t.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t.category}</span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.date}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{t.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {t.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Users className="h-3.5 w-3.5" /> {t.participants} Players
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Prize Pool</span>
                      <span className="text-lg font-black text-primary">{t.prize}</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Hub Section */}
        <section className="glass-card p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
            <Globe className="h-80 w-80" />
          </div>
          
          <div className="space-y-6 max-w-xl relative z-10">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-current" />
              <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Organizer Network</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Hosting your own tournament?</h2>
            <p className="text-muted-foreground font-medium">Get access to professional-grade bracket management, live scoring tools, and global broadcasting features.</p>
            <Link to="/tournaments/create">
              <Button className="h-14 px-8 bg-primary text-black font-black rounded-2xl shadow-[0_20px_40px_rgba(182,255,42,0.1)]">
                LAUNCH EVENT STUDIO
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
            {[
              { label: "Events Managed", val: "1.4k+" },
              { label: "Active Regions", val: "42" },
              { label: "Pro Scouters", val: "850+" },
              { label: "Fan Base", val: "2.8M" }
            ].map((s, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl text-center border-white/10">
                <p className="text-2xl font-black">{s.val}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tournaments;