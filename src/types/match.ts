export type TournamentType = 'Knockout' | 'League' | 'Round Robin';
export type MatchCategory = 'Singles' | 'Doubles' | 'Mixed';

export interface Player {
  id: string;
  name: string;
  rank?: number;
  avatar?: string;
}

export interface MatchState {
  id: string;
  title: string;
  team1: Player[];
  team2: Player[];
  score1: number;
  score2: number;
  sets1: number;
  sets2: number;
  currentSet: number;
  servingTeam: 1 | 2;
  isLive: boolean;
  courtNumber: number;
  tournamentName?: string;
  timer: number;
  commentary: Commentary[];
}

export interface Commentary {
  id: string;
  text: string;
  timestamp: string;
  type: 'point' | 'info' | 'highlight';
}