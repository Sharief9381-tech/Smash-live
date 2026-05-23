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

export const playersDatabase: Player[] = [
  { id: 1, rank: 1, name: "Viktor Axelsen", country: "Denmark", state: "Hovedstaden", points: 105400, change: "up", diff: 1, matches: 842, winRate: "88.4", smashAcc: "94.2", img: "VA" },
  { id: 2, rank: 2, name: "An Se-young", country: "South Korea", state: "Gwangju", points: 102200, change: "up", diff: 1, matches: 642, winRate: "92.1", smashAcc: "88.5", img: "AS" },
  { id: 3, rank: 3, name: "Shi Yuqi", country: "China", state: "Jiangsu", points: 98200, change: "down", diff: 1, matches: 620, winRate: "82.5", smashAcc: "91.0", img: "SY" },
  { id: 4, rank: 4, name: "Tai Tzu-ying", country: "Taiwan", state: "Kaohsiung", points: 95400, change: "none", diff: 0, matches: 780, winRate: "84.2", smashAcc: "86.8", img: "TT" },
  { id: 5, rank: 5, name: "Jonatan Christie", country: "Indonesia", state: "Jakarta", points: 92150, change: "up", diff: 2, matches: 580, winRate: "79.8", smashAcc: "89.4", img: "JC" },
  { id: 6, rank: 6, name: "Akane Yamaguchi", country: "Japan", state: "Fukui", points: 91800, change: "down", diff: 1, matches: 710, winRate: "81.2", smashAcc: "84.5", img: "AY" },
  { id: 7, rank: 7, name: "Lee Zii Jia", country: "Malaysia", state: "Kedah", points: 88400, change: "up", diff: 3, matches: 410, winRate: "75.4", smashAcc: "96.2", img: "LZ" },
  { id: 8, rank: 8, name: "Chen Yufei", country: "China", state: "Zhejiang", points: 87900, change: "none", diff: 0, matches: 590, winRate: "83.6", smashAcc: "85.2", img: "CY" },
];