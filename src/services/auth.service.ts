"use client";

import { supabase } from '@/lib/supabase';

export const AuthService = {
  async login(credentials: { email: string }) {
    try {
      // Attempt to check for profile in Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn("Supabase profile fetch error:", error.message);
        throw error;
      }

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

      this.setSession(userProfile);
      return userProfile;

    } catch (err) {
      console.error("Database connection failed. Falling back to local session for testing.");
      
      // Local fallback if Supabase is not configured or reachable
      const mockProfile = {
        name: credentials.email.split('@')[0] || "Player",
        smashId: `SMASH#${Math.floor(1000 + Math.random() * 9000)}`,
        country: "Denmark",
        state: "Hovedstaden",
        image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
      };
      
      this.setSession(mockProfile);
      return mockProfile;
    }
  },

  setSession(userProfile: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: userProfile.name,
      smashId: userProfile.smashId || userProfile.smash_id,
      country: userProfile.country,
      state: userProfile.state,
      image: userProfile.image
    }));
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};