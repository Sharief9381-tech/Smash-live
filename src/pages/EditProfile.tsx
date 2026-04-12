"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Camera, Globe, Shield, Trophy,
  ChevronLeft, Save, Zap, MapPin, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const LOCATION_DATA: Record<string, string[]> = {
  "Denmark": ["Hovedstaden", "Sjælland", "Syddanmark", "Midtjylland", "Nordjylland"],
  "China": ["Guangdong", "Beijing", "Shanghai", "Zhejiang", "Fujian"],
  "Indonesia": ["Jakarta", "West Java", "East Java", "Central Java", "Bali"],
  "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Chonburi"],
  "Malaysia": ["Selangor", "Penang", "Johor", "Kuala Lumpur"],
  "India": ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Aichi", "Hokkaido"],
  "Singapore": ["Central", "North", "North-East", "East", "West"]
};

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "Viktor Axelsen",
    country: "Denmark",
    state: "Hovedstaden",
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop",
    gender: "men",
    dob: "1994-01-04",
    category: "singles",
    hand: "right",
    height: "194",
    coach: "Kenneth Jonassen",
    club: "Odense Badminton Klub"
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    showSuccess("Intelligence dossier updated successfully!");
    navigate('/player/me');
  };

  const handleCountryChange = (country: string) => {
    setFormData({ 
      ...formData, 
      country, 
      state: LOCATION_DATA[country]?.[0] || "" 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      <main className="container max-w-5xl px-6 py-12">
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black tracking-tighter">Edit Intelligence Profile</h1>
            <Button onClick={handleSave} className="bg-[#0B1F3A] text-white font-black px-8 rounded-2xl h-14 shadow-xl">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic"><User className="h-5 w-5 text-sky-500" /> Identity Intelligence</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Player Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country</Label>
                    <Select value={formData.country} onValueChange={handleCountryChange}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold"><SelectValue placeholder="Select Country" /></SelectTrigger>
                      <SelectContent>{Object.keys(LOCATION_DATA).map(country => <SelectItem key={country} value={country}>{country}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State / Region</Label>
                    <Select value={formData.state} onValueChange={(state) => setFormData({...formData, state})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold"><SelectValue placeholder="Select State" /></SelectTrigger>
                      <SelectContent>{formData.country && LOCATION_DATA[formData.country]?.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Height (cm)</Label>
                    <Input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>
              </section>
              <div className="pt-6 flex gap-4">
                <Button onClick={handleSave} className="flex-1 bg-[#0B1F3A] text-white font-black h-16 rounded-2xl shadow-xl">Sync Intelligence <Zap className="ml-2 h-4 w-4 fill-current" /></Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;