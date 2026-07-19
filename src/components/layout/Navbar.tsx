"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      const saved = localStorage.getItem('userProfile');
      if (saved) setProfile(JSON.parse(saved));
    };
    checkAuth();
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full h-16 flex items-center transition-all px-4",
      isScrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-background"
    )}>
      <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Zap className="h-5 w-5 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            SMASH<span className="text-primary">LIVE</span>
          </span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          <Link to="/dashboard" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Home</Link>
          <Link to="/tournaments" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Tourneys</Link>
          <Link to="/live-match/active" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Live</Link>
          <Link to="/rankings" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Ladder</Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-secondary rounded-full border-2 border-background" />
          </button>

          {isLoggedIn ? (
            <Link to="/player/me">
              <Avatar className="h-9 w-9 border-2 border-white/10 ring-2 ring-primary/20">
                <AvatarImage src={profile?.image} />
                <AvatarFallback className="bg-muted text-[10px] font-black">{profile?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary text-white font-black text-[10px] uppercase h-9 px-5 rounded-xl">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;