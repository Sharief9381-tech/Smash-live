"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'News', path: '/news' },
    { name: 'Archive', path: '/archive' },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 h-20 flex items-center border-b",
      isScrolled ? "bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm" : "bg-white border-transparent"
    )}>
      <div className="container flex items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#0B1F3A] uppercase">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-sky-500",
                  location.pathname === item.path ? "text-sky-500" : "text-[#0B1F3A]/70"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/login">
            <Button className="bg-[#0B1F3A] text-white px-8 rounded-full font-bold hover:bg-[#0B1F3A]/90 transition-all shadow-lg hover:shadow-sky-500/20">
              Login
            </Button>
          </Link>
          <button className="lg:hidden p-2">
            <Menu className="h-6 w-6 text-[#0B1F3A]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;