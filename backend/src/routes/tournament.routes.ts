import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Tournament } from '../models/Tournament';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tourneys = await Tournament.find().sort({ createdAt: -1 }).lean();
    res.json(tourneys);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', protect, authorize('admin', 'referee'), async (req, res) => {
  try {
    const t = new Tournament(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const t = await Tournament.findById(req.params.id).lean();
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', protect, authorize('admin', 'referee'), async (req, res) => {
  try {
    const t = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const t = await Tournament.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
