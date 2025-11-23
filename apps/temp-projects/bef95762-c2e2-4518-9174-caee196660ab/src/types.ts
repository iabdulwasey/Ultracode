export interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  appearances: number;
  league: string;
}

export interface Team {
  id: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  logo: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  teams: Team[];
}

export interface KeyStat {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
}

export interface TopScorer {
  player: string;
  team: string;
  goals: number;
  league: string;
}

export interface TopAssist {
  player: string;
  team: string;
  assists: number;
  league: string;
}