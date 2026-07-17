"use client";

export interface Player {
  id: number;
  rank?: number;
  name: string;
  country: string;
  state: string;
  points?: number;
  change?: 'up' | 'none';
  diff?: number;
  matches?: number;
  winRate?: string;
  smashAcc?: string;
  img: string;
  isUser?: boolean;
  smashId?: string;
}

// All static data removed. The system now relies entirely on dynamic registration.
export const playersDatabase: Player[] = [];