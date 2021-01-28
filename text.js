io.on('connection', function (socket) {
  sockets.push(socket);

  //join the server
  io.on('join', function(name){
    people[socket.id] = {name: name};
  })

  //disconnect from the server
  io.on('disconnect', function(){
    delete people[socket.id];
    sockets.splice(sockets.indexOf(socket), 1);
  });

  //initiate private message
  io.on('initiate private message',function(receiverName, message){
    var receiverSocketId = findUserById(receiverName);
    if(receiverSocketId){
      var receiver = people[receiverSocketId];
      var room = getARoom(people[socket.id], receiver);

      //join the anonymous user
      socket.join(room);
      //join the registered user 
      sockets[receiverSocketId].join(room);

      //notify the client of this
      io.sockets.in(room).emit('private room created', room, message);

      //
    }
  });

  io.on('send private message', function(room, message){
    io.sockets.in(room).emit('private chat message', message);
  });
}


==========================================
faltu data 
===========================================
var receiverSocketId = message.uid;
    if (receiverSocketId) {
      var receiver = users[receiverSocketId];
      var room = 'test';

      //join the anonymous user
      socket.join(room);
      //join the registered user
      sockets[receiverSocketId].join(room);

      //notify the client of this
      io.sockets.in(room).emit("private room created", room, message.text);

      //
    }
  });

  ==============================================
  let express = require("express");
let http = require("http");
let socketio = require("socket.io");
let path = require("path");

let app = express();
let server = http.createServer(app);
let io = socketio(server);
publicPath = path.join(__dirname, "./public");

let rooms = [];
let room;

app.use(express.static(publicPath));

function getARoom(user1, user2) {
  return "privateRooom" + user1.name + "And" + user2.name;
}

server.listen(3002, () => {
  console.log("Server started on port 3002");
});

io.on("connection", (socket) => {
  console.log("user Conneceted " + socket.id);
  rooms.push(socket.id);

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });

  socket.on("private", function (message) {
    // console.log("called Private" + message.text);
    // console.log(rooms);
    // console.log(io.sockets.adapter.rooms);

    rooms.forEach((room) => {
      if (io.sockets.adapter.rooms[room].length < 2) {
        room = room;
        socket.join(room);
        console.log(io.sockets.adapter.rooms[room].length, "room name" + room);
         io.in(room).clients((err, clients) => {
           console.log("Client Name : ", clients); // an array containing socket ids in 'room3'
         });
      }
    });
  });

  socket.on("chatMessage", (msg) => {
    // io.emit('newMessage', msg);
    socket.to(room).emit("message", msg);
    console.log(socket.rooms);
  });
});



// Structure for user message
Message = {
  message: "Message text",
  time-date: "date time of creation utf",
  mid: "randomly generated message id",
  
}