const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
//already using createServer

var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')
    
    //emit sends custom data
//    socket.emit('newEmail', {
//        from: 'mike@example.com',
//        text: 'what is going on',
//        createdAt: 123
//    });
    
    socket.emit('newMessage', {
        from: 'keita',
        text: 'see you',
        createdAt: 123
    });
    
//    socket.on('createEmail', (newEmail) => {
//        console.log('createEmail', newEmail);
//    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });
    
    socket.on('disconnect', () => {
        console.log('user was disconnected'); 
    });
});

server.listen(port,  () => {
    console.log('started on port ' + port) 
});

