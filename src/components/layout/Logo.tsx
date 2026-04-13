"use client";

import React from 'react';

const Logo = ({ className = "h-10 w-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-[#1A1A1A] w-full h-full rounded-full flex items-center justify-center relative overflow-hidden group">
        {/* Minimalist Geometric Mark */}
        <div className="relative z-10 w-1/2 h-1/2 border-2 border-[#D4A373] rotate-45 group-hover:rotate-90 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      </div>
    </div>
  );
};

export default Logo;