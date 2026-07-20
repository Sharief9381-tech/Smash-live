"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, Edit3, LogOut, ShieldCheck, Flag, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const ProfileHero = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Athlete",
    country: "India",
    state: "Regional",
    image: "",
    height: "--",
    smashId: "SMASH#0000"
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setProfileData(JSON.parse(saved));
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 rounded-full p-1 bg-gradient-to-br from-[#0B1F3A] to-sky-500 shadow-lg shrink-0">
          <div className="h-full w-full rounded-full bg-slate-100 border-2 border-white overflow-hidden flex items-center justify-center">
            {profileData.image ? (
              <img src={profileData.image} className="w-full h-full object-cover" alt="" />
            ) : (
              <span className="text-[20px] font-black text-[#0B1F3A]">{profileData.name[0].toUpperCase()}</span>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <h1 className="uppercase italic leading-none">{profileData.name}</h1>
            <ShieldCheck className="h-4 w-4 text-sky-500" />
          </div>
          <p className="text-sky-600 font-mono text-[10px] font-black uppercase tracking-widest italic">{profileData.smashId}</p>
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            <span className="flex items-center gap-1"><Flag className="h-3 w-3 text-sky-500" /> {profileData.country}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-500" /> {profileData.state}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-y border-slate-50 py-4">
        {[
          { label: 'Rank', val: '--', color: 'text-[#0B1F3A]' },
          { label: 'Win Rate', val: '0%', color: 'text-sky-600' },
          { label: 'Points', val: '0', color: 'text-[#0B1F3A]' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{s.label}</p>
            <p className={cn("text-[16px] font-black italic", s.color)}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => { navigator.clipboard.writeText(window.location.href); showSuccess("Copied!"); }} variant="outline" className="flex-1 h-9 rounded-lg border-slate-100 text-[11px] font-black uppercase"><Share2 className="mr-2 h-3.5 w-3.5" /> Share</Button>
        <Link to="/player/edit" className="flex-1">
          <Button variant="outline" className="w-full h-9 rounded-lg border-slate-100 text-[11px] font-black uppercase"><Edit3 className="mr-2 h-3.5 w-3.5" /> Edit</Button>
        </Link>
        <Button onClick={handleSignOut} variant="ghost" className="h-9 w-9 p-0 rounded-lg text-red-500 hover:bg-red-50"><LogOut className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default ProfileHero;