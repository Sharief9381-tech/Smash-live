import express from 'express';
import { matchController } from '../controllers/match.controller';

const router = express.Router();

// GET  /api/matches           — list all (optional ?status=live|scheduled|completed)
router.get('/', matchController.getAll);

// POST /api/matches           — create a match
router.post('/', matchController.create);

// GET  /api/matches/:id       — get single match
router.get('/:id', matchController.getById);

// POST /api/matches/:id/start — transition scheduled → live
router.post('/:id/start', matchController.start);

// POST /api/matches/:id/score — award a point (backend validates badminton rules)
router.post('/:id/score', matchController.scorePoint);

// POST /api/matches/:id/undo  — undo the last point
router.post('/:id/undo', matchController.undoPoint);

// POST /api/matches/:id/end   — manually end a match
router.post('/:id/end', matchController.endMatch);

export default router;
