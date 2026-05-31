"use client";

export const AuthService = {
  async login(credentials: { email: string; password?: string }) {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful response
    const mockUser = {
      _id: "user_" + Math.random().toString(36).substr(2, 9),
      email: credentials.email,
      token: "mock_jwt_token_" + Date.now()
    };
    
    localStorage.setItem('token', mockUser.token);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Create a default profile with a UNIQUE Smash ID if none exists
    if (!localStorage.getItem('userProfile')) {
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem('userProfile', JSON.stringify({
        name: credentials.email.split('@')[0],
        smashId: `SMASH#${uniqueId}`,
        country: "Denmark",
        state: "Hovedstaden",
        image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop",
        height: "185"
      }));
    }
    
    return mockUser;
  },

  async register(userData: any) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: "User registered locally" };
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};