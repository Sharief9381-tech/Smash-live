"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, Trophy, Activity, Users, Zap, Check } from 'lucide-react';
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
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Viktor Axelsen just won Set 1 (21-19)", time: "2m ago", unread: true },
    { id: 2, text: "Tournament 'BWF Finals' is now LIVE", time: "15m ago", unread: true },
    { id: 3, text: "Match Alert: Ginting vs Christie starting soon", time: "1h ago", unread: false },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(authStatus);
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserName(parsed.name);
        setUserImage(parsed.image);
      }
    };
    
    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: isLoggedIn ? 'COURT' : 'Home', path: isLoggedIn ? '/court' : '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Rankings', path: '/rankings' },
  ];

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 h-20 flex items-center border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
      )}>
        <div className="container flex items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo className="h-10 w-10 group-hover:scale-110 transition-transform" />
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
                    "text-sm font-black uppercase tracking-widest transition-colors hover:text-sky-500",
                    location.pathname === item.path ? "text-sky-500" : "text-[#0B1F3A]/70"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Casual Inline Search */}
            <div className={cn(
              "relative flex items-center transition-all duration-300",
              isSearchExpanded ? "w-64" : "w-10"
            )}>
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors z-10"
              >
                <Search className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.input 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    placeholder="Search intelligence..."
                    className="absolute right-0 h-10 bg-slate-50 border border-slate-200 rounded-full pl-4 pr-10 text-xs font-bold focus:border-sky-500 outline-none"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Active Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 rounded-3xl border-slate-200 shadow-2xl">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Live Alerts</span>
                  <button className="text-[10px] font-bold text-sky-500 uppercase">Mark All Read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer", n.unread && "bg-sky-50/30")}>
                      <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0">
                        <Zap className="h-4 w-4 fill-current" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#0B1F3A] leading-tight">{n.text}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-100 text-center">
                  <Link to="/news" className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-widest hover:text-sky-500">View All Updates</Link>
                </div>
              </PopoverContent>
            </Popover>
            
            {isLoggedIn ? (
              <Link to="/player/me" className="flex items-center group outline-none">
                <Avatar className="h-10 w-10 border-2 border-slate-200 group-hover:border-sky-500 transition-all">
                  <AvatarImage src={userImage} />
                  <AvatarFallback className="font-black bg-slate-100">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button className="bg-[#0B1F3A] text-white px-8 rounded-full font-black text-sm hover:bg-[#0B1F3A]/90 transition-all border-none">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;