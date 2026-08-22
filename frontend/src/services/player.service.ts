import { playersDatabase, Player as StaticPlayer } from '@/data/players';

import { showSuccess } from '@/utils/toast';

export const PlayerService = {
  async getPlayerBySmashId(smashId: string) {
    // In production, this would be a Supabase query
    return playersDatabase.find(p => p.name.toLowerCase().includes(smashId.toLowerCase()));
  },

  async updateStats(playerId: string, stats: any) {
    showSuccess("Stats updated successfully");
  },

  async getMatchHistory(playerId: string) {
    return []; // Mock history
  }
};