"use client";

import React from 'react';
import { Zap } from 'lucide-react';

const Logo = ({ className = "h-10 w-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-[#0B1F3A] w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-sky-500/10 group">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative flex items-center justify-center w-full h-full p-2">
          {/* Enhanced Racquet and Shuttle Design */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-full h-full text-white"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Elegant Racquet Frame */}
            <circle cx="12" cy="8" r="6" />
            <path d="M12 14v6M9 20h6" strokeWidth="1.5" />
            
            {/* Distinct Shuttlecock Icon in middle */}
            <path 
              d="M10 7.5l2 2.5 2-2.5M10 5.5l2 2.5 2-2.5" 
              className="text-sky-400" 
              strokeWidth="1.5" 
            />
            <path d="M11 11h2" className="text-sky-400" strokeWidth="1.5" />
          </svg>
          
          {/* Thunder Accent */}
          <div className="absolute -top-0.5 -right-0.5">
            <Zap className="h-4 w-4 text-sky-400 fill-sky-400 drop-shadow-[0_0_5px_rgba(14,165,233,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;