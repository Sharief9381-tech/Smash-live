"use client";

import { supabase, isCloudConfigured } from '@/lib/supabase';

export const AuthService = {
  async getProfileByMobile(mobile: string) {
    let profile = null;

    // 1. Cloud Check
    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('mobile', mobile)
          .single();
        
        if (!error && data) {
          profile = {
            ...data,
            onboardingComplete: data.onboarding_complete ?? true // Normalize field name
          };
        }
      } catch (err) {
        console.warn("Cloud registry sync skipped.");
      }
    }

    // 2. Local registry check
    if (!profile) {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      // Ensure we match mobile numbers consistently as strings
      const existing = registered.find((u: any) => String(u.mobile) === String(mobile));
      if (existing) {
        profile = {
          ...existing,
          onboardingComplete: existing.onboardingComplete ?? true
        };
      }
    }

    // 3. New Athlete Initialization (If truly not found)
    if (!profile) {
      profile = {
        name: "New Athlete",
        mobile: mobile,
        country: "India",
        state: "",
        district: "",
        gender: "male",
        smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000),
        onboardingComplete: false 
      };
    }

    return profile;
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; district: string; mobile: string }) {
    let savedProfile = null;

    const normalizedData = {
      ...profileData,
      country: 'India',
      onboardingComplete: true, // Mark as done locally
      onboarding_complete: true, // For cloud consistency
      smashId: 'SMASH#' + Math.floor(1000 + Math.random() * 9000)
    };

    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert([{ 
            name: normalizedData.name,
            gender: normalizedData.gender,
            state: normalizedData.state,
            district: normalizedData.district,
            mobile: normalizedData.mobile,
            country: 'India',
            onboarding_complete: true,
            smash_id: normalizedData.smashId,
            updated_at: new Date().toISOString()
          }], { onConflict: 'mobile' })
          .select().single();
        
        if (!error) savedProfile = { ...data, onboardingComplete: true };
      } catch (err) {
        console.warn("Cloud registration failed, saving to local node.");
      }
    }

    const finalProfile = savedProfile || { 
      ...normalizedData, 
      id: 'athlete_' + Date.now()
    };
    
    // Update local registry
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const exists = registered.findIndex((u: any) => String(u.mobile) === String(profileData.mobile));
    if (exists > -1) registered[exists] = finalProfile;
    else registered.push(finalProfile);
    
    localStorage.setItem('registered_users', JSON.stringify(registered));
    return finalProfile;
  },

  setLocalSession(profile: any) {
    if (!profile) return;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // Broadcast auth state change
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { isLoggedIn: true, profile } }));
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { isLoggedIn: false } }));
  }
};