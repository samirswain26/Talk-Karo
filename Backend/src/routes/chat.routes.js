import express from "express"
import { chat } from "../controllers/chat.controller.js"

const Router = express.Router()

Router.post("/chat",chat)

export default Router