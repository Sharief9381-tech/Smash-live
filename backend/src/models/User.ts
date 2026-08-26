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
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, sparse: true },
  gender: { type: String },
  state: { type: String },
  district: { type: String },
  role: {
    type: String,
    enum: ['admin', 'referee', 'player', 'viewer'],
    default: 'viewer'
  },
  smashId: { type: String, unique: true, sparse: true },
  onboardingComplete: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
