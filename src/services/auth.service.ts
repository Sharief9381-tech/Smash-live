"use client";

export const AuthService = {
  // Simulates checking if a user exists by phone
  checkUserExists(phone: string) {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    return users.find((u: any) => u.phone === phone);
  },

  async login(credentials: { phone: string, email?: string }) {
    const existingUser = this.checkUserExists(credentials.phone);
    
    if (existingUser) {
      this.setSession(existingUser);
      return existingUser;
    }

    // If new user, we create a placeholder until onboarding
    const newUser = {
      phone: credentials.phone,
      name: "New Player",
      onboardingComplete: false
    };
    
    return newUser;
  },

  setSession(userProfile: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Track globally for the "database" simulation
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    if (!users.find((u: any) => u.phone === userProfile.phone)) {
      users.push(userProfile);
      localStorage.setItem('registered_users', JSON.stringify(users));
    }
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  }
};