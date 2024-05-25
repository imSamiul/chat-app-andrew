const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", () => {
  console.log("New websocket connection");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// Use the server instance to listen on the specified port
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
