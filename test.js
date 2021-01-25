let express = require("express");
let http = require("http");
let socketio = require("socket.io");
let path = require("path");

let app = express();
let server = http.createServer(app);
let io = socketio(server);
publicPath = path.join(__dirname, "./public");

let users = []

app.use(express.static(publicPath));

server.listen(3002, () => {
  console.log("Server started on port 3002");
});

io.on("connection", (socket) => {
  console.log('user Conneceted ' + socket.id);

  socket.on('chatMessage', (msg)=>{
    // io.emit('newMessage', msg);
    socket.to('testRoom').emit('nice game', msg);
  })

  socket.on('search', (data)=>{
    console.log(data);
    users.push(data.uid);
    let user1 = shuffle(users).pop()
    let user2 = shuffle(users).pop()
    // socket.join(`${user1}+${user2}`)
  })

  socket.on('join', (sock)=>{
    socket.join(sock)
    console.log(io.sockets.adapter.rooms.get(sock).size)
  })
  
  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});



==========================
let express = require("express");
let http = require("http");
let socketio = require("socket.io");
let path = require("path");

let app = express();
let server = http.createServer(app);
let io = socketio(server);
publicPath = path.join(__dirname, "./public");

let sockets = [];
let users = {};

app.use(express.static(publicPath));

server.listen(3002, () => {
  console.log("Server started on port 3002");
});

io.on("connection", (socket) => {
  console.log('user Conneceted ' + socket.id);
  sockets.push(socket);
  console.log(sockets);
  

  socket.on('chatMessage', (msg)=>{
    // io.emit('newMessage', msg);
    socket.to('testRoom').emit('nice game', msg);
  })

  socket.on('search', (data)=>{
    console.log(data);
    users.push(data.uid);
    let user1 = shuffle(users).pop()
    let user2 = shuffle(users).pop()
    // socket.join(`${user1}+${user2}`)
  })

  socket.on('join', (sock)=>{
    socket.join(sock)
    console.log(io.sockets.adapter.rooms.get(sock).size)
  })
  
  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});
