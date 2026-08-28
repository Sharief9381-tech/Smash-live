
import 'dotenv/config';
import express from 'express';
import { initWhatsApp } from './services/whatsapp.service';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/connection';
import authRoutes from './routes/auth.routes';
import playerRoutes from './routes/player.routes';
import tournamentRoutes from './routes/tournament.routes';
import matchRoutes from './routes/match.routes';
import userRoutes from './routes/user.routes';
import analyticsRoutes from './routes/analytics.routes';
import { notFound, errorHandler } from './middlewares/error.middleware';
import { initMatchSockets } from './sockets/match.socket';
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

// OTP sender
initWhatsApp();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

app.set('io', io);

// Socket Logic
initMatchSockets(io);

app.use(notFound);
app.use(errorHandler);

httpServer.listen(config.port, () => {
  console.log(`🚀 SmashLive Backend running on port ${config.port}`);
});