"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Activity, Users, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Command Center', path: '/', icon: Activity },
    { name: 'Live Scores', path: '/live-match/active', icon: Trophy },
    { name: 'Players', path: '/player/1', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg rotate-12 group-hover:rotate-0 transition-transform">
              <Trophy className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Smash<span className="text-primary">Live</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center bg-secondary/50 rounded-full px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search matches..." 
              className="bg-transparent border-none outline-none text-xs font-medium px-3 w-40 placeholder:text-muted-foreground"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/5">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/20 to-primary flex items-center justify-center border-2 border-background cursor-pointer hover:scale-105 transition-transform">
            <span className="text-xs font-black text-black">JD</span>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;