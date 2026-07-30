import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.register({ name, email, password, role });

      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login({ email, password });

      res.json(user);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  },

  async profile(req: any, res: Response) {
    try {
      const user = await AuthService.getProfile(req.user._id.toString());
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};