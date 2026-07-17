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

  async login(email: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    if (!data) {
      // Auto-create profile if missing on login (standard for OTP flow)
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([{ email, onboarding_complete: false }])
        .select()
        .single();
      
      if (createError) throw createError;
      return newProfile;
    }

    return data;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; mobile: string }) {
    const email = `${profileData.mobile}@smashlive.com`;
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          name: profileData.name,
          gender: profileData.gender,
          country: 'India',
          state: profileData.state,
          mobile: profileData.mobile,
          email: email,
          onboarding_complete: true
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Registration Error:', error);
      throw error;
    }
    
    console.log('Athlete Profile Saved to Cloud');
    return data;
  },

  async updateProfile(id: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
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