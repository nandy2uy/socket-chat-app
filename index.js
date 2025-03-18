const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat messages
    socket.on('chat message', (msg) => {
        // Broadcast the message to all clients except the sender
        socket.broadcast.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
