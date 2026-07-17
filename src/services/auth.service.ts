"use client";

import { supabase } from '@/lib/supabase';

// Improved check to avoid hanging on placeholder URLs
const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && 
                   import.meta.env.VITE_SUPABASE_URL.startsWith('https://') &&
                   import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    let profile = null;

    // 1. Instant Cloud Check (only if actually configured)
    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('mobile', mobile)
          .single();
        
        if (!error && data) profile = data;
      } catch (err) {
        // Silently fail to local fallback immediately
      }
    }

    // 2. Local registry check
    if (!profile) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      profile = registered.find((u: any) => u.mobile === mobile || u.phone === mobile);
    }

    // 3. Fallback dossier initialization
    if (!profile) {
      profile = {
        name: "New Athlete",
        mobile: mobile,
        country: "India",
        state: "Maharashtra",
        gender: "male",
        smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000),
        onboardingComplete: false 
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
          .upsert([{ 
            ...profileData, 
            country: 'India', 
            onboarding_complete: true,
            updated_at: new Date().toISOString()
          }], { onConflict: 'mobile' })
          .select().single();
        
        if (!error) savedProfile = data;
      } catch (err) {
        // Fallback to local if cloud write fails
      }
    }

    const mockProfile = savedProfile || { 
      ...profileData, 
      id: 'athlete_' + Date.now(),
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
    window.dispatchEvent(new Event('storage'));
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    window.dispatchEvent(new Event('storage'));
  }
};