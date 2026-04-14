import { apiRequest } from '@/lib/api';

export const AuthService = {
  async login(credentials: { email: string; password?: string }) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    return data;
  },

  async register(userData: any) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};