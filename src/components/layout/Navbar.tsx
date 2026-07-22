"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("V. Axelsen");
  const [userImage, setUserImage] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
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
  }, []);

  const navItems = [
    { name: isLoggedIn ? 'COURT' : 'Home', path: isLoggedIn ? '/dashboard' : '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Studio', path: '/broadcast/center' },
    { name: 'Rankings', path: '/rankings' },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 h-20 flex items-center border-b",
      isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
    )}>
      <div className="container flex items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <Logo className="h-11 w-11" />
            <span className="hidden sm:block text-2xl font-black tracking-tighter text-[#0B1F3A] uppercase">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.15em] transition-colors hover:text-sky-500",
                  location.pathname === item.path ? "text-sky-500" : "text-[#0B1F3A]/70"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link to="/player/me" className="flex items-center group">
              <Avatar className="h-10 w-10 border-2 border-slate-200 group-hover:border-sky-500 transition-all shadow-sm">
                <AvatarImage src={userImage} />
                <AvatarFallback className="font-black bg-slate-100">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-[#0B1F3A] text-white px-7 rounded-full font-black text-xs hover:bg-[#0B1F3A]/90 transition-all border-none h-11">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;