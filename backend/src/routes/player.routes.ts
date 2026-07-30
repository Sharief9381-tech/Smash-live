import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware';
import { PlayerService } from '../services/player.service';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const players = await PlayerService.getPlayers();
    res.json(players);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', protect, authorize('admin', 'referee'), async (req, res) => {
  try {
    const player = await PlayerService.createPlayer(req.body);
    res.status(201).json(player);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await PlayerService.getPlayerById(req.params.id);
    res.json(player);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.patch('/:id', protect, authorize('admin', 'referee'), async (req, res) => {
  try {
    const player = await PlayerService.updatePlayer(req.params.id, req.body);
    res.json(player);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const player = await PlayerService.deletePlayer(req.params.id);
    res.json(player);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
