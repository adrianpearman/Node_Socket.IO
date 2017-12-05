const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation.js')
const {Users} = require('./utils/users.js')
const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 5000

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users()

console.log(__dirname + '/../public');
console.log(publicPath);

io.on('connection', (socket) => {
  console.log('new user connected');
  //send a request back to the user with an object
  // socket.emit('newEmail', {
  //   from: 'adrianpearman12@gmail.com',
  //   text: 'hey!',
  //   timeStamp: 1287
  // })

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room is required')
    }

    socket.join(params.room);

    users.removeUser(socket.id)
    users.addUsers(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList',users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
    callback()
  })

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    //this will emit it to the browser anot the console
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
