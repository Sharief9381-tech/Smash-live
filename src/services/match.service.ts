import { Match, MatchEvent } from '@/types/database';
import { showSuccess, showError } from '@/utils/toast';

// This service handles all business logic for matches
export const MatchService = {
  async createMatch(matchData: Partial<Match>) {
    // Logic to persist to DB via Supabase
    const newMatch = {
      ...matchData,
      id: crypto.randomUUID(),
      matchId: `M-${Math.floor(Math.random() * 10000)}`,
      score: [0, 0],
      setScores: [],
      currentSet: 1,
      status: 'scheduled',
      events: [],
      createdAt: new Date().toISOString(),
    };
    
    // For now, syncing with our global active list
    const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    localStorage.setItem('active_studio_matches', JSON.stringify([...active, newMatch]));
    localStorage.setItem(newMatch.id, JSON.stringify(newMatch));
    
    return newMatch;
  },

  async updateScore(matchId: string, side: 1 | 2, action: string) {
    const saved = localStorage.getItem(matchId);
    if (!saved) throw new Error("Match not found");
    
    const match: Match = JSON.parse(saved);
    const newScore = [...match.score] as [number, number];
    newScore[side - 1]++;

    const event: MatchEvent = {
      type: 'point',
      side,
      action: action as any,
      score: newScore,
      timestamp: new Date().toISOString(),
    };

    const updatedMatch = {
      ...match,
      score: newScore,
      events: [...match.events, event],
      lastUpdate: Date.now()
    };

    localStorage.setItem(matchId, JSON.stringify(updatedMatch));
    this.syncGlobal(updatedMatch);
    
    return updatedMatch;
  },

  async undoLastPoint(matchId: string) {
    const saved = localStorage.getItem(matchId);
    if (!saved) return;
    
    const match: Match = JSON.parse(saved);
    if (match.events.length === 0) return;

    const newEvents = match.events.slice(0, -1);
    const lastEvent = newEvents[newEvents.length - 1];
    
    const updatedMatch = {
      ...match,
      score: lastEvent ? lastEvent.score : [0, 0],
      events: newEvents,
      lastUpdate: Date.now()
    };

    localStorage.setItem(matchId, JSON.stringify(updatedMatch));
    this.syncGlobal(updatedMatch);
  },

  syncGlobal(match: Match) {
    const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    const index = active.findIndex((m: any) => m.id === match.id);
    if (index >= 0) {
      active[index] = match;
    } else {
      active.push(match);
    }
    localStorage.setItem('active_studio_matches', JSON.stringify(active));
    
    // Notify window for same-tab updates
    window.dispatchEvent(new Event('storage'));
  }
};