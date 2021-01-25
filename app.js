let express = require("express");
let http = require("http");
let socketio = require("socket.io");
let path = require("path");

let app = express();
let server = http.createServer(app);
let io = socketio(server);
publicPath = path.join(__dirname, "./public");

let users = [];
let user1;
let room = null;

app.use(express.static(publicPath));

server.listen(3002, () => {
  console.log("Server started on port 3002");
});

io.on("connection", (socket) => {
  console.log("user Conneceted " + socket.id);
  const currUser = {
    uid: socket.id,
    status: "idle",
    room: socket.id,
  };
  users.push(currUser);

  socket.on("chatMessage", (msg) => {
    socket.to(room).emit("nice game", msg);
  });

  socket.on("join", (payload) => {
    let user2 = hooker(payload.uid);
    if (room) {
      socket.join(room);
      user1.status = "busy";
      user2.status = "busy";
    }
   
    console.log(users);
  });

  socket.on("search", (data) => {
    user1 = users.find((obj) => obj.uid === data.uid);
    //users.
    user1.status = "searching";
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

function hooker(uid) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.uid != uid && user.status === "searching") {
      room = user.uid;
      return user;
    }
  }
}
