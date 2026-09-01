import { Server } from 'socket.io';
import { MatchService } from '../services/match.service';

export const initMatchSockets = (io: Server) => {
  io.on('connection', (socket) => {

    // Client joins a match room to receive live score updates
    socket.on('match:join', async (matchId: string) => {
      socket.join(matchId);

      // Send current authoritative state on reconnect
      try {
        const match = await MatchService.getMatchById(matchId);
        socket.emit('match:state', match);
      } catch {
        socket.emit('match:error', { message: 'Match not found' });
      }
    });

    socket.on('match:leave', (matchId: string) => {
      socket.leave(matchId);
    });

    // NOTE: score:broadcast from client is intentionally NOT handled here.
    // All scoring goes through POST /api/matches/:id/score (validated by backend).
  });
};

/**
 * Broadcast a score update to both the match room and the global feed.
 * Called from the match controller after every validated point.
 */
export function broadcastScoreUpdate(io: Server, matchId: string, payload: object) {
  // Room-specific (scorers / spectators watching this match)
  io.to(matchId).emit('score:update', payload);
  // Global feed (Live Matches page, Dashboard)
  io.emit('feed:score_update', payload);
}

/**
 * Broadcast a match completion event globally.
 */
export function broadcastMatchComplete(io: Server, match: any) {
  io.to(String(match._id)).emit('match:completed', match);
  io.emit('feed:match_completed', match);
}

/**
 * Broadcast a new match creation globally so Live Match list updates.
 */
export function broadcastMatchCreated(io: Server, match: any) {
  io.emit('feed:match_created', match);
}
