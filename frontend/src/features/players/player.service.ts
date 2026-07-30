/*
Purpose:
Used By:
Responsibilities:
*/

import { playersDatabase, Player as StaticPlayer } from '@/data/players';

export const playerService = {
  async getPlayerBySmashId(smashId: string) {
    return playersDatabase.find((player) => player.name.toLowerCase().includes(smashId.toLowerCase()));
  },

  async updateStats() {
    return { success: true };
  },

  async getMatchHistory() {
    return [];
  }
};
