import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sendOtp, verifyOtp } from '../services/whatsapp.service';

export const authController = {
  /**
   * POST /api/auth/send-otp
   * Sends an OTP to the given mobile number via WhatsApp.
   */
  async sendOtp(req: Request, res: Response) {
    try {
      const { mobile } = req.body;
      await sendOtp(mobile);
      res.json({ message: 'OTP sent via WhatsApp' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  /**
   * POST /api/auth/register
   * Verifies OTP then creates a new user account.
   */
  async register(req: Request, res: Response) {
    try {
      const { name, mobile, otp, gender, state, district, role } = req.body;
      await verifyOtp(mobile, otp);
      const user = await AuthService.register({ name, mobile, gender, state, district, role });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  /**
   * POST /api/auth/login
   * Verifies OTP then returns user profile + JWT.
   */
  async login(req: Request, res: Response) {
    try {
      const { mobile, otp } = req.body;
      await verifyOtp(mobile, otp);
      const user = await AuthService.login({ mobile });
      res.json(user);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  },

  /**
   * GET /api/auth/profile  (JWT protected)
   */
  async profile(req: any, res: Response) {
    try {
      const user = await AuthService.getProfile(req.user._id.toString());
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  /**
   * GET /api/auth/whatsapp-status
   * Returns whether the WhatsApp sender is connected.
   */
  async whatsappStatus(_req: Request, res: Response) {
    const { getWhatsAppStatus } = await import('../services/whatsapp.service');
    res.json(getWhatsAppStatus());
  },
};
