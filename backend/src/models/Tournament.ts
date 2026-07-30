import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['elimination', 'round-robin'], default: 'elimination' },
  category: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  bracket: { type: mongoose.Schema.Types.Mixed },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed'], 
    default: 'upcoming',
    index: true 
  },
  rounds: { type: Number, default: 1 },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { timestamps: true });

export const Tournament = mongoose.model('Tournament', tournamentSchema);