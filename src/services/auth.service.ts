"use client";

import { supabase } from '@/lib/supabase';

const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    let profile = null;

    // 1. Try Cloud Database
    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('mobile', mobile)
          .single();
        
        if (!error) profile = data;
      } catch (err) {
        console.warn("Cloud sync unavailable.");
      }
    }

    // 2. Local Storage check
    if (!profile) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      profile = registered.find((u: any) => u.mobile === mobile || u.phone === mobile);
    }

    // 3. AUTO-CREATE FALLBACK (Prevents getting stuck)
    if (!profile && !isConfigured) {
      console.log("Athlete not found, initializing auto-dossier for local session.");
      profile = {
        name: "New Athlete",
        mobile: mobile,
        country: "India",
        state: "Maharashtra",
        gender: "male",
        smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000),
        onboardingComplete: false // This will trigger the onboarding flow
      };
    }

    return profile;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    let savedProfile = null;

    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([{ ...profileData, country: 'India', onboarding_complete: true }])
          .select().single();
        if (!error) savedProfile = data;
      } catch (err) {
        console.warn("Cloud registration failed.");
      }
    }

    const mockProfile = savedProfile || { 
      ...profileData, 
      id: 'local_' + Math.random().toString(36).substr(2, 9),
      onboardingComplete: true,
      smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000)
    };
    
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const exists = registered.findIndex((u: any) => u.mobile === profileData.mobile);
    if (exists > -1) registered[exists] = mockProfile;
    else registered.push(mockProfile);
    
    localStorage.setItem('registered_users', JSON.stringify(registered));
    return mockProfile;
  },

  setLocalSession(profile: any) {
    if (!profile) return;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },

  logout() {
    localStorage.clear();
  }
};