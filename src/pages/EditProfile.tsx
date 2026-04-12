"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Camera, Globe, Shield, Trophy,
  ChevronLeft, Save, Zap, AlertCircle, 
  MapPin, Activity, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      <main className="container max-w-5xl px-6 py-12">
        <div className="space-y-12">
          {/* Header */}
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
            <Button className="bg-[#0B1F3A] text-white font-black px-8 rounded-2xl h-14 shadow-xl hover:bg-[#0B1F3A]/90 transition-all border-none">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Image & Status */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-panel p-8 rounded-[3rem] text-center space-y-6 border-slate-200 sticky top-24">
                <div className="relative inline-block group">
                  <div className="h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Profile"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 h-10 w-10 bg-sky-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-sky-400 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">Viktor Axelsen</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Public Identifier: VA_01</p>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-3">
                   <div className="w-full inline-flex justify-center items-center h-8 bg-sky-500/10 text-sky-600 rounded-full font-black text-[10px] uppercase tracking-widest">PRO VERIFIED</div>
                   <p className="text-[9px] font-medium text-slate-400 leading-relaxed px-4">Your account is verified by BWF regional systems. Certain fields are locked.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Form Fields */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Identity Section */}
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <User className="h-5 w-5 text-sky-500" /> Identity Intelligence
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Player Name</Label>
                    <Input defaultValue="Viktor Axelsen" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</Label>
                    <Input defaultValue="Denmark" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
                    <Select defaultValue="men">
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date of Birth</Label>
                    <Input type="date" defaultValue="1994-01-04" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>
              </section>

              {/* Professional Configuration */}
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-sky-500" /> Professional Setup
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Category</Label>
                    <Select defaultValue="singles">
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
                    <Select defaultValue="right">
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

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Height (cm) <span className="text-[8px] font-normal opacity-50 italic">Optional</span></Label>
                    <Input placeholder="e.g. 194" defaultValue="194" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Coach / Institute <span className="text-[8px] font-normal opacity-50 italic">Optional</span></Label>
                    <Input placeholder="Current coach name" defaultValue="Kenneth Jonassen" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>
              </section>

              {/* Ranking Matrix */}
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3 italic">
                  <Trophy className="h-5 w-5 text-sky-500" /> Ranking Intelligence
                </h3>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">World Rank</Label>
                    <Input defaultValue="#1" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black text-sky-600" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State Rank</Label>
                    <Input defaultValue="#1" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Regional Rank</Label>
                    <Input defaultValue="#1" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State / Club Affiliation</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input defaultValue="Odense Badminton Klub" className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold" />
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="pt-6 flex gap-4">
                <Button className="flex-1 bg-[#0B1F3A] text-white font-black h-16 rounded-2xl shadow-xl hover:bg-[#0B1F3A]/90 border-none">
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