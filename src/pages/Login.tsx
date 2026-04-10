"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Github, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#0B1F3A]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-[#0B1F3A] uppercase">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Enter your credentials to access the intelligence hub.</p>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</Label>
                <button className="text-[10px] font-black uppercase tracking-widest text-sky-600 hover:text-sky-500">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 transition-all"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/')}
            className="w-full h-16 bg-[#0B1F3A] text-white font-black text-lg rounded-full shadow-xl hover:bg-[#0B1F3A]/90 transition-all group"
          >
            Sign In <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-2xl border-slate-100 font-bold gap-2">
              <Github className="h-4 w-4" /> Github
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl border-slate-100 font-bold gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-500">
          Don't have an account? <Link to="/login" className="text-sky-600 font-black">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;