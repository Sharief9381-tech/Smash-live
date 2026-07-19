"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, Home, Trophy, Radio, 
  ListOrdered, User, Menu, X, 
  Zap, PlusSquare, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Athlete");
  const [userImage, setUserImage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change' as any, checkAuth);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change' as any, checkAuth);
    };
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: isLoggedIn ? '/dashboard' : '/', icon: Home },
    { name: 'Tournaments', path: '/tournaments', icon: Trophy },
    { name: 'Live', path: '/live-match/active', icon: Radio },
    { name: 'Rankings', path: '/rankings', icon: ListOrdered },
    { name: 'Profile', path: '/player/me', icon: User },
  ];

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      {/* Top Header - Compact for Mobile */}
      <header className={cn(
        "sticky top-0 z-[50] w-full transition-all duration-300 h-16 flex items-center border-b",
        isScrolled ? "bg-background/95 backdrop-blur-md border-white/5 shadow-lg" : "bg-background border-transparent"
      )}>
        <div className="container flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Smash<span className="text-primary">Live</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            </button>

            {isLoggedIn ? (
              <Link to="/player/me" className="flex items-center group">
                <Avatar className="h-8 w-8 border-2 border-white/10 group-hover:border-primary transition-all">
                  <AvatarImage src={userImage} />
                  <AvatarFallback className="font-black bg-muted text-xs">{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-primary text-white font-black text-[10px] uppercase h-8 px-4 rounded-full">
                  Login
                </Button>
              </Link>
            )}
            
            {/* Desktop Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-muted-foreground"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-[50] h-16 bg-card/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 md:hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative"
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform",
                isActive ? "text-primary scale-110" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="bottomNav"
                  className="absolute -top-[1px] h-0.5 w-8 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Slide-out Menu for Desktop/Overflow items */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card z-[70] p-8 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-black italic uppercase">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:bg-white/5 rounded-full transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 py-4 px-6 rounded-2xl text-lg font-black uppercase tracking-widest transition-all",
                      location.pathname === item.path ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-white/5 my-4" />
                <Link 
                  to="/smashed"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 py-4 px-6 rounded-2xl text-lg font-black uppercase tracking-widest text-muted-foreground hover:bg-white/5"
                >
                  <PlusSquare className="h-5 w-5" />
                  Studio Dashboard
                </Link>
                <Link 
                  to="/news"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 py-4 px-6 rounded-2xl text-lg font-black uppercase tracking-widest text-muted-foreground hover:bg-white/5"
                >
                  <Zap className="h-5 w-5" />
                  Latest News
                </Link>
              </div>

              <div className="mt-auto pt-8">
                 <div className="p-6 rounded-3xl bg-muted/30 border border-white/5 text-center">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Operational Status</p>
                    <div className="flex items-center justify-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                       <span className="text-xs font-bold">Systems Online</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;