const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;
app.use(express.static('public'));
io.on('connection', (socket) => { 
    console.log('A user connected:', socket.id);
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });
    socket.on('chatMessage', (data) => {
        io.to(data.room).emit('chatMessage', { user: data.user, message: data.message });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
