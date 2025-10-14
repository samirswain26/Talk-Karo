import express from "express"
import http from "http";
import { Server } from "socket.io";

const app = express()

const server = http.createServer(app); // create server from express
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your React app URL
    methods: ["GET", "POST"],
  },
});

// ✅ SOCKET.IO CONNECTION HANDLER
io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    io.emit("receiveMessage", data); // broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

