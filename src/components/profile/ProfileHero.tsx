"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, Camera, Edit3, LogOut, Globe, ShieldCheck, Flag } from 'lucide-react';
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
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
    const following = localStorage.getItem('isFollowing');
    if (following === 'true') setIsFollowing(true);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData.name} - SmashLive Profile`,
          text: 'Check out this elite badminton intelligence dossier on SmashLive.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showSuccess("Profile link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  const toggleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    setFollowers(prev => newState ? prev + 1 : prev - 1);
    localStorage.setItem('isFollowing', newState.toString());
    showSuccess(newState ? `Following ${profileData.name}` : `Unfollowed ${profileData.name}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newData = { ...profileData, image: base64String };
        setProfileData(newData);
        localStorage.setItem('userProfile', JSON.stringify(newData));
        showSuccess("Profile image updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative glass-panel p-12 rounded-[3.5rem] border-slate-200 overflow-hidden">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      
      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-3 flex justify-center">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="h-52 w-52 rounded-full p-1.5 bg-gradient-to-br from-sky-400 to-sky-600 shadow-2xl transition-transform hover:scale-105 duration-500">
              <div className="h-full w-full rounded-full bg-slate-100 border-4 border-white overflow-hidden relative">
                <img 
                  src={profileData.image} 
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-70"
                  alt="Player"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <Camera className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
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
              <Globe className="h-4 w-4 text-sky-500" /> Europe Circuit
            </div>
            <div className="italic">Right Handed • 194cm</div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-12 py-6 border-y border-slate-100">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Followers</p>
              <p className="text-2xl font-black text-[#0B1F3A]">{(followers / 1000000).toFixed(2)}M</p>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Following</p>
              <p className="text-2xl font-black text-[#0B1F3A]">142</p>
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
            <div className="bg-sky-500 p-6 rounded-[2rem] text-white text-center shadow-[0_15px_30px_rgba(14,165,233,0.2)]">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">World Rank</p>
              <p className="text-4xl font-black">#1</p>
            </div>
            <div className="bg-[#0B1F3A] p-6 rounded-[2rem] text-white text-center shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Circuit Pts</p>
              <p className="text-4xl font-black tracking-tighter">105.4k</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={toggleFollow}
              className={cn(
                "flex-1 h-14 rounded-2xl font-black uppercase tracking-widest transition-all text-xs",
                isFollowing ? "bg-slate-100 text-[#0B1F3A] border-slate-200" : "bg-sky-500 text-white shadow-xl hover:bg-sky-400 border-none"
              )}
            >
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