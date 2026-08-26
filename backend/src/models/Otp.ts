import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IOtp extends Document {
  mobile: string;
  otpHash: string;
  expiresAt: Date;
  verified: boolean;
  verifyOtp(enteredOtp: string): Promise<boolean>;
}

const otpSchema = new mongoose.Schema<IOtp>({
  mobile: { type: String, required: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
});

// Auto-delete expired documents via MongoDB TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

otpSchema.methods.verifyOtp = async function (enteredOtp: string): Promise<boolean> {
  return bcrypt.compare(enteredOtp, this.otpHash);
};

export const Otp = mongoose.model<IOtp>('Otp', otpSchema);
