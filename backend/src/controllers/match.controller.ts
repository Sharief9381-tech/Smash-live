import { Request, Response } from 'express';
import { MatchBackendService } from '../services/backend/match.service';

export const matchController = {
  async create(req: Request, res: Response) {
    try {
      const match = await MatchBackendService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateScore(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { side, action } = req.body;
      const match = await MatchBackendService.updateScore(id, side, action);
      
      // Socket emission logic would go here
      // req.app.get('io').to(id).emit('score:update', match);
      
      res.json(match);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};