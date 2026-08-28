import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  name: { type: String },
  matchId: { type: String, unique: true, sparse: true, index: true },
  match_type: { type: String, enum: ['singles', 'doubles', 'mixed'], default: 'singles' },
  // Flexible players object: { p1, p2 } for singles or { sideA: [], sideB: [] } for doubles
  players: { type: mongoose.Schema.Types.Mixed, default: {} },
  current_score: { type: [Number], default: [0, 0] },
  sets_won: { type: [Number], default: [0, 0] },
  total_sets: { type: Number, default: 3 },
  serving: { type: Number, enum: [1, 2], default: 1 },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed'],
    default: 'scheduled',
    index: true
  },
  court: { type: String },
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', index: true },
  // Legacy fields
  score: { type: [Number], default: [0, 0] },
  setScores: [[Number]],
  currentSet: { type: Number, default: 1 },
  server: { type: Number, enum: [1, 2], default: 1 },
  events: [{
    type: { type: String },
    side: Number,
    action: String,
    score: [Number],
    timestamp: { type: Date, default: Date.now }
  }],
  last_update: { type: Date, default: Date.now }
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);
