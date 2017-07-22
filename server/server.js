const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');

var app = express();
//already using createServer
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name/room name are required!');
        }
        
        socket.join(params.room);
        //remove user from any other rooms
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        socket.emit('newMessage', generateMessage('admin', 'ようこうそ'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name}  joined`));
        callback();
        //information here doesn't persist though
    });
    
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
        
//        socket.broadcast.emit('newMessage', {
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    });
    
    socket.on('disconnect', () => {
        console.log('user was disconnected'); 
        var user = users.removeUser(socket.id);
    
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log('started on port ' + port) 
});

