import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true, index: true },
  type: { type: String, enum: ['singles', 'doubles'], required: true },
  players: {
    sideA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    sideB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
  },
  score: { type: [Number], default: [0, 0] },
  setScores: [[Number]],
  currentSet: { type: Number, default: 1 },
  server: { type: Number, enum: [1, 2], default: 1 },
  status: { 
    type: String, 
    enum: ['scheduled', 'live', 'completed'], 
    default: 'scheduled',
    index: true 
  },
  events: [{
    type: { type: String },
    side: Number,
    action: String,
    score: [Number],
    timestamp: { type: Date, default: Date.now }
  }],
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', index: true }
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);