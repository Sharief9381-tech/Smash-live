import { Server } from 'socket.io';

export const initMatchSockets = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('match:join', (matchId) => {
      socket.join(matchId);
      console.log(`Player joined match room: ${matchId}`);
    });

    socket.on('score:broadcast', (data) => {
      io.to(data.matchId).emit('score:updated', data);
    });
  });
};