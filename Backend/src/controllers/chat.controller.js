import { io } from "../libs/socket.js";

export const chat = async (req, res) => {
  const { message, user } = req.body;
  io.emit("receiveMessage", { message, user });
  res.status(200).json({
    success: true,
    message: "Message sent via Socket.Io"
  })
};
