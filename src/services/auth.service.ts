"use client";

import { supabase } from '@/lib/supabase';

export const AuthService = {
  async login(credentials: { email: string }) {
    // In a real app, we'd use supabase.auth.signInWithOtp
    // For this demo, we'll ensure a profile exists in the 'profiles' table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    let userProfile = profile;

    if (!profile) {
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([{
          email: credentials.email,
          name: credentials.email.split('@')[0],
          smash_id: `SMASH#${uniqueId}`,
          country: "Denmark",
          state: "Hovedstaden",
          image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
        }])
        .select()
        .single();

      if (createError) throw createError;
      userProfile = newProfile;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: userProfile.name,
      smashId: userProfile.smash_id,
      country: userProfile.country,
      state: userProfile.state,
      image: userProfile.image
    }));

    return userProfile;
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};