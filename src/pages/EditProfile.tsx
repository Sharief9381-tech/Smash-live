"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, Camera, Globe, Shield, 
  ChevronLeft, Save, Zap, AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      <main className="container max-w-4xl px-6 py-12">
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

          <div className="grid md:grid-cols-12 gap-12">
            {/* Sidebar Controls */}
            <div className="md:col-span-4 space-y-8">
              <div className="glass-panel p-8 rounded-[3rem] text-center space-y-6 border-slate-200">
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
                   <Badge className="w-full justify-center bg-sky-500/10 text-sky-600 border-none h-8 font-black">PRO VERIFIED</Badge>
                   <p className="text-[9px] font-medium text-slate-400 leading-relaxed px-4">Your account is verified by BWF regional systems. Certain fields are locked.</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="md:col-span-8 space-y-8">
              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <User className="h-5 w-5 text-sky-500" /> Identity Intelligence
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Display Name</Label>
                    <Input defaultValue="Viktor Axelsen" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Public Handle</Label>
                    <Input defaultValue="@vaxelsen" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Bio</Label>
                  <Textarea 
                    className="min-h-[120px] bg-slate-50 border-slate-100 rounded-2xl p-6 font-bold focus:border-sky-500 transition-all resize-none"
                    placeholder="Describe your career milestones..."
                    defaultValue="Professional badminton player from Denmark. Currently ranked World No. 1. Multiple-time World Champion and Olympic Gold Medalist."
                  />
                </div>
              </section>

              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <Globe className="h-5 w-5 text-sky-500" /> Career Configuration
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nationality</Label>
                    <Input disabled defaultValue="Denmark" className="h-14 bg-slate-100 border-slate-200 rounded-2xl px-6 font-bold text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Playing Hand</Label>
                    <Input defaultValue="Right" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 transition-all" />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-4 border border-amber-100">
                   <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                   <p className="text-[10px] font-bold text-amber-600 leading-relaxed uppercase tracking-wider">
                     Nationality and Date of Birth can only be modified via official BWF documentation submission.
                   </p>
                </div>
              </section>

              <section className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <Shield className="h-5 w-5 text-sky-500" /> Visibility Preferences
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: "Public Profile Indexing", desc: "Allow your profile to be discovered via global rankings." },
                    { label: "Live Momentum Tracking", desc: "Share real-time match analytics with your followers." },
                    { label: "Broadcast Commentary Access", desc: "Allow AI analysts to access your historical data during live streams." }
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-[#0B1F3A]">{pref.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pref.desc}</p>
                      </div>
                      <div className="h-6 w-12 bg-sky-500 rounded-full relative p-1 cursor-pointer">
                        <div className="h-4 w-4 bg-white rounded-full absolute right-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-4 flex gap-4">
                <Button className="flex-1 bg-[#0B1F3A] text-white font-black h-16 rounded-2xl shadow-xl hover:bg-[#0B1F3A]/90 border-none">
                  Save Evolution <Zap className="ml-2 h-4 w-4 fill-current" />
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

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${className}`}>
    {children}
  </div>
);

export default EditProfile;