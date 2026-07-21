"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, Activity, ListOrdered, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return null;

  const items = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Studio', path: '/broadcast/center', icon: Radio },
    { name: 'Live', path: '/live-match/active', icon: Activity },
    { name: 'Ladder', path: '/rankings', icon: ListOrdered },
    { name: 'Profile', path: '/player/me', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-[64px] px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-90"
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "bg-primary text-sky-400" : "text-muted-foreground"
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-tight",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-bottom bg-background" />
    </div>
  );
};

export default BottomNav;