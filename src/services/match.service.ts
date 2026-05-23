"use client";

import { Match } from '@/types/database';

export const MatchService = {
  async createMatch(matchData: Partial<Match>) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const id = `match_${Date.now()}`;
    const newMatch = { ...matchData, id, createdAt: new Date().toISOString() };
    
    // Save to local storage for persistence
    localStorage.setItem(id, JSON.stringify(newMatch));
    
    // Update active matches list
    const activeMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    activeMatches.push(newMatch);
    localStorage.setItem('active_studio_matches', JSON.stringify(activeMatches));
    
    return newMatch;
  },

  async updateScore(matchId: string, side: 1 | 2, action: string) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const saved = localStorage.getItem(matchId);
    if (!saved) throw new Error('Match not found');
    
    const match = JSON.parse(saved);
    const newScore = [...(match.currentScore || [0, 0])];
    newScore[side - 1]++;
    
    const updatedMatch = {
      ...match,
      currentScore: newScore,
      lastUpdate: Date.now()
    };
    
    localStorage.setItem(matchId, JSON.stringify(updatedMatch));
    return updatedMatch;
  },

  async getLiveMatches() {
    // Return both static demos and local storage matches
    const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    return active;
  },

  async getMatchById(id: string) {
    const saved = localStorage.getItem(id);
    return saved ? JSON.parse(saved) : null;
  }
};