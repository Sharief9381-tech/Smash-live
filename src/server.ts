import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/connection';
import matchRoutes from './routes/match.routes';
import { config } from './config';

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

// API Routes
app.use('/api/matches', matchRoutes);

// Sockets
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join:match', (matchId) => {
    socket.join(matchId);
    console.log(`Socket ${socket.id} joined room ${matchId}`);
  });
});

app.set('io', io);

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});