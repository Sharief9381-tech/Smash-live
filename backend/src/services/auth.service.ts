import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpire as `${number}${'s'|'m'|'h'|'d'|'w'|'y'}` | number });
};

const normalizeMobile = (mobile: string) => String(mobile).replace(/\D/g, '');

export const AuthService = {
  /**
   * Check if a mobile number is already registered.
   */
  async checkUserExists(mobile: string): Promise<boolean> {
    const user = await User.findOne({ mobile: normalizeMobile(mobile) });
    return !!user;
  },

  /**
   * Register a new athlete by mobile number.
   */
  async register({
    name,
    mobile,
    gender,
    state,
    district,
    role,
  }: {
    name: string;
    mobile: string;
    gender?: string;
    state?: string;
    district?: string;
    role?: 'admin' | 'referee' | 'player' | 'viewer';
  }) {
    const cleanMobile = normalizeMobile(mobile);

    const existing = await User.findOne({ mobile: cleanMobile });
    if (existing) {
      throw new Error('Mobile number already registered');
    }

    const smashId = 'SMASH#' + Math.floor(1000 + Math.random() * 9000);

    const user = new User({
      name,
      mobile: cleanMobile,
      gender,
      state,
      district,
      role: role || 'player',
      smashId,
      onboardingComplete: true,
    });

    await user.save();

    return {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      gender: user.gender,
      state: user.state,
      district: user.district,
      role: user.role,
      smashId: user.smashId,
      onboardingComplete: user.onboardingComplete,
      token: generateToken(user._id.toString()),
    };
  },

  /**
   * Login by mobile number. OTP verification is handled on the frontend;
   * this just retrieves/returns the user profile + a fresh token.
   */
  async login({ mobile }: { mobile: string }) {
    const cleanMobile = normalizeMobile(mobile);
    const user = await User.findOne({ mobile: cleanMobile });

    if (!user) {
      throw new Error('Mobile number not registered');
    }

    return {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      gender: user.gender,
      state: user.state,
      district: user.district,
      role: user.role,
      smashId: user.smashId,
      onboardingComplete: user.onboardingComplete,
      token: generateToken(user._id.toString()),
    };
  },

  async getProfile(userId: string) {
    const user = await User.findById(userId).select('-__v').lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};
