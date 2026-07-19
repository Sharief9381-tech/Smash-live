"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const [userName, setUserName] = useState("Athlete");
  const [userImage, setUserImage] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserName(parsed.name || "Athlete");
        setUserImage(parsed.image || "");
      } catch (e) {
        console.error("Profile parse error");
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    checkAuth();
    
    // Listen for storage events (cross-tab and manual dispatch)
    window.addEventListener('storage', checkAuth);
    // Custom event for same-tab immediate updates
    window.addEventListener('auth-change' as any, checkAuth);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change' as any, checkAuth);
    };
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/rankings?q=${encodeURIComponent(searchVal)}`);
      setIsSearchExpanded(false);
      setSearchVal("");
    }
  };

  const navItems = [
    { name: isLoggedIn ? 'DASHBOARD' : 'Home', path: isLoggedIn ? '/dashboard' : '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Studio', path: '/broadcast/center' },
    { name: 'Ladder', path: '/rankings' },
    { name: 'News', path: '/news' },
    { name: 'Smashed', path: '/smashed' },
  ];

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 h-20 flex items-center border-b",
      isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
    )}>
      <div className="container flex items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#0B1F3A] hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <Logo className="h-11 w-11" />
              <span className="hidden sm:block text-2xl font-black tracking-tighter text-[#0B1F3A] uppercase">
                Smash<span className="text-sky-500">Live</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.15em] transition-colors hover:text-sky-50",
                  location.pathname === item.path ? "text-sky-500" : "text-[#0B1F3A]/70"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center relative">
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.form
                  onSubmit={handleSearchSubmit}
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  className="relative flex items-center"
                >
                  <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input 
                    autoFocus
                    placeholder="Search Intel..."
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-full pl-11 pr-10 text-xs font-bold focus:border-sky-500 outline-none shadow-sm"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute right-3 p-1 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                </motion.form>
              ) : (
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2.5 text-[#0B1F3A]/60 hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </AnimatePresence>
          </div>

          {isLoggedIn ? (
            <Link to="/player/me" className="flex items-center group">
              <Avatar className="h-10 w-10 border-2 border-slate-200 group-hover:border-sky-500 transition-all shadow-sm">
                <AvatarImage src={userImage} />
                <AvatarFallback className="font-black bg-slate-100">{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-[#0B1F3A] text-white px-7 rounded-full font-black text-xs hover:bg-[#0B1F3A]/90 transition-all border-none h-11 shadow-lg shadow-navy/10">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[70] lg:hidden p-8 flex flex-col gap-10 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo className="h-10 w-10" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-50 rounded-xl transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-black uppercase tracking-widest transition-all",
                      location.pathname === item.path ? "text-sky-500 translate-x-2" : "text-[#0B1F3A]/70 hover:translate-x-2"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;