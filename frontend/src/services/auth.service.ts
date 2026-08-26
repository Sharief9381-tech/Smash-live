const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
   * Send OTP to mobile number via WhatsApp (backend handles delivery).
   */
  async sendOtp(mobile: string): Promise<void> {
    const res = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: normalizeMobile(mobile) }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
  },

  /**
   * Register new athlete — OTP verified on backend.
   */
  async registerAthlete(profileData: {
    name: string;
    gender: string;
    state: string;
    district: string;
    mobile: string;
    otp: string;
  }): Promise<UserProfile> {
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
   * Login existing user — OTP verified on backend.
   */
  async loginWithOtp(mobile: string, otp: string): Promise<UserProfile> {
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
