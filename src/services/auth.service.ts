"use client";

import { supabase } from '@/lib/supabase';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('mobile', mobile)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (err) {
      console.warn("Database sync unavailable. Error:", err);
      // Fallback for demonstration/preview purposes if database is not linked
      return null;
    }
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            name: profileData.name,
            gender: profileData.gender,
            country: 'India',
            state: profileData.state,
            mobile: profileData.mobile
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase Insert Error:", error);
        throw error;
      } else {
        console.log('Profile Saved to Database');
        return data;
      }
    } catch (err) {
      console.error("Database connection failure. Details:", err);
      // Local fallback so user can still enter the app during preview
      return { ...profileData, id: 'temp_' + Date.now() };
    }
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