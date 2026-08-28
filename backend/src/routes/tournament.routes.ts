import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Tournament } from '../models/Tournament';
import { Participant } from '../models/Participant';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/tournaments  — optional ?status= filter
router.get('/', async (req, res) => {
  try {
    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;
    const tourneys = await Tournament.find(filter).sort({ createdAt: -1 }).lean();
    res.json(tourneys);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/tournaments
router.post('/', async (req, res) => {
  try {
    const t = new Tournament(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/tournaments/:id  — supports MongoDB _id or slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let t;
    if (mongoose.isValidObjectId(id)) {
      t = await Tournament.findById(id).lean();
    }
    if (!t) {
      t = await Tournament.findOne({ slug: id }).lean();
    }
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/tournaments/:id
router.patch('/:id', protect, authorize('admin', 'referee'), async (req, res) => {
  try {
    const t = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json(t);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tournaments/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let t;
    if (mongoose.isValidObjectId(id)) {
      t = await Tournament.findByIdAndDelete(id);
    }
    if (!t) {
      t = await Tournament.findOneAndDelete({ slug: id });
    }
    if (!t) return res.status(404).json({ message: 'Tournament not found' });
    res.json({ message: 'Deleted' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/tournaments/:id/participants
router.get('/:id/participants', async (req, res) => {
  try {
    const { id } = req.params;
    let tournament;
    if (mongoose.isValidObjectId(id)) {
      tournament = await Tournament.findById(id).lean();
    }
    if (!tournament) {
      tournament = await Tournament.findOne({ slug: id }).lean();
    }
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

    const participants = await Participant.find({ tournament_id: tournament._id }).lean();
    res.json(participants);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/tournaments/:id/participants
router.post('/:id/participants', async (req, res) => {
  try {
    const { id } = req.params;
    let tournament;
    if (mongoose.isValidObjectId(id)) {
      tournament = await Tournament.findById(id).lean();
    }
    if (!tournament) {
      tournament = await Tournament.findOne({ slug: id }).lean();
    }
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

    const participant = new Participant({
      ...req.body,
      tournament_id: tournament._id,
    });
    await participant.save();
    res.status(201).json(participant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
