"use client";

import { supabase } from '@/lib/supabase';

const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    let profile = null;

    // 1. Try Cloud Database if configured
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

    // 2. Fallback: Check Local Storage (for preview/offline mode)
    if (!profile) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      profile = registered.find((u: any) => u.mobile === mobile || u.phone === mobile);
    }

    return profile;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    let savedProfile = null;

    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            {
              name: profileData.name,
              gender: profileData.gender,
              country: 'India',
              state: profileData.state,
              mobile: profileData.mobile,
              onboarding_complete: true
            }
          ])
          .select()
          .single();

        if (!error) savedProfile = data;
      } catch (err) {
        console.warn("Cloud registration failed, using local mode.");
      }
    }

    // Always ensure a local copy exists for the rankings/login to work without internet
    const mockProfile = savedProfile || { 
      ...profileData, 
      id: 'local_' + Math.random().toString(36).substr(2, 9),
      onboardingComplete: true,
      smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000)
    };
    
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    // Prevent duplicates in local list
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
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('temp_reg');
  }
};