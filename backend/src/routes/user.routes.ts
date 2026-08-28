import express, { Request, Response } from 'express';
import { User } from '../models/User';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/users  — all users (for rankings, social hub)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();
    res.json(users);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/users/:id  — by MongoDB _id or mobile
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let user;
    if (mongoose.isValidObjectId(id)) {
      user = await User.findById(id).select('-__v').lean();
    }
    if (!user) {
      user = await User.findOne({ mobile: id }).select('-__v').lean();
    }
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
