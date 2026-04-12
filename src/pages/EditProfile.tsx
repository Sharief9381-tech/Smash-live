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

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "Viktor Axelsen",
    country: "Denmark",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      <main className="container max-w-5xl px-6 py-12">
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sky-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Profile
              </button>
              <h1 className="text-4xl font-black tracking-tighter">Edit Intelligence Profile</h1>
            </div>
            <Button 
              onClick={handleSave}
              className="bg-[#0B1F3A] text-white font-black px-8 rounded-2xl h-14 shadow-xl hover:bg-[#0B1F3A]/90 transition-all border-none"
            >
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-panel p-8 rounded-[3rem] text-center space-y-6 border-slate-200 sticky top-24">
                <div className="relative inline-block group">
                  <div className="h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                    <img 
                      src={formData.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Profile"
                    />
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 h-10 w-10 bg-sky-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-sky-400 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">{formData.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Public Identifier: VA_01</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <User className="h-5 w-5 text-sky-500" /> Identity Intelligence
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Player Name</Label>
                    <Input 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</Label>
                    <Input 
                      value={formData.country} 
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" 
                    />
                  </div>
                </div>
              </section>

              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-sky-500" /> Professional Setup
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                        <SelectItem value="mixed">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Playing Hand</Label>
                    <Select value={formData.hand} onValueChange={(v) => setFormData({...formData, hand: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                        <SelectValue placeholder="Select hand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="right">Right-hand</SelectItem>
                        <SelectItem value="left">Left-hand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              <div className="pt-6 flex gap-4">
                <Button 
                  onClick={handleSave}
                  className="flex-1 bg-[#0B1F3A] text-white font-black h-16 rounded-2xl shadow-xl hover:bg-[#0B1F3A]/90 border-none"
                >
                  Sync Intelligence <Zap className="ml-2 h-4 w-4 fill-current" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="flex-1 border-slate-200 text-[#0B1F3A] font-black h-16 rounded-2xl hover:bg-slate-50"
                >
                  Discard Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;