const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"] //accepts socket communication from the frontend
    }
});

io.on('connection', (socket)=> {
    console.log(socket.id);
    socket.on("join_chat", (data) => {
          socket.join(data) //joins based on chat id
          console.log(`User ${socket.id} joined room: ${data}`)
        })
    socket.on('send_message', (data) => {
           socket.to(data.room).emit("receive_message",data);
    })
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
}); //listening for event with id connection

server.listen(3001, () => {
    console.log('server is running')
});