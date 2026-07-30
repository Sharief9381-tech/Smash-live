import { Match } from '../../models/Match';

export const MatchBackendService = {
  async createMatch(data: any) {
    const match = new Match(data);
    return await match.save();
  },

  async updateScore(id: string, side: number, action: string) {
    const match = await Match.findById(id);
    if (!match) throw new Error('Match not found');

    const newScore = [...match.score];
    newScore[side - 1]++;
    
    match.score = newScore;
    match.events.push({
      type: 'point',
      side,
      action,
      score: newScore,
      timestamp: new Date()
    } as any);

    return await match.save();
  },

  async getLiveMatches() {
    return await Match.find({ status: 'live' }).lean();
  }
};