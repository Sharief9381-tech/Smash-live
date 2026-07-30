import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpire });
};

export const AuthService = {
  async register({ name, email, password, role }: { name: string; email: string; password: string; role?: 'admin' | 'referee' | 'player' | 'viewer' }) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({ name, email: normalizedEmail, password, role });
    await user.save();

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString())
    };
  },

  async login({ email, password }: { email: string; password: string }) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString())
    };
  },

  async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
};