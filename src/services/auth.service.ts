"use client";

import { supabase } from '@/lib/supabase';

const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    if (!isConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('mobile', mobile)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (err) {
      console.warn("Database sync unavailable. Falling back to local search.");
      return null;
    }
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    // If Supabase is NOT configured, or the request fails, we fall back to a local mock
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

        if (!error) {
          console.log('Profile Saved to Cloud Database');
          return data;
        }
        console.error("Supabase Insert Error:", error.message);
      } catch (err) {
        console.warn("Connection failure detected. Falling back to Local Storage mode.");
      }
    }

    // LOCAL FALLBACK: Ensure the user can still test the app
    const mockProfile = { 
      ...profileData, 
      id: 'local_' + Math.random().toString(36).substr(2, 9),
      onboardingComplete: true,
      smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000)
    };
    
    // Save to a local "database" list for the rankings page to find
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    registered.push(mockProfile);
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