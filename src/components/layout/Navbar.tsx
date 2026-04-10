"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Zap, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Live', path: '/live-match/active' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'News', path: '/news' },
    { name: 'Archive', path: '/archive' },
  ];

  // Logic to determine if we should show Profile instead of Login
  const isInternalPage = ['/dashboard', '/player', '/archive', '/live-match', '/tournaments'].some(path => location.pathname.startsWith(path));

  return (
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
          <button className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-[#0B1F3A]/60 hover:text-sky-500 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          
          {isInternalPage ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 group outline-none">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-widest leading-none">V. Axelsen</p>
                    <p className="text-[8px] font-bold text-sky-500 uppercase tracking-tighter">Pro Member</p>
                  </div>
                  <Avatar className="h-10 w-10 border-2 border-slate-200 group-hover:border-sky-500 transition-all ring-offset-2 group-hover:ring-2 ring-sky-500/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" />
                    <AvatarFallback className="font-black">VA</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest text-slate-400 p-3">Account Intelligence</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/player/me" className="flex items-center gap-2 p-3 font-bold cursor-pointer hover:bg-slate-50 rounded-xl">
                    <User className="h-4 w-4 text-sky-500" /> Player Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button className="bg-[#0B1F3A] text-white px-8 rounded-full font-black text-sm hover:bg-[#0B1F3A]/90 transition-all shadow-lg hover:shadow-sky-500/20 border-none">
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
  );
};

export default Navbar;