import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Invite from './models/Invite.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://0.0.0.0:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://0.0.0.0:3000'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/1min';

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/invites', async (req, res) => {
  try {
    const code = Math.random().toString(36).substring(2, 10);
    const invite = new Invite({ code });
    await invite.save();
    res.status(201).json({ code });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invite' });
  }
});

app.get('/api/invites/:code', async (req, res) => {
  try {
    const invite = await Invite.findOne({ code: req.params.code } as any);
    if (!invite) {
      return res.status(404).json({ error: 'Invite not found' });
    }
    if (invite.isUsed) {
      return res.status(400).json({ error: 'Invite already used' });
    }
    
    // Mark as used immediately when claimed
    invite.isUsed = true;
    await invite.save();
    
    res.status(200).json({ code: invite.code });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

let waitingUser: string | null = null;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  let currentRoom: string | null = null;
  
  socket.on('join_chat', ({ isPrivate, inviteCode }) => {
    if (isPrivate && inviteCode) {
      currentRoom = inviteCode;
      socket.join(currentRoom as string);
      socket.to(currentRoom as string).emit('stranger_joined');
    } else {
      if (waitingUser && waitingUser !== socket.id) {
        // Match found!
        currentRoom = `room_${Date.now()}`;
        socket.join(currentRoom);
        const waitingSocket = io.sockets.sockets.get(waitingUser);
        if (waitingSocket) {
          waitingSocket.join(currentRoom);
        }
        io.to(currentRoom).emit('chat_started');
        waitingUser = null;
      } else {
        waitingUser = socket.id;
      }
    }
  });

  socket.on('send_message', (msg) => {
    if (currentRoom) {
      socket.to(currentRoom).emit('receive_message', msg);
    }
  });

  socket.on('react_message', ({ msgId, emoji }) => {
    if (currentRoom) {
      socket.to(currentRoom).emit('receive_reaction', { msgId, emoji });
    }
  });

  socket.on('extend_chat', () => {
    if (currentRoom) {
      socket.to(currentRoom).emit('chat_extended');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (waitingUser === socket.id) {
      waitingUser = null;
    }
    if (currentRoom) {
      socket.to(currentRoom).emit('stranger_left');
    }
  });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('Warning: Failed to connect to MongoDB. Starting server without DB:', (error as Error).message);
  }
  
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
