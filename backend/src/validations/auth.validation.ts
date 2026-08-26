import { z } from 'zod';

export const sendOtpSchema = z.object({
  body: z.object({
    mobile: z.string().min(10).max(15),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    mobile: z.string().min(10).max(15),
    otp: z.string().length(6),
    gender: z.string().optional(),
    state: z.string().optional(),
    district: z.string().optional(),
    role: z.enum(['admin', 'referee', 'player', 'viewer']).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    mobile: z.string().min(10).max(15),
    otp: z.string().length(6),
  }),
});
