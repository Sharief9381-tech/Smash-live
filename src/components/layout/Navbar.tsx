"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Athlete");
  const [userImage, setUserImage] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const checkAuth = () => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserName(parsed.name || "Athlete");
        setUserImage(parsed.image || "");
      } catch (e) { console.error("Profile error"); }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize theme from local storage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  return (
    <nav className={cn(
      "sticky top-0 z-[100] w-full h-[56px] flex items-center transition-all px-4 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md border-border shadow-sm" : "bg-background border-transparent"
    )}>
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-8" />
          <span className="text-[18px] font-black tracking-tighter text-foreground uppercase">
            Smash<span className="text-sky-500">Live</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-900 rounded-full transition-all"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button className="relative p-2 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-900 rounded-full transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background" />
          </button>

          {isLoggedIn ? (
            <Link to="/player/me" className="ml-1">
              <Avatar className="h-8 w-8 border-2 border-border shadow-sm">
                <AvatarImage src={userImage} />
                <AvatarFallback className="text-[10px] font-black bg-muted">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login" className="ml-1 text-[12px] font-black text-foreground uppercase tracking-wider bg-muted px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;