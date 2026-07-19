"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Camera, Globe, Shield, Trophy,
  ChevronLeft, Save, Zap, MapPin, Activity, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

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
    smashId: "SMASH#0000",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showError("File too large. Maximum size is 2MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        showSuccess("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
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
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/player/me')}
                className="rounded-full h-12 w-12 hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-4xl font-black tracking-tighter">Edit Intelligence Profile</h1>
            </div>
            <Button onClick={handleSave} className="bg-[#0B1F3A] text-white font-black px-8 rounded-2xl h-14 shadow-xl">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <section className="glass-panel p-8 rounded-[3rem] border-slate-200 text-center space-y-6 bg-white">
                <div className="relative mx-auto h-48 w-48 group">
                  <div className="h-full w-full rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-xl">
                    <img src={formData.image} className="w-full h-full object-cover" alt="Profile preview" />
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <h4 className="font-black text-lg">{formData.smashId}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Unique Smash Identity</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-xl border-slate-200 font-bold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Choose File
                </Button>
              </section>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200 bg-white">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <User className="h-5 w-5 text-sky-500" /> Identity Intelligence
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Player Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</Label>
                    <Select value={formData.country} onValueChange={handleCountryChange}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(LOCATION_DATA).map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State / Region</Label>
                    <Select value={formData.state} onValueChange={(state) => setFormData({...formData, state})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.country && LOCATION_DATA[formData.country]?.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Height (cm)</Label>
                    <Input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>
              </section>

              <div className="pt-6">
                <Button onClick={handleSave} className="w-full bg-[#0B1F3A] text-white font-black h-20 rounded-[2rem] shadow-xl text-lg group">
                  SYNC INTELLIGENCE <Zap className="ml-2 h-6 w-6 fill-current group-hover:scale-125 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfile;