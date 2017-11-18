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

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
})

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
