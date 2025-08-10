export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  badges: Badge[];
  createdAt: Date;
  region: string;
  preferredLanguage: 'ar' | 'en';
}

export interface Question {
  id: string;
  text: string;
  textAr: string;
  options: string[];
  optionsAr: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: Category;
  explanation?: string;
  explanationAr?: string;
  timeLimit: number;
  points: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  description: string;
  descriptionAr: string;
  questionCount: number;
}

export interface Challenge {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: Category;
  creator: User;
  participants: User[];
  maxParticipants: number;
  questions: Question[];
  status: 'waiting' | 'active' | 'completed';
  startTime?: Date;
  endTime?: Date;
  duration: number;
  entryFee: number;
  prizePool: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

export interface GameSession {
  id: string;
  challenge: Challenge;
  participants: GameParticipant[];
  currentQuestion: number;
  status: 'waiting' | 'active' | 'completed';
  startTime: Date;
  endTime?: Date;
  winner?: User;
}

export interface GameParticipant {
  user: User;
  score: number;
  answers: Answer[];
  position: number;
  completedAt?: Date;
}

export interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'category' | 'weekly' | 'monthly';
  category?: Category;
  entries: LeaderboardEntry[];
  updatedAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  gamesPlayed: number;
  winRate: number;
}

export interface Achievement {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  requirement: string;
  reward: number;
  isUnlocked: boolean;
}

export interface Notification {
  id: string;
  type: 'challenge' | 'achievement' | 'system' | 'friend';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface GameState {
  currentUser: User | null;
  activeChallenge: Challenge | null;
  gameSession: GameSession | null;
  currentQuestionIndex: number;
  timeRemaining: number;
  score: number;
  answers: Answer[];
  isGameActive: boolean;
}