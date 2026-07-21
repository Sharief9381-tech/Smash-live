"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Athlete");
  const [userImage, setUserImage] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const checkAuth = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(authStatus);
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUserName(parsed.name || "Athlete");
          setUserImage(parsed.image || "");
        } catch (e) {}
      }
    };
    checkAuth();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav className={cn(
      "sticky top-0 z-[100] w-full h-[64px] flex items-center transition-all duration-500 px-6",
      isScrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg" 
        : "bg-background border-b border-transparent"
    )}>
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group active:scale-95 transition-transform">
          <Logo className="h-9 w-9" />
          <span className="text-[20px] font-black tracking-tighter text-foreground uppercase italic">
            Smash<span className="text-sky-500">Live</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-muted-foreground hover:text-sky-500 hover:bg-sky-500/10 rounded-xl transition-all active:scale-90"
            title="Toggle Appearance"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button className="relative p-2.5 text-muted-foreground hover:text-sky-500 hover:bg-sky-500/10 rounded-xl transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background" />
          </button>

          <div className="w-px h-6 bg-border mx-1" />

          {isLoggedIn ? (
            <Link to="/player/me" className="ml-1 active:scale-90 transition-transform">
              <Avatar className="h-9 w-9 border-2 border-border hover:border-sky-500 transition-colors shadow-lg">
                <AvatarImage src={userImage} />
                <AvatarFallback className="text-[11px] font-black bg-slate-900 text-sky-500">
                  {userName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-foreground text-background px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;