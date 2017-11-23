const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const app = express();
const PORT = process.env.PORT || 5000

let server = http.createServer(app);
let io = socketIO(server);

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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))



  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))




  socket.on('createMessage', (message, callback) => {
    console.log(message);
    //this will emit it to the browser anot the console
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('this from the callback in the server')
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
