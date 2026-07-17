"use client";

import { supabase } from '@/lib/supabase';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('mobile', mobile)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    // Using your specific query structure
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
      console.log(error);
      throw error;
    } else {
      console.log('Saved');
      return data;
    }
  },

  setLocalSession(profile: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};