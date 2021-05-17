const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");


app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
        cors: {
                origin: '*',
                optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) cho$
        }
});


        io.on("connection", (socket) => {
            //when message is submitted, broadcast it

            //socket.join(roomName);
            //console.log("joined" + roomName);

            socket.on("message-submitted", (msg) => {
                //echo the message back to the user
                socket.emit("message", msg);

                //broadcast message to everyone else
                socket.broadcast.emit("message", msg);

            });
            /*
            socket.on("room", function(roomName) {
                socket.join(roomName);
            });

            socket.on("message-submitted", (msg) => {
                //echo the message back to the user
                socket.in(roomName).emit("message", msg);

            });*/
        });

        server.listen(8008, () => {
          console.log('listening on *:8008');
        });