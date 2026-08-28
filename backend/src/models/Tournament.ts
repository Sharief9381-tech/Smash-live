import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true, index: true },
  city: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  format: { type: String, enum: ['elimination', 'round-robin'], default: 'elimination' },
  status: {
    type: String,
    enum: ['Accepting', 'Live', 'Upcoming', 'Completed'],
    default: 'Accepting',
    index: true
  },
  organizer: { type: String },
  // Legacy fields
  category: { type: String },
  type: { type: String },
  bracket: { type: mongoose.Schema.Types.Mixed },
  rounds: { type: Number, default: 1 },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, { timestamps: true });

export const Tournament = mongoose.model('Tournament', tournamentSchema);
