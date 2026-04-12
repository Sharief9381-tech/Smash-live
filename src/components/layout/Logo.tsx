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
          {/* Stylized Shuttlecock SVG */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-8 h-8 text-white transition-transform group-hover:scale-110 duration-500"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Shuttlecock Head/Base */}
            <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
            
            {/* Shuttlecock Feathers */}
            <path d="M10 14L7 6h10l-3 8" strokeWidth="1.5" />
            <path d="M10 10h4" strokeWidth="1" className="opacity-50" />
            <path d="M9 7l1 7M15 7l-1 7" strokeWidth="1" className="opacity-50" />
          </svg>
          
          {/* Integrated Thunder/Zap Accent */}
          <div className="absolute -top-0.5 -right-0.5">
            <Zap className="h-4.5 w-4.5 text-sky-400 fill-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;