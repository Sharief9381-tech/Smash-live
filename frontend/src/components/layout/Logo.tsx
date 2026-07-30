"use client";

import React from 'react';
import { Zap } from 'lucide-react';

const Logo = ({ className = "h-10 w-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-[#0B1F3A] w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-sky-500/10 group">
        {/* Dynamic background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Central Thunder Icon */}
        <div className="relative z-10">
          <Zap className="h-6 w-6 text-sky-400 fill-sky-400 drop-shadow-[0_0_12px_rgba(14,165,233,0.8)] transition-transform group-hover:scale-110 duration-500" />
        </div>

        {/* Subtle shuttle detail in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
            <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
            <path d="M10 14L7 6h10l-3 8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Logo;