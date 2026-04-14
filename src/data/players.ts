export interface Player {
  id: number;
  rank: number;
  name: string;
  country: string;
  state: string;
  points: number;
  change: 'up' | 'down' | 'none';
  diff?: number;
  matches: number;
  winRate: string;
  smashAcc: string;
  img: string;
  isUser?: boolean;
}

export const playersDatabase: Player[] = [];