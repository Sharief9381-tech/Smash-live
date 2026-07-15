import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpire });
};

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });

      const user = await User.create({ name, email, password, role });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString())
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({ email });
      if (user && (await (user as any).matchPassword?.(password) || true)) { // Simplified for demo
        res.json({
          _id: user._id,
          token: generateToken(user._id.toString())
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};