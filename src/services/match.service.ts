import { apiRequest } from '@/lib/api';
import { Match } from '@/types/database';

export const MatchService = {
  async createMatch(matchData: Partial<Match>) {
    return apiRequest('/matches', {
      method: 'POST',
      body: JSON.stringify(match)
    });
  },

  async updateScore(matchId: string, side: 1 | 2, action: string) {
    return apiRequest(`/matches/${matchId}/score`, {
      method: 'PATCH',
      body: JSON.stringify({ side, action })
    });
  },

  async getLiveMatches() {
    return apiRequest('/matches/live');
  },

  async getMatchById(id: string) {
    return apiRequest(`/matches/${id}`);
  }
};