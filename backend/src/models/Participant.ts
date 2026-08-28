import mongoose, { Document } from 'mongoose';

export interface IParticipant extends Document {
  tournament_id: mongoose.Types.ObjectId;
  name: string;
  phone?: string;
  gender?: string;
  category?: string;
  state?: string;
  district?: string;
  smash_id?: string;
}

const participantSchema = new mongoose.Schema<IParticipant>({
  tournament_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true, index: true },
  name: { type: String, required: true },
  phone: { type: String },
  gender: { type: String },
  category: { type: String },
  state: { type: String },
  district: { type: String },
  smash_id: { type: String },
}, { timestamps: true });

export const Participant = mongoose.model<IParticipant>('Participant', participantSchema);
