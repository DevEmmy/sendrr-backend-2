// src/config/socket.ts

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { fileSockets } from '../sockets/fileSockets';

let io: SocketIOServer;

// This map will hold userId as key and socketId as value
const connectedUsers = new Map<string, string>();

// Initialize the Socket.IO server
const initSocket = (server: HttpServer): void => {
  io = new SocketIOServer(server, {cors: {origin: "*"}, maxHttpBufferSize: 1e10});
  console.log('Socket.IO server initialized');

  // Handle new connections
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Listen for user identification event
    socket.on('identify', (userId: string) => {
      console.log(`User identified: ${userId}`);
      connectedUsers.set(userId, socket.id);

      // Notify other clients of the user's online status
      io.emit('userOnline', userId);
    });

    fileSockets(io, socket)


    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);

      // Find userId based on socketId and remove from the map
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          // Notify others of the user's offline status
          io.emit('userOffline', userId);
          break;
        }
      }
    });
  });
};

// Get the Socket.IO server instance
const getIo = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export { initSocket, getIo, connectedUsers };
