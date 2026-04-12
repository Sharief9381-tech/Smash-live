"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Zap, X, Trophy, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("V. Axelsen");
  const [userImage, setUserImage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      setIsSearchOpen(false);
      navigate(`/rankings?q=${encodeURIComponent(globalSearch)}`);
    }
  };

  const navItems = [
    { name: isLoggedIn ? 'COURT' : 'Home', path: isLoggedIn ? '/court' : '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'News', path: '/news' },
    { name: 'Archive', path: '/archive' },
  ];

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 h-20 flex items-center border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
      )}>
        <div className="container flex items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
                <Zap className="h-5 w-5 fill-current" />
              </div>
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
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden md:block p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
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

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#0B1F3A] hover:text-sky-500 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
                    <Zap className="h-5 w-5 fill-current" />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-[#0B1F3A] uppercase">SmashLive</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#0B1F3A] hover:text-sky-500 transition-colors"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className={cn(
                        "text-3xl font-black uppercase tracking-tighter transition-colors",
                        location.pathname === item.path ? "text-sky-500" : "text-[#0B1F3A]"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100 space-y-6">
                  {!isLoggedIn && (
                    <Link to="/login">
                      <Button className="w-full h-16 bg-[#0B1F3A] text-white rounded-2xl font-black text-lg">
                        Login to Court
                      </Button>
                    </Link>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                      <Trophy className="h-5 w-5 text-sky-500" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Events</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                      <Activity className="h-5 w-5 text-red-500" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Casual Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0B1F3A]/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="w-full max-w-2xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">QUICK FIND</h2>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Access global intelligence database</p>
            </div>
            <form onSubmit={handleGlobalSearch} className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-sky-500" />
              <input 
                autoFocus
                placeholder="Search Players, Tournaments, or Smash ID..." 
                className="w-full h-20 bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 text-2xl font-black text-white outline-none focus:border-sky-500 transition-all"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </form>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Live Courts", icon: Activity },
                { label: "Event Studio", icon: Trophy },
                { label: "Pro Registry", icon: Users },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-sky-500/30 transition-all cursor-pointer text-center group">
                  <item.icon className="h-6 w-6 text-white/40 group-hover:text-sky-500 mx-auto mb-3" />
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;