"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Newspaper, Zap, TrendingUp, Clock, 
  ArrowRight, Share2, Bookmark, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const News = () => {
  const featuredNews = {
    title: "The Axelsen Era: Decoding the Physics of the World's Most Efficient Smash",
    category: "Technical Analysis",
    author: "Dr. Elena Chen",
    time: "42 min ago",
    img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"
  };

  const newsList = [
    {
      title: "Jakarta to Host BWF World Tour Finals 2025 with Record Prize Pool",
      cat: "Tournament News",
      time: "2 hours ago",
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "AI-Driven Coaching: How Data is Reshaping Youth Development in Asia",
      cat: "Intelligence",
      time: "5 hours ago",
      img: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Top 5 Defensive Rallies of the Season: A Frame-by-Frame Breakdown",
      cat: "Highlights",
      time: "8 hours ago",
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-16">
        {/* Editorial Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
            <Newspaper className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">Global Editorial Hub</span>
          </div>
          <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter leading-[0.95]">
            SmashLive <span className="text-sky-500">Stories</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Deep-dive analysis, tournament coverage, and the latest intelligence from the world of professional badminton.
          </p>
        </div>

        {/* Featured Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-[21/9] rounded-[3rem] overflow-hidden group cursor-pointer border border-slate-100 shadow-2xl"
        >
          <img 
            src={featuredNews.img} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            alt="Featured story"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />
          
          <div className="absolute bottom-0 inset-x-0 p-12 space-y-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-sky-500 text-white font-black px-4 py-1">{featuredNews.category}</Badge>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-3 w-3" /> {featuredNews.time}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl leading-[1.1] tracking-tighter group-hover:text-sky-300 transition-colors">
              {featuredNews.title}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-black">EC</div>
                <span className="text-white font-bold text-sm">By {featuredNews.author}</span>
              </div>
              <Button size="lg" className="bg-white text-[#0B1F3A] hover:bg-sky-500 hover:text-white rounded-full font-black px-8 h-14 transition-all">
                Read Full Analysis
              </Button>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {newsList.map((news, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="space-y-6 group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg">
                <img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{news.cat}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.time}</span>
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] leading-tight group-hover:text-sky-500 transition-colors">
                  {news.title}
                </h3>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                   <button className="text-slate-400 hover:text-sky-500 transition-colors"><Share2 className="h-4 w-4" /></button>
                   <button className="text-slate-400 hover:text-sky-500 transition-colors"><Bookmark className="h-4 w-4" /></button>
                   <div className="flex-1" />
                   <ArrowRight className="h-5 w-5 text-[#0B1F3A] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Intelligence Report Banner */}
        <section className="bg-[#0B1F3A] rounded-[3.5rem] p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <Zap className="h-80 w-80 text-sky-400" />
          </div>
          
          <div className="space-y-6 flex-1 relative z-10">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-sky-400 fill-current" />
              <span className="text-xs font-black text-sky-400 uppercase tracking-[0.3em]">SmashLive Pro exclusive</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Download the 2024 Global Performance Index</h2>
            <p className="text-white/60 font-medium max-w-lg">Our 120-page deep-dive into playstyles, fatigue metrics, and emerging trends across the top 100 players.</p>
            <Button size="lg" className="bg-sky-500 text-white rounded-full font-black px-10 h-16 shadow-2xl hover:bg-sky-400">
              Get Full Report
            </Button>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <p className="text-3xl font-black text-white">12k+</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Matches Analyzed</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">BWF Compliance</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;