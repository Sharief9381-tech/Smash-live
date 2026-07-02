"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, Camera, Edit3, LogOut, Globe, ShieldCheck, Flag, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const ProfileHero = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(1248200);
  const [profileData, setProfileData] = useState({
    name: "Viktor Axelsen",
    country: "Denmark",
    state: "Hovedstaden",
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop",
    height: "194"
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfileData(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccess("Profile link copied to clipboard!");
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setProfileData(prev => ({ ...prev, image: imageData }));
        localStorage.setItem('userProfile', JSON.stringify({
          ...profileData,
          image: imageData
        }));
        showSuccess("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative glass-panel p-12 rounded-[3.5rem] border-slate-200 overflow-hidden">
      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-3 flex justify-center">
          <div className="relative h-52 w-52 group">
            <div className="h-52 w-52 rounded-full p-1.5 bg-gradient-to-br from-sky-400 to-sky-600 shadow-2xl">
              <div className="h-full w-full rounded-full bg-slate-100 border-4 border-white overflow-hidden">
                <img src={profileData.image} className="w-full h-full object-cover" alt="Player" />
              </div>
            </div>
            <button
              onClick={handleProfilePictureClick}
              className="absolute bottom-2 right-2 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
              title="Click to change profile picture"
            >
              <Camera className="h-5 w-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <h1 className="text-6xl font-black tracking-tighter text-[#0B1F3A]">{profileData.name}</h1>
              <ShieldCheck className="h-8 w-8 text-sky-500" />
            </div>
            <p className="text-sky-600 font-mono text-xs tracking-[0.4em] font-black uppercase italic">SMASH ID: LIVE_001</p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2 text-[#0B1F3A]">
              <Flag className="h-4 w-4 text-sky-500" /> {profileData.country}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-500" /> {profileData.state}
            </div>
            <div className="italic">Right Handed • {profileData.height}cm</div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-12 py-6 border-y border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Followers</p>
              <p className="text-2xl font-black text-[#0B1F3A]">{(followers / 1000000).toFixed(2)}M</p>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Win Rate</p>
              <p className="text-2xl font-black text-sky-600">88.4%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-500 p-6 rounded-[2rem] text-white text-center shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">World Rank</p>
              <p className="text-4xl font-black">#1</p>
            </div>
            <div className="bg-[#0B1F3A] p-6 rounded-[2rem] text-white text-center shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Circuit Pts</p>
              <p className="text-4xl font-black tracking-tighter">105.4k</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setIsFollowing(!isFollowing)} className={cn("flex-1 h-14 rounded-2xl font-black uppercase tracking-widest transition-all text-xs", isFollowing ? "bg-slate-100 text-[#0B1F3A]" : "bg-sky-500 text-white shadow-xl hover:bg-sky-400")}>
              {isFollowing ? "FOLLOWING" : "FOLLOW"}
            </Button>
            <Button onClick={handleShare} variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:bg-sky-50 transition-colors">
              <Share2 className="h-5 w-5 text-[#0B1F3A]" />
            </Button>
            <Link to="/player/edit" className="flex-shrink-0">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:bg-sky-50">
                <Edit3 className="h-5 w-5 text-[#0B1F3A]" />
              </Button>
            </Link>
            <Button onClick={handleSignOut} variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-red-100 hover:bg-red-50 text-red-500">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;