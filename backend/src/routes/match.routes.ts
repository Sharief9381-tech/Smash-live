import express from 'express';
import { Request, Response } from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Match } from '../models/Match';

const router = express.Router();

// GET /api/matches  — optional ?status=live
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;
    const matches = await Match.find(filter).sort({ createdAt: -1 }).lean();
    res.json(matches);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/matches
router.post('/', async (req: Request, res: Response) => {
  try {
    const match = new Match({
      ...req.body,
      status: req.body.status || 'live',
      current_score: req.body.current_score || [0, 0],
      sets_won: req.body.sets_won || [0, 0],
      serving: req.body.serving || 1,
    });
    await match.save();
    res.status(201).json(match);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/matches/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id).lean();
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/matches/:id  — update score or any field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { ...req.body, last_update: new Date() },
      { new: true }
    ).lean();
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Emit via socket if available
    const io = (req as any).app.get('io');
    if (io) io.to(req.params.id).emit('score:update', match);

    res.json(match);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/matches/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Deleted' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
