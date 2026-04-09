"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CourtViewProps {
  servingTeam: 1 | 2;
  shuttlePosition?: 'top' | 'bottom';
}

const CourtView = ({ servingTeam }: CourtViewProps) => {
  return (
    <div className="relative w-full aspect-[2/1] bg-[#121212] rounded-2xl border-4 border-[#2a2a2a] overflow-hidden flex items-center justify-center">
      {/* Court Lines */}
      <div className="absolute inset-4 border-2 border-white/20">
        {/* Net */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/40 -translate-x-1/2 flex flex-col justify-around">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-1 w-full bg-white/10" />
          ))}
        </div>
        
        {/* Middle Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2" />
        
        {/* Side Lines for Doubles */}
        <div className="absolute left-0 right-0 top-1 h-px bg-white/10" />
        <div className="absolute left-0 right-0 bottom-1 h-px bg-white/10" />
      </div>

      {/* Players */}
      <motion.div 
        animate={{ x: servingTeam === 1 ? -40 : 40, y: -20 }}
        className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className={`h-10 w-10 rounded-full ${servingTeam === 1 ? 'bg-primary ring-4 ring-primary/20' : 'bg-white/10'} flex items-center justify-center font-bold text-black`}>
          T1
        </div>
        {servingTeam === 1 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary uppercase"
          >
            Serving
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        animate={{ x: servingTeam === 2 ? 40 : -40, y: 20 }}
        className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className={`h-10 w-10 rounded-full ${servingTeam === 2 ? 'bg-primary ring-4 ring-primary/20' : 'bg-white/10'} flex items-center justify-center font-bold text-black`}>
          T2
        </div>
        {servingTeam === 2 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary uppercase"
          >
            Serving
          </motion.div>
        )}
      </motion.div>

      {/* Shuttle Simulation */}
      <motion.div 
        animate={{ 
          x: servingTeam === 1 ? [-100, 100] : [100, -100],
          y: [-20, -50, -20]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] z-20"
      />
      
      <div className="absolute top-4 left-4">
        <Badge className="bg-red-500 animate-pulse text-[10px] h-5">LIVE</Badge>
      </div>
      
      <div className="absolute bottom-4 right-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        Court 01 • Main Arena
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";

export default CourtView;