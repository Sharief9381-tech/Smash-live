"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-6 mb-16">
      <div className="container flex flex-col items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span className="text-lg font-black tracking-tighter text-[#0B1F3A] uppercase">
            Smash<span className="text-sky-500">Live</span>
          </span>
        </Link>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
          © 2024 SmashLive Technologies • Operational Node Active
        </p>
      </div>
    </footer>
  );
};

export default Footer;