const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    // Receive chat messages
    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });

    // Typing indicator
    socket.on("typing", (status) => {
        socket.broadcast.emit("userTyping", status);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

http.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
