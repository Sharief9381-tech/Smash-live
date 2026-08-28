import { MatchAPI } from './api';

export const MatchService = {
  async createMatch(matchData: any) {
    return MatchAPI.create(matchData);
  },

  async updateScore(matchId: string, score: [number, number], sets: [number, number], serving: number) {
    return MatchAPI.update(matchId, { current_score: score, sets_won: sets, serving });
  },

  async getLiveMatches() {
    return MatchAPI.getAll('live');
  },

  // No-op stub — realtime is handled via Socket.IO on the backend
  subscribeToMatch(_matchId: string, _callback: (payload: any) => void) {
    return { unsubscribe: () => {} };
  },
};
