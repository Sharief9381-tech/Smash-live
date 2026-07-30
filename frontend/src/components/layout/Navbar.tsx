"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Athlete");
  const [userImage, setUserImage] = useState("");
  const location = useLocation();

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
      isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
    )}>
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-8" />
          <span className="text-[18px] font-black tracking-tighter text-[#0B1F3A] uppercase">
            Smash<span className="text-sky-500">Live</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-[#0B1F3A]/60 hover:bg-slate-50 rounded-full transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {isLoggedIn ? (
            <Link to="/player/me">
              <Avatar className="h-8 w-8 border-2 border-slate-100 shadow-sm">
                <AvatarImage src={userImage} />
                <AvatarFallback className="text-[10px] font-black bg-slate-100">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login" className="text-[12px] font-black text-[#0B1F3A] uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;