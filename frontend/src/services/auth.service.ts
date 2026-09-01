const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// ── DEMO MODE ─────────────────────────────────────────────────────────────
// Set to true to bypass backend calls and use a fixed OTP of "123456"
const DEMO_MODE = true;
const DEMO_OTP = '123456';
// ──────────────────────────────────────────────────────────────────────────

export interface UserProfile {
  _id: string;
  name: string;
  mobile: string;
  gender?: string;
  state?: string;
  district?: string;
  role: string;
  smashId?: string;
  onboardingComplete: boolean;
  token: string;
}

const normalizeMobile = (mobile: string | number): string =>
  String(mobile).replace(/\D/g, '');

export const AuthService = {
  normalizeMobile,

  /**
   * Send OTP — in demo mode, skips backend and accepts "123456".
   */
  async sendOtp(mobile: string): Promise<void> {
    if (DEMO_MODE) return; // no-op in demo
    const res = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: normalizeMobile(mobile) }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
  },

  /**
   * Register new athlete — in demo mode, creates a local session.
   */
  async registerAthlete(profileData: {
    name: string;
    gender: string;
    state: string;
    district: string;
    mobile: string;
    otp: string;
  }): Promise<UserProfile> {
    if (DEMO_MODE) {
      if (profileData.otp !== DEMO_OTP) throw new Error(`Demo OTP is ${DEMO_OTP}`);
      return {
        _id: 'demo-' + Date.now(),
        name: profileData.name,
        mobile: normalizeMobile(profileData.mobile),
        gender: profileData.gender,
        state: profileData.state,
        district: profileData.district,
        role: 'athlete',
        smashId: 'DEMO001',
        onboardingComplete: false,
        token: 'demo-token',
      };
    }
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...profileData,
        mobile: normalizeMobile(profileData.mobile),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data as UserProfile;
  },

  /**
   * Login existing user — in demo mode, accepts any number with OTP "123456".
   */
  async loginWithOtp(mobile: string, otp: string): Promise<UserProfile> {
    if (DEMO_MODE) {
      if (otp !== DEMO_OTP) throw new Error(`Demo OTP is ${DEMO_OTP}`);
      return {
        _id: 'demo-' + Date.now(),
        name: 'Demo Athlete',
        mobile: normalizeMobile(mobile),
        role: 'athlete',
        smashId: 'DEMO001',
        onboardingComplete: true,
        token: 'demo-token',
      };
    }
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: normalizeMobile(mobile), otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data as UserProfile;
  },

  async getProfile(): Promise<UserProfile | null> {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async updateProfile(data: object): Promise<UserProfile | null> {
    const token = this.getToken();
    if (!token) return null;
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Update failed');
    return json;
  },

  setLocalSession(profile: UserProfile) {
    if (!profile) return;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('authToken', profile.token);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    window.dispatchEvent(new Event('storage'));
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    window.dispatchEvent(new Event('storage'));
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  },
};
