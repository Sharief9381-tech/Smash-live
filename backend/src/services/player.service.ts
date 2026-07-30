import { Player } from '../models/Player';

export const PlayerService = {
  async getPlayers() {
    return await Player.find().sort({ ranking: 1 }).lean();
  },

  async getPlayerById(id: string) {
    const player = await Player.findById(id).lean();
    if (!player) throw new Error('Player not found');
    return player;
  },

  async createPlayer(data: any) {
    const player = new Player(data);
    return await player.save();
  },

  async updatePlayer(id: string, data: any) {
    const player = await Player.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).lean();
    if (!player) throw new Error('Player not found');
    return player;
  },

  async deletePlayer(id: string) {
    const player = await Player.findByIdAndDelete(id);
    if (!player) throw new Error('Player not found');
    return player;
  }
};