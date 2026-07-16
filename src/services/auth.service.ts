"use client";

import { supabase } from '@/lib/supabase';

export const AuthService = {
  async login(email: string) {
    // For demo/prototype simplicity, we'll use a direct profile check.
    // In a full production app, you'd use supabase.auth.signInWithOtp()
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!profile) {
        // Create new athlete profile if they don't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ 
            email, 
            name: email.split('@')[0],
            onboarding_complete: false 
          }])
          .select()
          .single();

        if (createError) throw createError;
        return newProfile;
      }

      return profile;
    } catch (err) {
      console.error("Auth Service Error:", err);
      throw err;
    }
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