"use client";

import React from 'react';
import { Search, Bell, User, PlusCircle, Trophy, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Activity className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">SMASHLIVE</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/tournaments" className="hover:text-primary transition-colors">Tournaments</Link>
            <Link to="/players" className="hover:text-primary transition-colors">Players</Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 max-w-md hidden lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search matches, players, tournaments..." 
              className="w-full bg-secondary/50 border-white/5 pl-10 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
          </Button>
          
          <Link to="/live-match/create">
            <Button className="bg-primary text-black hover:bg-primary/90 hidden sm:flex items-center gap-2 font-bold">
              <PlusCircle className="h-4 w-4" />
              START MATCH
            </Button>
          </Link>

          <div className="h-8 w-8 rounded-full bg-secondary border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;