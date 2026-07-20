"use client";

import { supabase, isCloudConfigured } from '@/lib/supabase';

export const AuthService = {
  // Normalize mobile to string and remove any whitespace/dashes
  normalizeMobile(mobile: string | number): string {
    return String(mobile).replace(/\D/g, "");
  },

  async checkUserExists(mobile: string) {
    const cleanMobile = this.normalizeMobile(mobile);

    // 1. Cloud Check
    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('mobile', cleanMobile)
          .single();
        if (data && !error) return true;
      } catch (err) {
        console.warn("Cloud check skipped.");
      }
    }

    // 2. Local Check (Fallback)
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    return registered.some((u: any) => this.normalizeMobile(u.mobile) === cleanMobile);
  },

  async getProfileByMobile(mobile: string) {
    const cleanMobile = this.normalizeMobile(mobile);
    let profile = null;

    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('mobile', cleanMobile)
          .single();
        
        if (!error && data) {
          profile = {
            ...data,
            mobile: cleanMobile, // Ensure it's present
            onboardingComplete: data.onboarding_complete ?? true
          };
        }
      } catch (err) {
        console.warn("Cloud registry sync skipped.");
      }
    }

    // Always check local if not found or as additional backup
    if (!profile) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const existing = registered.find((u: any) => this.normalizeMobile(u.mobile) === cleanMobile);
      if (existing) {
        profile = {
          ...existing,
          onboardingComplete: existing.onboardingComplete ?? true
        };
      }
    }

    // Create a temporary skeleton if absolutely not found (shouldn't happen with checkUserExists guard)
    if (!profile) {
      profile = {
        name: "New Athlete",
        mobile: cleanMobile,
        country: "India",
        onboardingComplete: false 
      };
    }

    return profile;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; district: string; mobile: string }) {
    const cleanMobile = this.normalizeMobile(profileData.mobile);
    let savedProfile = null;

    const normalizedData = {
      ...profileData,
      mobile: cleanMobile,
      country: 'India',
      onboardingComplete: true,
      onboarding_complete: true,
      smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000)
    };

    // Try cloud save
    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert([{ 
            name: normalizedData.name,
            gender: normalizedData.gender,
            state: normalizedData.state,
            district: normalizedData.district,
            mobile: cleanMobile,
            country: 'India',
            onboarding_complete: true,
            smash_id: normalizedData.smashId,
            updated_at: new Date().toISOString()
          }], { onConflict: 'mobile' })
          .select().single();
        
        if (!error && data) {
          savedProfile = { ...data, onboardingComplete: true, mobile: cleanMobile };
        }
      } catch (err) {
        console.warn("Cloud registration failed.");
      }
    }

    // Final profile object
    const finalProfile = savedProfile || { 
      ...normalizedData, 
      id: 'athlete_' + Date.now()
    };
    
    // GUARANTEE local storage update
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const existsIndex = registered.findIndex((u: any) => this.normalizeMobile(u.mobile) === cleanMobile);
    
    if (existsIndex > -1) {
      registered[existsIndex] = finalProfile;
    } else {
      registered.push(finalProfile);
    }
    
    localStorage.setItem('registered_users', JSON.stringify(registered));
    return finalProfile;
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