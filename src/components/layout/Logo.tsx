"use client";

import React from 'react';
import { Zap } from 'lucide-react';

const Logo = ({ className = "h-10 w-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-[#0B1F3A] w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-sky-500/10 group">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative flex items-center justify-center w-full h-full p-2">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-full h-full text-white"
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Minimalist Racquet + Shuttle Hybrid */}
            <circle cx="12" cy="9" r="6" stroke="currentColor" />
            <path d="M12 15v6M9 21h6" />
            {/* The "Shuttle" feathers inside the racquet head */}
            <path d="M10 7.5l2 3 2-3M10 5.5l2 3 2-3" strokeWidth="1.5" className="text-sky-400" />
          </svg>
          
          {/* The Thunder/Lightning Bolt - Integrated as a vibrant accent */}
          <div className="absolute top-1 right-1">
            <Zap className="h-4 w-4 text-sky-400 fill-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;