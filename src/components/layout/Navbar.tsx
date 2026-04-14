"use client";

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Zap, Trophy, Radio, User, LogOut, LayoutDashboard } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="h-24 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="h-12 w-12 bg-[#0B1F3A] rounded-2xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform shadow-lg shadow-[#0B1F3A]/20">
          <Zap className="h-6 w-6 text-sky-500 fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter text-[#0B1F3A]">SMASH<span className="text-sky-500">INTEL</span></h1>
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Circuit Network</p>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <Link to="/tournaments" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0B1F3A] transition-colors">Tournaments</Link>
        <Link to="/live-match" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0B1F3A] transition-colors flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Live Feed
        </Link>
        <Link to="/broadcast/center" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0B1F3A] transition-colors">Studio</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-12 w-12 rounded-2xl hover:bg-slate-50 border border-slate-100">
                <Avatar className="h-full w-full rounded-2xl">
                  <AvatarFallback className="bg-sky-100 text-sky-600 font-black text-xs">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4 rounded-[2rem] border-slate-100 shadow-2xl mt-4">
              <div className="px-4 py-3 border-b border-slate-50 mb-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Authenticated Account</p>
                <p className="text-sm font-black text-[#0B1F3A] truncate">{profile?.full_name || 'Circuit User'}</p>
                {profile?.smash_id && (
                  <p className="text-[9px] font-black text-sky-500 uppercase mt-1">Smash ID: #{profile.smash_id}</p>
                )}
              </div>
              <DropdownMenuItem onClick={() => navigate('/broadcast/center')} className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest gap-3 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" /> Management Studio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="h-12 rounded-xl font-black text-[10px] uppercase tracking-widest gap-3 text-red-500 cursor-pointer">
                <LogOut className="h-4 w-4" /> Terminate Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate('/auth')} className="bg-[#0B1F3A] hover:bg-sky-500 text-white rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">
            Join Circuit
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;