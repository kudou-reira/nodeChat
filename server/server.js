const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');

var app = express();
//already using createServer

var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')
    
    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));
    
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));
    
    //emit sends custom data
//    socket.emit('newEmail', {
//        from: 'mike@example.com',
//        text: 'what is going on',
//        createdAt: 123
//    });
    

    
//    socket.on('createEmail', (newEmail) => {
//        console.log('createEmail', newEmail);
//    });
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server');
        
//        socket.broadcast.emit('newMessage', {
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    });
    
    socket.on('disconnect', () => {
        console.log('user was disconnected'); 
    });
});

server.listen(port, () => {
    console.log('started on port ' + port) 
});

