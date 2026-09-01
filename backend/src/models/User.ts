import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  mobile: string;
  email?: string;
  gender?: string;
  state?: string;
  district?: string;
  role: 'admin' | 'referee' | 'player' | 'viewer';
  smashId?: string;
  onboardingComplete: boolean;
  // Rankings / stats (updated when competitive matches complete)
  rankingPoints: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  tournamentsPlayed: number;
  tournamentsWon: number;
  currentStreak: number;   // positive = win streak, negative = lose streak
  lastMatchAt?: Date;
  playingLevel?: string;
  preferredCategory?: string;
  age?: number;
}

const userSchema = new mongoose.Schema<IUser>({
  name:     { type: String, required: true },
  mobile:   { type: String, required: true, unique: true },
  email:    { type: String, sparse: true },
  gender:   { type: String },
  state:    { type: String },
  district: { type: String },
  role: {
    type: String,
    enum: ['admin', 'referee', 'player', 'viewer'],
    default: 'viewer',
  },
  smashId:            { type: String, unique: true, sparse: true },
  onboardingComplete: { type: Boolean, default: false },
  // Onboarding fields
  playingLevel:       { type: String, enum: ['beginner', 'intermediate', 'advanced', 'professional'] },
  preferredCategory:  { type: String },
  age:                { type: Number },
  // Rankings
  rankingPoints:      { type: Number, default: 0, index: true },
  matchesPlayed:      { type: Number, default: 0 },
  matchesWon:         { type: Number, default: 0 },
  matchesLost:        { type: Number, default: 0 },
  tournamentsPlayed:  { type: Number, default: 0 },
  tournamentsWon:     { type: Number, default: 0 },
  currentStreak:      { type: Number, default: 0 },
  lastMatchAt:        { type: Date },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
