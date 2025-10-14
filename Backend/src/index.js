import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

import Router from "./routes/chat.routes.js"
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./libs/db.js";

dotenv.config({ path: "./.env" })

const app = express()
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.port || 4000

app.get("/", (req, res) => {
  res.send("Hello Guys Welcome to Talk_Karo🔥");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", Router)

app.listen(port, () => {
    console.log(`App is Listening on port ${port}`)
})

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`App is listening on port: ${port}`));
  })
  .catch((err) => {
    console.error(`Mongodb connection error`, err);
    process.exit(1);
    // For seek this catch will never run because in db file "connectdb" already get exit in catch.
  });
