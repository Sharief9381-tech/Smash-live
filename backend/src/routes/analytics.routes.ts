import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { Tournament } from '../models/Tournament';
import { Participant } from '../models/Participant';

const router = express.Router();

// GET /api/analytics/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [athletes, tourneys, participants] = await Promise.all([
      User.countDocuments(),
      Tournament.countDocuments(),
      Participant.countDocuments(),
    ]);
    res.json({ athletes, tourneys, participants });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
