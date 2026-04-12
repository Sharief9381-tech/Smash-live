"use client";

import React from 'react';
import { Zap } from 'lucide-react';

const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-full h-full text-[#0B1F3A]"
      >
        {/* Racquet Frame */}
        <circle cx="12" cy="8" r="6" strokeWidth="2" />
        <path d="M12 14v7" strokeWidth="2" />
        <path d="M10 21h4" strokeWidth="2" />
        
        {/* Shuttlecock */}
        <path d="M10 6.5l2 3 2-3M10 5l2 3 2-3" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
      
      {/* Thunder/Lightning Bolt */}
      <div className="absolute -right-1 -top-1 bg-sky-500 rounded-full p-0.5 border-2 border-white">
        <Zap className="h-3 w-3 text-white fill-current" />
      </div>
    </div>
  );
};

export default Logo;