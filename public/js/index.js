const $events = document.getElementById("events");

const newItem = (content) => {
  const item = document.createElement("li");
  item.innerText = content;
  return item;
};

const socket = io();

socket.on("connect", () => {
  console.log(socket);
});

// socket.emit("createMessage", { from: "Ashish", text: "Hello awesome" });
socket.on("newMessage", (message) => {
  console.log("newMessage", message);
});

socket.on('nice game',(msg)=>{
  console.log(msg);
})

const searchbtn = document.querySelector("#search");
searchbtn.addEventListener("click", () => {
  socket.emit('search', { name: 'Ashish', uid: socket.id, text:'Hello' });
  socket.emit('join', { name: 'Ashish', uid: socket.id, text:'Hello' });
});

const joinbtn = document.querySelector("#join");
joinbtn.addEventListener("click", () => {
  socket.emit('chatMessage', { from: 'Ashish', uid: socket.id, text:'Hello' });
});

// socket.emit('search', );
