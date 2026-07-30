import { z } from 'zod';

export const createPlayerSchema = z.object({
  body: z.object({
    smashId: z.string().min(3),
    fullName: z.string().min(2),
    photoUrl: z.string().url().optional(),
    ranking: z.number().int().min(0).optional(),
    club: z.string().optional(),
    university: z.string().optional(),
    region: z.string().optional()
  })
});

export const updatePlayerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
    photoUrl: z.string().url().optional(),
    ranking: z.number().int().min(0).optional(),
    club: z.string().optional(),
    university: z.string().optional(),
    region: z.string().optional()
  })
});
