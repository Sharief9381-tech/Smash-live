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

const countries = [
  { name: "Denmark", states: ["Hovedstaden", "Sjælland", "Syddanmark"] },
  { name: "China", states: ["Guangdong", "Beijing", "Shanghai", "Zhejiang"] },
  { name: "Indonesia", states: ["Jakarta", "West Java", "East Java"] },
  { name: "Malaysia", states: ["Selangor", "Johor", "Kuala Lumpur"] },
  { name: "India", states: ["Maharashtra", "Karnataka", "Delhi"] },
  { name: "Japan", states: ["Tokyo", "Osaka", "Kyoto"] },
  { name: "Thailand", states: ["Bangkok", "Phuket"] },
  { name: "Singapore", states: ["Central", "East"] },
];

const firstNames = ["Viktor", "Shi", "Jonatan", "Anders", "Kunlavut", "Kodai", "Lee", "Prannoy", "Loh", "Anthony", "Li", "Ng", "Lakshya", "Chou", "Kenta", "Weng", "Lin", "Chen", "Wang", "Lu"];
const lastNames = ["Axelsen", "Yuqi", "Christie", "Antonsen", "Vitidsarn", "Naraoka", "Zii Jia", "HS", "Kean Yew", "Ginting", "Shifeng", "Tze Yong", "Sen", "Tien Chen", "Nishimoto", "Hong Yang", "Dan", "Long", "Zheng", "Guangzu"];

export const playersDatabase: Player[] = Array.from({ length: 100 }, (_, i) => {
  const countryObj = countries[i % countries.length];
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[(i + 5) % lastNames.length];
  
  return {
    id: i + 1,
    rank: i + 1,
    name: `${firstName} ${lastName}`,
    country: countryObj.name,
    state: countryObj.states[i % countryObj.states.length],
    points: 110000 - (i * 800) + Math.floor(Math.random() * 500),
    change: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'down' : 'none',
    diff: Math.floor(Math.random() * 3) + 1,
    matches: 300 + Math.floor(Math.random() * 500),
    winRate: (70 + Math.random() * 20).toFixed(1),
    smashAcc: (75 + Math.random() * 20).toFixed(1),
    img: firstName[0] + lastName[0],
  };
});