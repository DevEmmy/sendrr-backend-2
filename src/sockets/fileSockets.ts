import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

export const fileSockets = (io: SocketIOServer, socket: Socket)=>{
    // Handle file transfer initiation
    socket.on('startTransfer', async (data) => {
        const { name, size } = data;
        console.log(data)
        // Notify the recipient
        socket.emit('transferRequest', { name, size });
    });

    // Handle receiving file chunks
    socket.on('sendChunk', (chunk) => {
        console.log(chunk)
        socket.emit('receiveChunk', chunk);
    });

    // Handle transfer completion
    socket.on('completeTransfer', (data) => {
        // Log transfer to database, notify users, etc.
        console.log('Transfer completed:', data);
        socket.emit("completeTransfer");
    });
}