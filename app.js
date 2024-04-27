class ChatMessage {
    constructor(textMessage, sendTime, senderId, ReceiverId) {
        this.textMessage = textMessage;
        this.sendTime = sendTime;
        this.senderId = senderId;
        this.ReceiverId = ReceiverId;
    }
}
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors'); // (Optional)
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages from clients
    socket.on('message', (data) => {
        const dataObject = JSON.parse(data);
        console.log('Received data:', dataObject);
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
