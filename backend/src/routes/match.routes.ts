import express from 'express';
import { matchController } from '../controllers/match.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, authorize('admin', 'referee'), matchController.create);
router.patch('/:id/score', protect, authorize('referee'), matchController.updateScore);

export default router;