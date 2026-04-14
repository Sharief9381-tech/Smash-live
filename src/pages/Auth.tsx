"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });

        if (authError) throw authError;

        // Smash ID Logic: Count existing profiles to assign the next number
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        const nextSmashId = (count || 0) + 1;

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user?.id, 
              full_name: fullName, 
              smash_id: nextSmashId,
              email: email
            }
          ]);

        if (profileError) throw profileError;
        showSuccess(`Welcome! Your Smash ID is #${nextSmashId}`);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showSuccess("Logged in successfully!");
      }
      navigate('/');
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="bg-[#0B1F3A] p-8 text-center space-y-2">
          <div className="h-16 w-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto rotate-12 shadow-xl shadow-sky-500/20">
            <Zap className="h-8 w-8 text-white fill-current" />
          </div>
          <CardTitle className="text-3xl font-black text-white italic uppercase tracking-tighter">
            {isSignUp ? "Join the Circuit" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-white/50 font-bold uppercase text-[10px] tracking-[0.2em]">
            Global Badminton Intel Network
          </CardDescription>
        </div>
        
        <CardContent className="p-10 bg-white">
          <form onSubmit={handleAuth} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <Input 
                    required 
                    placeholder="John Doe" 
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-bold"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <Input 
                  required 
                  type="email" 
                  placeholder="name@circuit.com" 
                  className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Secure Protocol</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <Input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-bold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-[#0B1F3A] hover:bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl group"
            >
              {loading ? "Processing..." : isSignUp ? "Generate Smash ID" : "Authenticate Access"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="text-center pt-4">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
              >
                {isSignUp ? "Already a member? Login here" : "Need a Smash ID? Register here"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;