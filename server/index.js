require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const bidRoutes = require('./routes/bidRoutes');

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }
});

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  //user-specific room for notifications
  socket.on('joinUserRoom', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  //gig-specific room for bid updates
  socket.on('joinGigRoom', (gigId) => {
    socket.join(`gig_${gigId}`);
    console.log(`Socket joined gig room: ${gigId}`);
  });

  socket.on('leaveGigRoom', (gigId) => {
    socket.leave(`gig_${gigId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'GigFlow API is running' });
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
