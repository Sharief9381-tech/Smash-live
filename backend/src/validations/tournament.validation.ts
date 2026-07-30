import { z } from 'zod';

export const createTournamentSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    type: z.enum(['elimination', 'round-robin']).default('elimination'),
    category: z.string().min(2),
    location: z.string().min(2),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['upcoming', 'ongoing', 'completed']).optional(),
    participants: z.array(z.string()).optional()
  })
});

export const updateTournamentSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    type: z.enum(['elimination', 'round-robin']).optional(),
    category: z.string().min(2).optional(),
    location: z.string().min(2).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['upcoming', 'ongoing', 'completed']).optional(),
    participants: z.array(z.string()).optional()
  })
});
