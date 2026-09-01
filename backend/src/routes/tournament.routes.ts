import express from 'express';
import { tournamentController } from '../controllers/tournament.controller';

const router = express.Router();

router.get  ('/',                         tournamentController.getAll);
router.post ('/',                         tournamentController.create);
router.get  ('/:id',                      tournamentController.getById);
router.patch('/:id',                      tournamentController.update);
router.delete('/:id',                     tournamentController.remove);

router.get  ('/:id/participants',         tournamentController.getParticipants);
router.post ('/:id/participants',         tournamentController.register);

router.post ('/:id/draw',                 tournamentController.generateDraw);
router.get  ('/:id/bracket',              tournamentController.getBracket);
router.post ('/:id/result',               tournamentController.recordResult);

router.get  ('/:id/matches',              tournamentController.getMatches);
router.get  ('/:id/standings',            tournamentController.getStandings);
router.post ('/:id/close-registration',   tournamentController.closeRegistration);

export default router;
