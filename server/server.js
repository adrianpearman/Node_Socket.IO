const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.on('createMessage', (message) => {
    console.log(message);
    //this will emit it to the browser anot the console
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
