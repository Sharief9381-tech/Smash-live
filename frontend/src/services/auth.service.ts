import { supabase, isCloudConfigured } from '@/lib/supabase';

export const AuthService = {
  // Normalize mobile to string and remove any whitespace/dashes
  normalizeMobile(mobile: string | number): string {
    return String(mobile).replace(/\D/g, "");
  },

  async checkUserExists(mobile: string) {
    const cleanMobile = this.normalizeMobile(mobile);

    // 1. Local Check First (Instant)
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const localExists = registered.some((u: any) => this.normalizeMobile(u.mobile) === cleanMobile);
    if (localExists) return true;

    // 2. Cloud Check (Fallback)
    if (isCloudConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('mobile', cleanMobile)
          .single();
        if (data && !error) return true;
      } catch (err) {}
    }

    return false;
  },

  async getProfileByMobile(mobile: string) {
    const cleanMobile = this.normalizeMobile(mobile);
    
    // 1. Check local first
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const local = registered.find((u: any) => this.normalizeMobile(u.mobile) === cleanMobile);
    if (local) return local;

    // 2. Check cloud
    if (isCloudConfigured) {
      try {
        const { data } = await supabase.from('profiles').select('*').eq('mobile', cleanMobile).single();
        if (data) return { ...data, onboardingComplete: true };
      } catch (err) {}
    }

    return { name: "Athlete", mobile: cleanMobile, onboardingComplete: false };
  },

  async registerAthlete(profileData: { name: string; gender: string; state: string; district: string; mobile: string }) {
    const cleanMobile = this.normalizeMobile(profileData.mobile);
    const smashId = 'SMASH#' + Math.floor(1000 + Math.random() * 9000);

    const finalProfile = {
      ...profileData,
      mobile: cleanMobile,
      country: 'India',
      onboardingComplete: true,
      smashId: smashId,
      id: 'athlete_' + Date.now()
    };
    
    // ALWAYS save locally first
    const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
    registered.push(finalProfile);
    localStorage.setItem('registered_users', JSON.stringify(registered));

    // Async cloud sync
    if (isCloudConfigured) {
      supabase.from('profiles').upsert([{ 
        ...profileData, 
        mobile: cleanMobile, 
        smash_id: smashId, 
        onboarding_complete: true 
      }], { onConflict: 'mobile' }).then(() => {});
    }

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