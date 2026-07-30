import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  smashId: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true },
  photoUrl: String,
  ranking: { type: Number, index: true },
  club: String,
  university: String,
  stats: {
    totalMatches: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    smashAccuracy: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 }
  },
  achievements: [String],
  matchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
}, { timestamps: true });

export const Player = mongoose.model('Player', playerSchema);