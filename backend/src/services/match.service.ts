import { Match } from '../models/Match';

export const MatchService = {
  async createMatch(data: any) {
    const match = new Match({
      matchId: data.matchId,
      type: data.type,
      court: data.court,
      players: data.players,
      tournamentId: data.tournamentId,
      status: data.status || 'scheduled',
      score: [0, 0],
      setScores: [],
      currentSet: 1,
      server: data.server || 1
    });

    return await match.save();
  },

  async getMatchById(id: string) {
    const match = await Match.findById(id).populate('players.sideA players.sideB tournamentId winner').lean();
    if (!match) throw new Error('Match not found');
    return match;
  },

  async getLiveMatches() {
    return await Match.find({ status: 'live' }).sort({ createdAt: -1 }).lean();
  },

  async updateScore(id: string, side: number, action: string) {
    const match = await Match.findById(id);
    if (!match) throw new Error('Match not found');

    if (side < 1 || side > 2) {
      throw new Error('Invalid side value');
    }

    const newScore = [...match.score];
    newScore[side - 1] = (newScore[side - 1] || 0) + 1;
    match.score = newScore;
    match.events.push({
      type: 'point',
      side,
      action,
      score: newScore,
      timestamp: new Date()
    });

    if (match.status === 'scheduled') {
      match.status = 'live';
    }

    return await match.save();
  }
};