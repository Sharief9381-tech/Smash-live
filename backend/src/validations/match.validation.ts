import { z } from 'zod';

export const createMatchSchema = z.object({
  body: z.object({
    type: z.enum(['singles', 'doubles']),
    matchId: z.string().min(3),
    players: z.object({
      sideA: z.array(z.string()),
      sideB: z.array(z.string())
    })
  })
});

export const updateScoreSchema = z.object({
  body: z.object({
    side: z.number().min(1).max(2),
    action: z.enum(['smash', 'net', 'error', 'other'])
  })
});