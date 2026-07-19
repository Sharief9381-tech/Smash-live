"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Radio, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Tourneys', path: '/tournaments', icon: Trophy },
    { name: 'Live', path: '/live-match/active', icon: Radio },
    { name: 'Ladder', path: '/rankings', icon: BarChart3 },
    { name: 'Profile', path: '/player/me', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav-blur px-2 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all px-4 py-2 rounded-xl",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;