"use client";

import React from 'react';
import { 
  Play, Volume2, Maximize2, Settings, Users, 
  Heart, Share2, Flame, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LiveVideoPlayer = () => {
  return (
    <div className="relative group aspect-video w-full rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-white/5">
      <img 
        src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover opacity-60"
        alt="Match Feed"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      
      {/* Top Overlays */}
      <div className="absolute top-8 inset-x-8 flex justify-between items-start pointer-events-none">
        <div className="flex gap-4">
          <Badge className="bg-red-500 text-white border-none font-black px-4 py-1.5 animate-pulse flex gap-2 items-center">
            <span className="h-2 w-2 bg-white rounded-full" />
            LIVE NOW
          </Badge>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-1.5 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#b6ff2a]" />
            <span className="text-xs font-black text-white tabular-nums">12,482</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl text-white hover:bg-white/10">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl text-[#b6ff2a] hover:bg-[#b6ff2a]/10">
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>

      {/* Center Play Button (Mobile View) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-20 w-20 rounded-full bg-[#b6ff2a] flex items-center justify-center shadow-[0_0_50px_rgba(182,255,42,0.4)] cursor-pointer hover:scale-110 transition-transform">
          <Play className="h-8 w-8 text-black fill-current ml-1" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 inset-x-0 p-8 flex items-center justify-between translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-12 w-12">
            <Play className="h-6 w-6 fill-current" />
          </Button>
          <div className="flex items-center gap-4">
             <Volume2 className="h-5 w-5 text-white" />
             <div className="w-24 h-1 bg-white/20 rounded-full">
                <div className="h-full w-[80%] bg-[#b6ff2a] rounded-full" />
             </div>
          </div>
          <span className="text-xs font-mono font-black text-white">00:42:15</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer">
            <Settings className="h-5 w-5 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">1080p60</span>
          </div>
          <Maximize2 className="h-5 w-5 text-white cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Reaction Stream */}
      <div className="absolute bottom-24 right-8 flex flex-col gap-4">
         {[
           { icon: Flame, color: "text-orange-500" },
           { icon: Trophy, color: "text-amber-500" },
           { icon: Heart, color: "text-red-500" }
         ].map((Reaction, i) => (
           <motion.div 
             key={i}
             animate={{ y: [-20, -100], opacity: [0, 1, 0] }}
             transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
             className={cn("p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl", Reaction.color)}
           >
             <Reaction.icon className="h-5 w-5 fill-current" />
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default LiveVideoPlayer;