export type UserRole = 'admin' | 'referee' | 'player' | 'viewer';

export interface PlayerStats {
  totalMatches: number;
  wins: number;
  losses: number;
  smashAccuracy: number;
  winRate: number;
}

export interface Player {
  id: string;
  smashId: string;
  fullName: string;
  photoUrl?: string;
  ranking: number;
  club?: string;
  stats: PlayerStats;
  achievements: string[];
  createdAt: string;
}

export interface MatchEvent {
  type: 'point' | 'fault' | 'commentary';
  side: 1 | 2;
  action: 'smash' | 'net' | 'error' | 'other';
  score: [number, number];
  timestamp: string;
}

export interface Match {
  id: string;
  matchId: string;
  type: 'singles' | 'doubles';
  players: {
    sideA: string[];
    sideB: string[];
  };
  score: [number, number];
  setScores: [number, number][];
  currentSet: number;
  server: 1 | 2;
  status: 'scheduled' | 'live' | 'completed';
  events: MatchEvent[];
  tournamentId?: string;
  createdAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  type: 'elimination' | 'round-robin';
  category: string;
  participants: string[];
  bracket: any;
  status: 'upcoming' | 'ongoing' | 'completed';
  winnerId?: string;
  createdAt: string;
}