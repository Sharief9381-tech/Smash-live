import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/connection';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Sockets
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join:match', (matchId) => {
    socket.join(matchId);
  });
});

app.set('io', io);

// Routes would be imported here
// app.use('/api/matches', matchRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});