import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/connection';
import matchRoutes from './routes/match.routes';
import authRoutes from './routes/auth.routes';
import { config } from './config';
import { initMatchSockets } from './sockets/match.socket';

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
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

// Socket Logic
initMatchSockets(io);

app.set('io', io);

httpServer.listen(config.port, () => {
  console.log(`🚀 SmashLive Backend running on port ${config.port}`);
});