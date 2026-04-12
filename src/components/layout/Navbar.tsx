"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Zap, X, Trophy, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("V. Axelsen");
  const [userImage, setUserImage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
            <button className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
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
              <Link to="/login">
                <Button className="bg-[#0B1F3A] text-white px-8 rounded-full font-black text-sm hover:bg-[#0B1F3A]/90 transition-all border-none">
                  Login
                </Button>
              </Link>
            )}

            <button className="lg:hidden p-2">
              <Menu className="h-6 w-6 text-[#0B1F3A]" />
            </button>
          </div>
        </div>
      </nav>

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